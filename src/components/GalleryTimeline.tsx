import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import image1 from '../assets/images/1.1.jpg';
import image2 from '../assets/images/2.2.jpg';
import image3 from '../assets/images/3.jpg';
import image4 from '../assets/images/4.jpg';
import image5 from '../assets/images/5.jpg';
import image6 from '../assets/images/6.jpg';
import image7 from '../assets/images/7.jpg';
import image8 from '../assets/images/8.jpg';
import image9 from '../assets/images/9.jpg';
import image10 from '../assets/images/10.jpg';
import image11 from '../assets/images/11.jpg';
import image12 from '../assets/images/12.jpg';
import image13 from '../assets/images/13.jpg';
import image14 from '../assets/images/14.jpg';
import image15 from '../assets/images/15.jpg';
import kiniem from '../assets/images/kiniem.jpg';

// Define timelineItems with images and dates
const timelineItems = [
  { date: 'Tháng 6, 2024', image: image1, description: 'Lần đầu đi chơi cùng nhau' },
  { date: 'Tháng 7, 2024', image: image2, description: 'Buổi tỏ tình' },
  { date: 'Tháng 8, 2024', image: image3, description: 'Kỷ niệm ngày 8/3' },
  { date: 'Không rõ', image: image4, description: 'chưa rõ, mết qué update sau' },
  { date: 'Không rõ', image: image5, description: 'chưa rõ, mết qué update sau' },
  { date: 'Tháng 11, 2024', image: image6, description: 'chưa rõ, mết qué update sau' },
  { date: 'Tháng 12, 2024', image: kiniem, description: 'kỉ niệm 6 tháng' },
  { date: 'Tháng 1, 2025', image: image8, description: 'chưa rõ, mết qué update sau' },
  { date: 'Tháng 2, 2025', image: image9, description: 'chưa rõ, mết qué update sau' },
  { date: 'Tháng 3, 2025', image: image10, description: 'chưa rõ, mết qué update sau' },
  { date: 'Tháng 4, 2025', image: image11, description: 'chưa rõ, mết qué update sau' },
  { date: 'Tháng 5, 2025', image: image12, description: 'chưa rõ, mết qué update sau' },
  { date: 'Tháng 6, 2025', image: image13, description: 'chưa rõ, mết qué update sau' },
  { date: 'Tháng 7, 2025', image: image14, description: 'chưa rõ, mết qué update sau' },
  { date: 'Tháng 8, 2025', image: image15, description: 'chưa rõ, mết qué update sau' },
];

interface GalleryTimelineProps {
  onClose: () => void;
}

export function GalleryTimeline({ onClose }: GalleryTimelineProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? timelineItems.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === timelineItems.length - 1 ? 0 : prev + 1));
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
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
            Hành trình tình yêu của chúng ta
          </h2>
          <p className="text-gray-600">Cùng nhau nhìn lại những dấu mốc đáng nhớ</p>
        </div>

        {/* Timeline container with horizontal scroll */}
        <div className="relative">
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-pink-100 transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-8 pt-4 px-8 hide-scrollbar" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Timeline line */}
            <div className="absolute left-8 right-8 top-[6.5rem] h-0.5 bg-pink-200"></div>
            
            {/* Timeline items */}
            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex-shrink-0 w-64 mx-4 flex flex-col items-center relative"
                onClick={() => {
                  setSelectedImage(item.image);
                  setCurrentImageIndex(index);
                }}
              >
                {/* Date node */}
                <div className={`w-5 h-5 rounded-full ${index % 2 === 0 ? 'bg-pink-500' : 'bg-pink-400'} mb-4 mt-6 z-10`}></div>
                
                {/* Date - alternate above/below timeline */}
                <div className={`absolute ${index % 2 === 0 ? 'top-0' : 'top-12'} left-1/2 -translate-x-1/2 font-bold text-pink-600 whitespace-nowrap`}>
                  {item.date}
                </div>
                
                {/* Image and description */}
                <div className={`${index % 2 === 0 ? 'mt-8' : 'mt-3'} w-full group cursor-pointer`}>
                  <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-all">
                    <img
                      src={item.image}
                      alt={item.description}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                      <p className="text-white font-medium">{item.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 rounded-full p-2 shadow-lg hover:bg-pink-100 transition-colors"
          >
            <ChevronRight size={24} />
          </button>
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

            <motion.div
              key={currentImageIndex}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="flex flex-col items-center"
            >
              <img
                src={timelineItems[currentImageIndex].image}
                alt={timelineItems[currentImageIndex].description}
                className="max-w-[90vw] max-h-[80vh] object-contain"
              />
              <p className="text-white text-lg mt-4 font-medium">
                {timelineItems[currentImageIndex].date} - {timelineItems[currentImageIndex].description}
              </p>
            </motion.div>

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