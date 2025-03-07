import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

interface GiftBoxProps {
  onClick: () => void;
}

export function GiftBox({ onClick }: GiftBoxProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="cursor-pointer relative group"
      whileHover={{ 
        scale: 1.1,
        filter: "drop-shadow(0 0 15px rgba(255, 105, 180, 0.7))" 
      }}
      whileTap={{ scale: 0.95 }}
      animate={{
        y: [0, -10, 0],
        rotate: isHovered ? [0, -3, 3, 0] : 0,
      }}
      transition={{
        y: {
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 0.5,
          repeat: isHovered ? Infinity : 0,
          repeatType: "reverse",
        }
      }}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Enhanced glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-red-400 to-purple-600 rounded-xl opacity-75 group-hover:opacity-90 blur-lg transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
      
      {/* 3D box effect with ribbon */}
      <div className="relative bg-gradient-to-br from-pink-200 to-pink-100 p-8 rounded-lg shadow-2xl border-2 border-pink-300 overflow-hidden">
        {/* Ribbon */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-full bg-red-500"></div>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-full h-2 bg-red-500"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-red-500 rounded-full shadow-inner"></div>
        </div>
        
        {/* Gift icon with enhanced effects */}
        <motion.div
          animate={{ 
            scale: [1, 1.03, 1],
          }}
          transition={{ 
            scale: { 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" 
            }
          }}
        >
          <Gift 
            size={150} 
            className="text-pink-600 drop-shadow-lg filter" 
            strokeWidth={1.5}
            style={{
              filter: "drop-shadow(0 0 3px rgba(255, 255, 255, 0.8))"
            }}
          />
        </motion.div>
        
        {/* Sparkle effects */}
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 0.8 + Math.random() * 0.5,
                  repeat: Infinity,
                  delay: Math.random() * 0.5,
                }}
              />
            ))}
          </>
        )}
      </div>
    </motion.div>
  );
}