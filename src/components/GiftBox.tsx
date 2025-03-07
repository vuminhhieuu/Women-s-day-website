import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

interface GiftBoxProps {
  onClick: () => void;
}

export function GiftBox({ onClick }: GiftBoxProps) {
  return (
    <motion.div
      className="cursor-pointer relative group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      onClick={onClick}
    >
      <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 rounded-lg opacity-75 group-hover:opacity-100 blur transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
      <div className="relative bg-white p-6 rounded-lg">
        <Gift size={150} className="text-pink-500" />
      </div>
    </motion.div>
  );
}