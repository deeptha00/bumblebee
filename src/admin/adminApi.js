const API_URL = import.meta.env.VITE_API_URL || "";
const TOKEN_KEY = "bb_admin_token";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function parseError(res) {
  try {
    const data = await res.json();
    return data.message || `Request failed (${res.status})`;
  } catch {
    return `Request failed (${res.status})`;
  }
}

export async function login(password) {
  const res = await fetch(`${API_URL}/api/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) throw new Error(await parseError(res));
  const data = await res.json();
  setToken(data.token);
  return data.token;
}

export async function verifyToken() {
  const token = getToken();
  if (!token) return false;
  try {
    const res = await fetch(`${API_URL}/api/admin/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchContent() {
  const res = await fetch(`${API_URL}/api/content`);
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function saveContent(content) {
  const token = getToken();
  const res = await fetch(`${API_URL}/api/content`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(content),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function uploadImage(file) {
  const token = getToken();
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });
  if (!res.ok) throw new Error(await parseError(res));
  const data = await res.json();
  return `${API_URL}${data.url}`;
}
