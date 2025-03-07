import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Gift } from 'lucide-react';

interface QuizProps {
  onComplete: () => void;
  onClose: () => void;
}

type Question = {
  question: string;
  options: string[];
  correctAnswer: number;
};

// Thay đổi câu hỏi phù hợp với mối quan hệ của bạn
const questions: Question[] = [
  {
    question: "Chúng ta đã gặp nhau lần đầu tiên ở đâu?",
    options: ["Quán cà phê", "Trường học", "Công ty", "Qua bạn bè giới thiệu"],
    correctAnswer: 1, // Thay đổi đáp án đúng (index bắt đầu từ 0)
  },
  {
    question: "Kỷ niệm đầu tiên của chúng ta là gì?",
    options: ["Đi xem phim", "Đi ăn tối", "Đi dạo công viên", "Đi du lịch"],
    correctAnswer: 0, // Thay đổi đáp án đúng
  },
  {
    question: "Món ăn yêu thích của tôi là gì?",
    options: ["Bún bò", "Phở", "Cơm rang", "Pizza"],
    correctAnswer: 3, // Thay đổi đáp án đúng
  },
  {
    question: "Ngày kỷ niệm của chúng ta là ngày nào?",
    options: ["14/2", "8/3", "20/10", "20/11"],
    correctAnswer: 2, // Thay đổi đáp án đúng
  },
  {
    question: "Bài hát mà chúng ta thường nghe cùng nhau là gì?",
    options: ["Cơn mưa ngang qua", "Em của ngày hôm qua", "Có chàng trai viết lên cây", "Making My Way"],
    correctAnswer: 2, // Thay đổi đáp án đúng
  }
];

export function Quiz({ onComplete, onClose }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  
  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
    
    // Hiển thị kết quả trong 1.5 giây trước khi chuyển câu hỏi
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };
  
  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setScore(0);
    setShowResult(false);
  };
  
  // Người dùng cần đúng ít nhất 3/5 câu để đạt
  const passingScore = 3;
  const passed = score >= passingScore;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
    >
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full relative">
        {!showResult ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-pink-600">Quiz Tình Yêu</h2>
                <span className="text-gray-500">Câu {currentQuestion + 1}/{questions.length}</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-pink-600 h-2.5 rounded-full" 
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-xl font-medium text-gray-800">
                  {questions[currentQuestion].question}
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full p-4 rounded-lg text-left transition-all transform hover:scale-105
                    ${selectedAnswer === index 
                      ? isCorrect 
                        ? 'bg-green-100 border-2 border-green-500' 
                        : 'bg-red-100 border-2 border-red-500'
                      : 'bg-gray-100 hover:bg-pink-50 border-2 border-transparent'}
                  `}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <div className="flex justify-between items-center">
                    <span>{option}</span>
                    {selectedAnswer === index && (
                      isCorrect ? 
                        <CheckCircle className="text-green-500" size={24} /> : 
                        <XCircle className="text-red-500" size={24} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-pink-600 mb-4">Kết quả</h2>
              <p className="text-lg text-gray-700">
                Bạn đã trả lời đúng {score}/{questions.length} câu hỏi
              </p>
            </div>
            
            {passed ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mb-8"
              >
                <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift size={64} className="text-pink-600" />
                </div>
                <p className="text-xl font-medium text-gray-800">
                  Chúc mừng! Bạn đã mở khóa kho ảnh kỷ niệm
                </p>
              </motion.div>
            ) : (
              <div className="mb-8">
                <p className="text-lg text-gray-700 mb-4">
                  Hãy thử lại để mở khóa kho ảnh kỷ niệm nhé!
                </p>
                <p className="text-sm text-gray-500">
                  (Bạn cần đúng ít nhất {passingScore} câu)
                </p>
              </div>
            )}
            
            <div className="flex justify-center space-x-4">
              {!passed && (
                <button
                  onClick={handleRetry}
                  className="px-6 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
                >
                  Thử lại
                </button>
              )}
              
              {passed && (
                <button
                  onClick={onComplete}
                  className="px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                >
                  Xem kỷ niệm
                </button>
              )}
              
              <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}