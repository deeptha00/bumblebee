import { motion } from "framer-motion";
import { useState } from "react";

const images = [
  {
    id: 1,
    url: "/images/image-1.jpeg",
   
  },
  {
    id: 2,
    url: "/images/image-2.jpeg",
    
  },
  {
    id: 3,
    url: "/images/image-3.jpeg",
   
  },
  {
    id: 4,
    url: "/images/image-4.jpeg",
    
  },
  {
    id: 5,
    url: "/images/image-5.jpeg",
  }
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section id="gallery" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-serif text-white font-bold text-gold mb-4">
            Our Gallery
          </h2>
          <div className="w-24 h-1 bg-gold mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover the vibrant moments and achievements that define the Bumble bee experience
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg cursor-pointer aspect-[4/3]"
              onClick={() => setSelectedImage(image)}
            >
              {/* Image */}
              <img
                src={image.url}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-gold/20 border border-gold text-gold text-xs font-semibold uppercase tracking-wide rounded-full mb-2">
                    {image.category}
                  </span>
                  <p className="text-white font-medium">{image.alt}</p>
                </div>
              </div> */}

              {/* Gold border on hover */}
              <div className="absolute inset-0 border-2 border-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-8 right-8 text-gold hover:text-white transition text-4xl font-light"
              onClick={() => setSelectedImage(null)}
              aria-label="Close modal"
            >
              ×
            </button>
            
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="w-full h-auto rounded-lg shadow-2xl border-2 border-gold/30"
              />
              <div className="text-center mt-6">
                <span className="inline-block px-4 py-2 bg-gold/20 border border-gold text-gold text-sm font-semibold uppercase tracking-wide rounded-full">
                  {selectedImage.category}
                </span>
                <p className="text-white text-xl mt-3 font-serif">{selectedImage.alt}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
