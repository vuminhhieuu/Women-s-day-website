import { motion } from 'framer-motion';
import { Heart, Stars, Sparkles, Music } from 'lucide-react';

interface FinalSurpriseProps {
  onClose: () => void;
}

export function FinalSurprise({ onClose }: FinalSurpriseProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50"
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          >
            {i % 2 === 0 ? (
              <Stars className="text-pink-300" size={24} />
            ) : (
              <Sparkles className="text-yellow-300" size={20} />
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="bg-gradient-to-br from-pink-100 via-purple-100 to-pink-100 rounded-xl p-8 max-w-lg w-full text-center relative overflow-hidden"
      >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            >
              <Heart size={48} fill="#ff69b4" stroke="#ff69b4" />
            </motion.div>
          ))}
        </div>

        <div className="absolute top-2 right-2">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Music className="text-pink-400" size={24} />
          </motion.div>
        </div>

        <motion.div
          animate={{
            background: [
              "linear-gradient(45deg, #ff69b4, #ff1493)",
              "linear-gradient(225deg, #ff1493, #ff69b4)",
              "linear-gradient(45deg, #ff69b4, #ff1493)",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="rounded-lg p-1"
        >
          <h2 className="text-3xl font-bold text-white mb-6 mt-4">
            Hết rồi nhưng còn muốn nói
          </h2>
        </motion.div>

        <div className="bg-white/50 backdrop-blur-sm p-6 rounded-lg shadow-inner mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-gray-700 mb-6 font-handwriting text-xl leading-relaxed"
          >
            <p className="mb-4">
              Cảm ơn em đã dành thời gian xem hết những kỷ niệm của chúng ta.
            </p>
            <p className="mb-4">
              Anh muốn nói với em rằng: mỗi khoảnh khắc bên em đều là những
              kỷ niệm đẹp nhất.
            </p>
            <p>
              Chúc em ngày 8/3 thật hạnh phúc và tràn ngập niềm vui!
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <p className="text-pink-500 font-semibold text-2xl">
              Yêu em rất nhiều! ❤️
            </p>
          </motion.div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all font-semibold"
        >
          Đóng
        </button>
      </motion.div>
    </motion.div>
  );
}