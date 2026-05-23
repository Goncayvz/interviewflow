import { useState } from "react";
import QuizCard from "../components/quiz/QuizCard";
import QuizResult from "../components/quiz/QuizResult";

const quizQuestions = [
  {
    id: 1,
    category: "React",
    difficulty: "Easy",
    question: "What is JSX?",
    options: [
      "A JavaScript syntax extension",
      "A database query language",
      "A CSS framework",
      "A testing library",
    ],
    correctAnswer: "A JavaScript syntax extension",
  },
  {
    id: 2,
    category: "React",
    difficulty: "Medium",
    question: "Which hook is used to manage state in functional components?",
    options: ["useEffect", "useState", "useMemo", "useRef"],
    correctAnswer: "useState",
  },
  {
    id: 3,
    category: "JavaScript",
    difficulty: "Medium",
    question: "What does the map() method return?",
    options: [
      "A new array",
      "A boolean value",
      "The original array only",
      "An object key",
    ],
    correctAnswer: "A new array",
  },
  {
    id: 4,
    category: "HTML/CSS",
    difficulty: "Easy",
    question: "Which CSS property is used for flexible layouts?",
    options: ["position", "display: flex", "z-index", "opacity"],
    correctAnswer: "display: flex",
  },
  {
    id: 5,
    category: "React",
    difficulty: "Hard",
    question: "What is reconciliation in React?",
    options: [
      "React's process of comparing virtual DOM changes",
      "A CSS layout technique",
      "A database normalization method",
      "A browser caching strategy",
    ],
    correctAnswer: "React's process of comparing virtual DOM changes",
  },
  {
    id: 6,
    category: "JavaScript",
    difficulty: "Hard",
    question: "What is the event loop responsible for?",
    options: [
      "Managing asynchronous execution",
      "Styling DOM elements",
      "Compiling CSS",
      "Creating React components",
    ],
    correctAnswer: "Managing asynchronous execution",
  },
];

function QuizMode() {
  const [isStarted, setIsStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [questionCount, setQuestionCount] = useState(3);
  const [activeQuestions, setActiveQuestions] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const getFilteredQuestions = () => {
    return quizQuestions.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesDifficulty =
        selectedDifficulty === "All" || item.difficulty === selectedDifficulty;

      return matchesCategory && matchesDifficulty;
    });
  };

  const handleStartQuiz = () => {
    const filtered = getFilteredQuestions();

    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Number(questionCount));

    setActiveQuestions(selected);
    setIsStarted(true);
    setCurrentIndex(0);
    setSelectedAnswer("");
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;

    if (selectedAnswer === activeQuestions[currentIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    const isLastQuestion = currentIndex === activeQuestions.length - 1;

    if (isLastQuestion) {
      setIsFinished(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer("");
    setShowResult(false);
  };

  const handleRestart = () => {
    setIsStarted(false);
    setActiveQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer("");
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  const availableQuestions = getFilteredQuestions();

  if (!isStarted) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Quiz Setup</h1>
          <p className="text-slate-400">
            Customize your quiz before starting the session.
          </p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
            >
              <option>All</option>
              <option>React</option>
              <option>JavaScript</option>
              <option>HTML/CSS</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Difficulty
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
            >
              <option>All</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">
              Number of Questions
            </label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
            >
              <option value={3}>3 Questions</option>
              <option value={5}>5 Questions</option>
              <option value={10}>10 Questions</option>
            </select>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-400">
            Available questions:{" "}
            <span className="text-cyan-400 font-semibold">
              {availableQuestions.length}
            </span>
          </div>

          <button
            onClick={handleStartQuiz}
            disabled={availableQuestions.length === 0}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition disabled:opacity-50"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <QuizResult
        score={score}
        total={activeQuestions.length}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Quiz Mode</h1>
        <p className="text-slate-400">
          Test your technical interview knowledge with multiple-choice questions.
        </p>
      </div>

      <div className="text-slate-400">
        Question {currentIndex + 1} of {activeQuestions.length}
      </div>

      <QuizCard
        question={activeQuestions[currentIndex]}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={setSelectedAnswer}
        showResult={showResult}
      />

      <div className="flex justify-between">
        <button
          onClick={handleRestart}
          className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl transition"
        >
          Exit Quiz
        </button>

        {!showResult ? (
          <button
            onClick={handleCheckAnswer}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition disabled:opacity-50"
            disabled={!selectedAnswer}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition"
          >
            {currentIndex === activeQuestions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizMode;