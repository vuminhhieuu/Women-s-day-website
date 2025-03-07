import { useState } from 'react';
import { motion } from 'framer-motion';

interface QuizProps {
  onCorrectAnswer: () => void;
}

export function Quiz({ onCorrectAnswer }: QuizProps) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const correctAnswer = 'coffee house'; // Change this to your correct answer

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.toLowerCase().trim() === correctAnswer) {
      onCorrectAnswer();
    } else {
      setError('Hmm... Có vẻ không đúng rồi. Hãy thử lại nhé!');
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4"
    >
      <h2 className="text-2xl font-semibold text-pink-600 mb-4 text-center">
        Câu đố nhỏ
      </h2>
      <p className="text-gray-700 mb-6 text-center">
        Để mở được món quà này, hãy trả lời câu hỏi sau:
        <br />
        <span className="font-medium">
          "Lần đầu tiên chúng ta gặp nhau ở đâu?"
        </span>
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={answer}
          onChange={(e) => {
            setAnswer(e.target.value);
            setError('');
          }}
          placeholder="Nhập câu trả lời của bạn..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition-colors"
        >
          Mở quà
        </button>
      </form>
    </motion.div>
  );
}