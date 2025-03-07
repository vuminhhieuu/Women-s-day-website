import { motion } from 'framer-motion';

export function FallingPetals() {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-pink-200 rounded-full opacity-70"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 20,
            rotate: 360,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            filter: "blur(1px)",
          }}
        />
      ))}
    </div>
  );
}