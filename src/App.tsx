import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import useSound from 'use-sound';
import { Volume2, VolumeX } from 'lucide-react';
import { Flower3D } from './components/Flower3D';
import { FallingPetals } from './components/FallingPetals';
import { GiftBox } from './components/GiftBox';
import { Letter } from './components/Letter';
import { Gallery } from './components/Gallery';
import { Quiz } from './components/Quiz';
import { FinalSurprise } from './components/FinalSurprise';

const message = `Chúc mừng ngày 8/3!

Gửi đến người phụ nữ tuyệt vời,

Nhân ngày Quốc tế Phụ nữ, anh/em muốn gửi đến em những lời chúc tốt đẹp nhất. Cảm ơn em vì đã luôn là nguồn cảm hứng và động lực trong cuộc sống của anh/em.

Chúc em luôn xinh đẹp, hạnh phúc và thành công trong cuộc sống. Mong rằng nụ cười sẽ luôn nở trên môi em, và mọi ước mơ của em đều sẽ thành hiện thực.

Yêu em! ❤️`;

function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showFinalSurprise, setShowFinalSurprise] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [play, { stop }] = useSound('/background-music.mp3', {
    loop: true,
    volume: 0.5,
  });

  const toggleSound = () => {
    if (isMuted) {
      play();
    } else {
      stop();
    }
    setIsMuted(!isMuted);
  };

  const handleQuizSuccess = () => {
    setShowQuiz(false);
    setShowLetter(true);
  };

  const handleGalleryClose = () => {
    setShowGallery(false);
    setShowFinalSurprise(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-100 relative overflow-hidden">
      <FallingPetals />
      
      <button
        onClick={toggleSound}
        className="fixed top-4 right-4 z-50 p-2 bg-white/80 rounded-full shadow-lg hover:bg-white transition-colors"
      >
        {isMuted ? <VolumeX /> : <Volume2 />}
      </button>

      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center relative">
        {!showQuiz && !showLetter && !showGallery && !showFinalSurprise && (
          <>
            <h1 className="text-4xl md:text-6xl font-bold text-pink-600 text-center mb-8 animate-fade-in">
              Chúc mừng ngày 8/3!
            </h1>
            <p className="text-xl text-gray-700 text-center mb-12">
              Hãy nhấn vào hộp quà để nhận điều bất ngờ!
            </p>
            <div className="w-full h-[500px] mb-8">
              <Canvas camera={{ position: [0, 0, 7] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                  <Flower3D />
                </Suspense>
                <OrbitControls enableZoom={false} />
              </Canvas>
            </div>
            <GiftBox onClick={() => setShowQuiz(true)} />
          </>
        )}

        {showQuiz && (
          <Quiz onCorrectAnswer={handleQuizSuccess} />
        )}

        {showLetter && !showGallery && !showFinalSurprise && (
          <Letter
            message={message}
            onClose={() => setShowGallery(true)}
          />
        )}

        {showGallery && !showFinalSurprise && (
          <Gallery onClose={handleGalleryClose} />
        )}

        {showFinalSurprise && (
          <FinalSurprise onClose={() => setShowFinalSurprise(false)} />
        )}
      </div>
    </div>
  );
}

export default App;