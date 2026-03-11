import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';
import { X, CheckCircle2, XCircle, Award, Sparkles } from 'lucide-react';

interface QuizPanelProps {
  onComplete: (score: number) => void;
  onClose: () => void;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Khởi nghĩa Hai Bà Trưng diễn ra vào năm nào?',
    options: ['Năm 40 SCN', 'Năm 938', 'Năm 1010', 'Năm 1288'],
    correctAnswer: 0,
    explanation: 'Khởi nghĩa Hai Bà Trưng diễn ra năm 40 SCN, chống lại sự đô hộ của nhà Hán.',
    difficulty: 'easy'
  },
  {
    id: 'q2',
    question: 'Chiến thắng nào đánh dấu việc Việt Nam thoát khỏi ách đô hộ phương Bắc?',
    options: [
      'Chiến thắng Bạch Đằng 938',
      'Chiến thắng Điện Biên Phủ',
      'Khởi nghĩa Lam Sơn',
      'Cách mạng tháng Tám'
    ],
    correctAnswer: 0,
    explanation: 'Chiến thắng Bạch Đằng năm 938 của Ngô Quyền đã đánh bại quân Nam Hán, mở ra thời kỳ độc lập tự chủ.',
    difficulty: 'medium'
  },
  {
    id: 'q3',
    question: 'Trần Hưng Đạo đã sử dụng chiến thuật gì để đánh bại quân Mông Cổ?',
    options: [
      'Phục binh trong rừng',
      'Cọc ngầm trên sông Bạch Đằng',
      'Tấn công đêm',
      'Bao vây thành trì'
    ],
    correctAnswer: 1,
    explanation: 'Trần Hưng Đạo đã dùng chiến thuật cọc ngầm trên sông Bạch Đằng, tận dụng thủy triều để tiêu diệt quân Nguyên-Mông.',
    difficulty: 'medium'
  },
  {
    id: 'q4',
    question: 'Lý Thái Tổ dời đô từ đâu về Thăng Long?',
    options: ['Hoa Lư', 'Đại La', 'Cổ Loa', 'Lam Sơn'],
    correctAnswer: 0,
    explanation: 'Lý Công Uẩn (Lý Thái Tổ) dời đô từ Hoa Lư về Đại La và đổi tên thành Thăng Long năm 1010.',
    difficulty: 'easy'
  },
  {
    id: 'q5',
    question: 'Khởi nghĩa Lam Sơn kéo dài bao nhiêu năm?',
    options: ['5 năm', '10 năm', '15 năm', '20 năm'],
    correctAnswer: 1,
    explanation: 'Khởi nghĩa Lam Sơn do Lê Lợi lãnh đạo kéo dài 10 năm (1418-1428) chống quân Minh.',
    difficulty: 'hard'
  }
];

export function QuizPanel({ onComplete, onClose }: QuizPanelProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
    new Array(quizQuestions.length).fill(false)
  );

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quizQuestions.length - 1;
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const handleAnswerSelect = (answerIndex: number) => {
    if (answeredQuestions[currentQuestionIndex]) return;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      const points = currentQuestion.difficulty === 'hard' ? 30 : 
                     currentQuestion.difficulty === 'medium' ? 20 : 10;
      setScore(prev => prev + points);
    }

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnswered);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-900/30';
      case 'medium': return 'text-yellow-400 bg-yellow-900/30';
      case 'hard': return 'text-red-400 bg-red-900/30';
      default: return 'text-slate-400 bg-slate-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Dễ';
      case 'medium': return 'Trung bình';
      case 'hard': return 'Khó';
      default: return difficulty;
    }
  };

  return (
    <Card className="bg-slate-900 border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-slate-800 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="text-white">Quiz Cá nhân hóa AI</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-300">
              Câu hỏi {currentQuestionIndex + 1}/{quizQuestions.length}
            </span>
            <span className="text-blue-400">{score} điểm</span>
          </div>
          <Progress value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} />
        </div>
      </div>

      {/* Question */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className={getDifficultyColor(currentQuestion.difficulty)}>
                  {getDifficultyLabel(currentQuestion.difficulty)}
                </Badge>
                <Badge variant="outline">
                  {currentQuestion.difficulty === 'hard' ? '30' : 
                   currentQuestion.difficulty === 'medium' ? '20' : '10'} điểm
                </Badge>
              </div>
              <h4 className="text-white mb-4">{currentQuestion.question}</h4>
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrectAnswer = index === currentQuestion.correctAnswer;
                const showResult = showExplanation;

                let buttonClass = 'w-full text-left p-4 rounded-lg border-2 transition-all ';
                
                if (!showResult) {
                  buttonClass += isSelected 
                    ? 'border-blue-500 bg-blue-900/30 text-white' 
                    : 'border-slate-700 bg-slate-800 text-slate-300 hover:border-slate-600';
                } else {
                  if (isCorrectAnswer) {
                    buttonClass += 'border-green-500 bg-green-900/30 text-white';
                  } else if (isSelected && !isCorrectAnswer) {
                    buttonClass += 'border-red-500 bg-red-900/30 text-white';
                  } else {
                    buttonClass += 'border-slate-700 bg-slate-800/50 text-slate-400';
                  }
                }

                return (
                  <motion.button
                    key={index}
                    className={buttonClass}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={answeredQuestions[currentQuestionIndex]}
                    whileHover={!answeredQuestions[currentQuestionIndex] ? { scale: 1.02 } : {}}
                    whileTap={!answeredQuestions[currentQuestionIndex] ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          showResult && isCorrectAnswer ? 'bg-green-700' :
                          showResult && isSelected && !isCorrectAnswer ? 'bg-red-700' :
                          isSelected ? 'bg-blue-700' : 'bg-slate-700'
                        }`}>
                          <span className="text-white">
                            {String.fromCharCode(65 + index)}
                          </span>
                        </div>
                        <span>{option}</span>
                      </div>
                      
                      {showResult && isCorrectAnswer && (
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                      )}
                      {showResult && isSelected && !isCorrectAnswer && (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-lg border ${
                  isCorrect 
                    ? 'bg-green-900/20 border-green-700' 
                    : 'bg-red-900/20 border-red-700'
                }`}
              >
                <div className="flex items-start gap-2">
                  {isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                  )}
                  <div>
                    <p className={`mb-2 ${isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                      {isCorrect ? 'Chính xác!' : 'Chưa chính xác'}
                    </p>
                    <p className="text-slate-300 text-sm">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Next Button */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6"
              >
                <Button onClick={handleNext} className="w-full">
                  {isLastQuestion ? (
                    <>
                      <Award className="w-4 h-4 mr-2" />
                      Hoàn thành Quiz
                    </>
                  ) : (
                    'Câu tiếp theo'
                  )}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
}
