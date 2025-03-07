import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Howl } from 'howler';
import { Volume2, VolumeX } from 'lucide-react';
import { FallingPetals } from './components/FallingPetals';
import { GiftBox } from './components/GiftBox';
import { Letter } from './components/Letter';
import { GalleryTimeline } from './components/GalleryTimeline';
import { Quiz } from './components/Quiz';
import { FinalSurprise } from './components/FinalSurprise';
import { FloralAnimation } from './components/FloralAnimation';
import backgroundMusicFile from './assets/musics/background_music_piano.mp3';
import { motion } from 'framer-motion';

const message = `Chúc mừng ngày 8/3!

Gửi đến người chưa là phụ nữ,

Nhân ngày Quốc tế Phụ nữ, anh muốn gửi đến em những lời chúc tốt đẹp nhất. Cảm ơn em vì đã luôn là nguồn cảm hứng và động lực trong cuộc sống của anh.

Chúc em luôn xinh đẹp, hạnh phúc và thành công trong cuộc sống. Mong rằng nụ cười sẽ luôn nở trên môi em, và mọi ước mơ của em đều sẽ thành hiện thực.

Yêu em! ❤️`;

function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showFinalSurprise, setShowFinalSurprise] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const backgroundMusicRef = useRef<Howl | null>(null);

  useEffect(() => {
    backgroundMusicRef.current = new Howl({
      src: [backgroundMusicFile],
      loop: true,
      volume: 0.2,
      autoplay: false,
    });
    
    const playMusic = () => {
      if (backgroundMusicRef.current && !backgroundMusicRef.current.playing()) {
        backgroundMusicRef.current.play();
        cleanup();
      }
    };

    const events = ['click', 'touchstart', 'mousedown', 'keydown'];
    events.forEach(event => document.addEventListener(event, playMusic, { once: true }));

    const cleanup = () => {
      events.forEach(event => document.removeEventListener(event, playMusic));
    };

    playMusic();
    
    return () => {
      cleanup();
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.unload();
      }
    };
  }, []);

  useEffect(() => {
    if (!backgroundMusicRef.current) return;
    
    if (!isMuted) {
      backgroundMusicRef.current.play();
    } else {
      backgroundMusicRef.current.pause();
    }
  }, [isMuted]);

  const toggleSound = () => {
    setIsMuted(!isMuted);
  };

  const soundButtonClass = `fixed top-4 right-4 z-50 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-colors
    ${isMuted ? 'text-gray-400' : 'text-pink-500'}`;

  const handleQuizComplete = () => {
    setShowQuiz(false);
    setShowGallery(true);
  };

  const handleGalleryClose = () => {
    setShowGallery(false);
    setShowFinalSurprise(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-pink-100/90 to-purple-100 relative">
      <FallingPetals />
      
      <button
        onClick={toggleSound}
        className={soundButtonClass}
        title={isMuted ? "Bật nhạc" : "Tắt nhạc"}
      >
        <motion.div
          animate={{ scale: isMuted ? 1 : [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: isMuted ? 0 : Infinity }}
        >
          {isMuted ? <VolumeX /> : <Volume2 />}
        </motion.div>
      </button>

      {isMuted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-16 right-4 z-50 text-sm text-pink-600 bg-white/90 px-3 py-1 rounded-full shadow-sm"
        >
          Click để phát nhạc
        </motion.div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-100/10 to-purple-100/20 pointer-events-none" />

      <div className="w-full h-[400px] md:h-[500px] relative">
        <FloralAnimation />
      </div>

      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center relative">
        {!showQuiz && !showLetter && !showGallery && !showFinalSurprise && (
          <>
            <GiftBox onClick={() => setShowQuiz(true)} />
          </>
        )}

        {showQuiz && (
          <Quiz onComplete={handleQuizComplete} onClose={() => setShowQuiz(false)} />
        )}

        {showLetter && !showGallery && !showFinalSurprise && (
          <Letter
            message={message}
            onClose={() => setShowGallery(true)}
          />
        )}

        {showGallery && !showFinalSurprise && (
          <GalleryTimeline onClose={handleGalleryClose} />
        )}

        {showFinalSurprise && (
          <FinalSurprise onClose={() => setShowFinalSurprise(false)} />
        )}
      </div>
    </div>
  );
}

export default App;