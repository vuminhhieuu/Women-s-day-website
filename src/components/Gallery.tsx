import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800",
  "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800",
  "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=800",
  "https://images.unsplash.com/photo-1517230878791-4d28214057c2?auto=format&fit=crop&w=800",
  "https://images.unsplash.com/photo-1518895312237-a9e23508077d?auto=format&fit=crop&w=800",
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800",
];

interface GalleryProps {
  onClose: () => void;
}

export function Gallery({ onClose }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-xl p-8 max-w-6xl w-full relative">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-pink-600 mb-2">
            Kỷ niệm đẹp của chúng ta
          </h2>
          <p className="text-gray-600">Hãy cùng nhau nhìn lại những khoảnh khắc tuyệt vời</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer"
              onClick={() => {
                setSelectedImage(src);
                setCurrentImageIndex(index);
              }}
            >
              <img
                src={src}
                alt={`Memory ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <p className="text-white text-sm">Xem ảnh</p>
              </div>
            </motion.div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-8 px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors mx-auto block font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
        >
          Tiếp tục
        </button>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-pink-400 transition-colors z-10"
              onClick={handlePrevImage}
            >
              <ChevronLeft size={48} />
            </button>

            <motion.img
              key={currentImageIndex}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              src={images[currentImageIndex]}
              alt="Enlarged memory"
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-pink-400 transition-colors z-10"
              onClick={handleNextImage}
            >
              <ChevronRight size={48} />
            </button>

            <button
              className="absolute top-4 right-4 text-white hover:text-pink-400 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}