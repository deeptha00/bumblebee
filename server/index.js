import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import dotenv from 'dotenv';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import multer from 'multer';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_PATH = path.join(__dirname, 'data', 'content.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const app = express();
app.use(express.json({ limit: '2mb' }));
app.use(cors());
app.use('/uploads', express.static(UPLOADS_DIR));

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// ---------- Auth helpers ----------
function requireAuth(req, res, next) {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Missing token' });
    try {
        req.admin = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}

// ---------- Content helpers ----------
function readContent() {
    return JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf-8'));
}
function writeContent(data) {
    fs.writeFileSync(CONTENT_PATH, JSON.stringify(data, null, 2));
}

// ---------- Uploads ----------
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => cb(null, UPLOADS_DIR),
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname) || '';
            cb(null, `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (!/^image\//.test(file.mimetype)) return cb(new Error('Only image files are allowed'));
        cb(null, true);
    },
});

// Health check route
app.get('/', (req, res) => {
    res.json({ status: 'success', message: 'BumbleBee Server is running' });
});

// ---------- Admin auth ----------
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body || {};
    if (!password || password !== ADMIN_PASSWORD) {
        return res.status(401).json({ message: 'Incorrect password' });
    }
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '12h' });
    res.json({ token });
});

app.get('/api/admin/verify', requireAuth, (req, res) => {
    res.json({ ok: true });
});

// ---------- Site content ----------
app.get('/api/content', (req, res) => {
    try {
        res.json(readContent());
    } catch (error) {
        res.status(500).json({ message: 'Failed to read content', error: String(error) });
    }
});

app.put('/api/content', requireAuth, (req, res) => {
    try {
        const incoming = req.body;
        if (!incoming || typeof incoming !== 'object') {
            return res.status(400).json({ message: 'Invalid content payload' });
        }
        writeContent(incoming);
        res.json({ status: 'success', message: 'Content updated' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save content', error: String(error) });
    }
});

// ---------- Image upload ----------
app.post('/api/upload', requireAuth, upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    const url = `/uploads/${req.file.filename}`;
    res.json({ url });
});

// Multer / generic error handler for upload route
app.use((err, req, res, next) => {
    if (err) return res.status(400).json({ message: err.message || 'Upload error' });
    next();
});

// Endpoint to create an order
app.post('/create-order', async (req, res) => {
    try {
        const { amount, currency, receipt } = req.body;

        const options = {
            amount: amount * 100, // amount in the smallest currency unit (paise)
            currency,
            receipt: receipt || `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

// Endpoint to verify payment signature
app.post('/verify-payment', (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generated_signature = hmac.digest('hex');

        if (generated_signature === razorpay_signature) {
            // Payment is verified
            res.json({
                status: 'success',
                message: 'Payment verified successfully',
                whatsappLink: process.env.WHATSAPP_LINK || "https://chat.whatsapp.com/HzILOikGaHh6UXsvdNCdcg"
            });
        } else {
            // Payment verification failed
            res.status(400).json({ status: 'failure', message: 'Invalid payment signature' });
        }
    } catch (error) {
        console.error('Error verifying payment:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
