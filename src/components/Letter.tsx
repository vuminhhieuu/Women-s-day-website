import { motion } from 'framer-motion';
import { Heart, Flower } from 'lucide-react';

interface LetterProps {
  message: string;
  onClose: () => void;
}

export function Letter({ message, onClose }: LetterProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="bg-pink-50 p-8 rounded-lg shadow-xl max-w-lg w-full mx-4 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 p-4">
        <motion.div
          animate={{
            rotate: [0, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Flower className="text-pink-300" size={32} />
        </motion.div>
      </div>
      <div className="absolute top-0 right-0 p-4">
        <motion.div
          animate={{
            rotate: [0, -10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Flower className="text-pink-300" size={32} />
        </motion.div>
      </div>

      {/* Border decoration */}
      <div className="border-4 border-pink-200 p-6 rounded-lg">
        <div className="font-handwriting text-xl text-gray-800 leading-relaxed">
          {message.split('\n').map((line, index) => (
            <p key={index} className="mb-4">{line}</p>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart className="text-pink-500" fill="#ec4899" size={32} />
          </motion.div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors mx-auto block"
        >
          Xem ảnh kỷ niệm
        </button>
      </div>
    </motion.div>
  );
}