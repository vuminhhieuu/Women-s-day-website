import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Các hình dạng cánh hoa khác nhau
const petalSvgs = [
  // Cánh hoa hình giọt nước
  "M10,0 C5,5 0,15 0,25 C0,35 5,40 10,40 C15,40 20,35 20,25 C20,15 15,5 10,0",
  // Cánh hoa tròn
  "M10,0 C4,0 0,4 0,10 C0,16 4,20 10,20 C16,20 20,16 20,10 C20,4 16,0 10,0",
  // Cánh hoa oval
  "M12,0 C5,0 0,7 0,15 C0,23 5,30 12,30 C19,30 24,23 24,15 C24,7 19,0 12,0",
  // Cánh hoa tim
  "M12,4 C12,4 12,0 8,0 S0,4 0,8 C0,12 4,16 12,24 C20,16 24,12 24,8 C24,4 20,0 16,0 S12,4 12,4"
];

// Các màu hồng và đỏ cho theme ngày 8/3
const petalColors = [
  "#ff69b4", // Hồng đậm
  "#ffb6c1", // Hồng nhạt
  "#ff1493", // Hồng tươi
  "#ff85a2", // Hồng coral
  "#ff77a8", // Hồng thẫm
  "#ffdbe9", // Hồng phớt
  "#ffcccb", // Hồng pastel
  "#ff91a4", // Hồng đào
];

interface PetalProps {
  x: number;
  delay: number;
}

// Component cho một cánh hoa bay
const Petal = ({ x, delay }: PetalProps) => {
  const randomPetal = petalSvgs[Math.floor(Math.random() * petalSvgs.length)];
  const randomColor = petalColors[Math.floor(Math.random() * petalColors.length)];
  const size = 20 + Math.random() * 30;
  const duration = 10 + Math.random() * 15;
  const rotation = Math.random() * 360;
  
  return (
    <motion.div
      className="absolute top-0 z-10"
      initial={{ 
        x: x,
        y: -100,
        rotate: rotation,
        opacity: 0.8
      }}
      animate={{
        x: x + (Math.random() * 200 - 100),
        y: window.innerHeight + 100,
        rotate: rotation + (Math.random() * 720 - 360),
        opacity: [0.8, 1, 0.9, 0.7, 0]
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: Math.random() * 5
      }}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 30 30"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={randomPetal}
          fill={randomColor}
          transform={`rotate(${Math.random() * 360} 10 10)`}
        />
      </svg>
    </motion.div>
  );
};

// Component mặt trời tỏa sáng
const ShiningHeart = () => {
  return (
    <motion.div 
      className="relative"
      initial={{ scale: 0.8 }}
      animate={{ 
        scale: [0.8, 0.85, 0.8],
        rotate: [0, 5, 0, -5, 0]
      }}
      transition={{ 
        duration: 5, 
        repeat: Infinity,
        repeatType: "reverse"
      }}
    >
      {/* Các tia sáng */}
      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-pink-300 to-pink-200 rounded-full"
            style={{
              width: '6px',
              height: '80px',
              transformOrigin: 'center 0px',
              transform: `rotate(${i * 30}deg) translateY(70px)`,
              opacity: 0.7,
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
              height: ['80px', '90px', '80px']
            }}
            transition={{
              duration: 3,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      {/* Trái tim chính giữa */}
      <motion.div 
        className="relative z-10 w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <svg 
          viewBox="0 0 100 100" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-lg"
        >
          <defs>
            <radialGradient id="heartGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#ff6b9c" />
              <stop offset="90%" stopColor="#ff007f" />
            </radialGradient>
          </defs>
          <path 
            d="M50,20 C55,10 65,0 80,0 C95,0 100,10 100,25 C100,40 85,55 50,90 C15,55 0,40 0,25 C0,10 5,0 20,0 C35,0 45,10 50,20 Z" 
            fill="url(#heartGradient)"
          />
        </svg>
        
        {/* Text 8/3 trong trái tim */}
        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl sm:text-2xl md:text-3xl">
          8/3
        </div>
      </motion.div>
    </motion.div>
  );
};

// Component đồng hồ đếm ngược (nếu muốn đếm ngược đến ngày 8/3)
const Countdown = () => {
  const targetDate = new Date('2024-03-08T00:00:00');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [isPastDate, setIsPastDate] = useState(false);
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setIsPastDate(true);
        return;
      }
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      });
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  if (isPastDate) {
    return (
      <motion.div 
        className="text-2xl md:text-3xl text-pink-700 font-bold mt-4 mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        Chúc mừng ngày Quốc tế Phụ nữ 8/3!
      </motion.div>
    );
  }
  
  return (
    <div className="mt-6">
      <div className="text-xl text-pink-600 font-medium text-center mb-3">
        Đếm ngược đến ngày 8/3
      </div>
      <div className="flex justify-center space-x-4">
        {Object.entries(timeLeft).map(([key, value]) => (
          <motion.div
            key={key}
            className="flex flex-col items-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="bg-pink-100 text-pink-800 rounded-lg w-16 h-16 md:w-20 md:h-20 flex items-center justify-center text-xl md:text-2xl font-bold">
              {value}
            </div>
            <div className="text-xs md:text-sm text-pink-600 mt-1 capitalize">
              {key}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export function FloralAnimation() {
  // Tạo mảng cánh hoa dựa trên độ rộng màn hình
  const [petals, setPetals] = useState<{ id: number; x: number; delay: number }[]>([]);
  
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const count = Math.floor(width / 50); // Khoảng 1 cánh hoa mỗi 50px độ rộng
      
      const newPetals = Array.from({ length: count }).map((_, index) => ({
        id: index,
        x: (width / count) * index,
        delay: Math.random() * 15
      }));
      
      setPetals(newPetals);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Cánh hoa rơi */}
      {petals.map((petal) => (
        <Petal key={petal.id} x={petal.x} delay={petal.delay} />
      ))}
      
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        {/* Trái tim tỏa sáng */}
        <ShiningHeart />
        
        {/* Đồng hồ đếm ngược */}
        <Countdown />
        
        {/* Text khởi động */}
        <motion.div
          className="text-xl md:text-2xl text-pink-500 font-medium mt-6 mb-16 text-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Nhấn vào hộp quà phía dưới để khám phá những điều đặc biệt
        </motion.div>
      </div>
    </div>
  );
} 