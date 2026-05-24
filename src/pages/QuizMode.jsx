import { useState } from "react";
import QuizCard from "../components/quiz/QuizCard";
import QuizResult from "../components/quiz/QuizResult";

const quizQuestions = [
  {
    id: 1,
    category: "React",
    difficulty: "Easy",
    question: {
      en: "What is JSX?",
      tr: "JSX nedir?",
    },
    options: [
      { en: "A JavaScript syntax extension", tr: "Bir JavaScript sözdizimi uzantısı" },
      { en: "A database query language", tr: "Bir veritabanı sorgu dili" },
      { en: "A CSS framework", tr: "Bir CSS framework'ü" },
      { en: "A testing library", tr: "Bir test kütüphanesi" },
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 2,
    category: "React",
    difficulty: "Medium",
    question: {
      en: "Which hook is used to manage state in functional components?",
      tr: "Functional componentlerde state yönetmek için hangi hook kullanılır?",
    },
    options: [
      { en: "useEffect", tr: "useEffect" },
      { en: "useState", tr: "useState" },
      { en: "useMemo", tr: "useMemo" },
      { en: "useRef", tr: "useRef" },
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 3,
    category: "JavaScript",
    difficulty: "Medium",
    question: {
      en: "What does the map() method return?",
      tr: "map() metodu ne döndürür?",
    },
    options: [
      { en: "A new array", tr: "Yeni bir array" },
      { en: "A boolean value", tr: "Boolean bir değer" },
      { en: "The original array only", tr: "Sadece orijinal array" },
      { en: "An object key", tr: "Bir object key'i" },
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 4,
    category: "HTML/CSS",
    difficulty: "Easy",
    question: {
      en: "Which CSS property is used for flexible layouts?",
      tr: "Esnek layoutlar için hangi CSS özelliği kullanılır?",
    },
    options: [
      { en: "position", tr: "position" },
      { en: "display: flex", tr: "display: flex" },
      { en: "z-index", tr: "z-index" },
      { en: "opacity", tr: "opacity" },
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 5,
    category: "React",
    difficulty: "Hard",
    question: {
      en: "What is reconciliation in React?",
      tr: "React'te reconciliation nedir?",
    },
    options: [
      {
        en: "React's process of comparing virtual DOM changes",
        tr: "React'in virtual DOM değişikliklerini karşılaştırma süreci",
      },
      { en: "A CSS layout technique", tr: "Bir CSS layout tekniği" },
      { en: "A database normalization method", tr: "Bir veritabanı normalizasyon yöntemi" },
      { en: "A browser caching strategy", tr: "Bir tarayıcı cache stratejisi" },
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 6,
    category: "JavaScript",
    difficulty: "Hard",
    question: {
      en: "What is the event loop responsible for?",
      tr: "Event loop neyden sorumludur?",
    },
    options: [
      { en: "Managing asynchronous execution", tr: "Asenkron çalışmayı yönetmek" },
      { en: "Styling DOM elements", tr: "DOM elementlerini stillendirmek" },
      { en: "Compiling CSS", tr: "CSS derlemek" },
      { en: "Creating React components", tr: "React componentleri oluşturmak" },
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 7,
    category: "Algorithms",
    difficulty: "Easy",
    question: {
      en: "What does binary search require?",
      tr: "Binary search ne gerektirir?",
    },
    options: [
      { en: "A sorted list", tr: "Sıralı bir liste" },
      { en: "A CSS file", tr: "Bir CSS dosyası" },
      { en: "A React component", tr: "Bir React componenti" },
      { en: "An unsorted object only", tr: "Sadece sıralanmamış bir object" },
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 8,
    category: "Algorithms",
    difficulty: "Medium",
    question: {
      en: "Which data structure uses FIFO order?",
      tr: "Hangi veri yapısı FIFO sırasını kullanır?",
    },
    options: [
      { en: "Stack", tr: "Stack" },
      { en: "Queue", tr: "Queue" },
      { en: "Tree", tr: "Tree" },
      { en: "Set", tr: "Set" },
    ],
    correctAnswerIndex: 1,
  },
  {
    id: 9,
    category: "Algorithms",
    difficulty: "Medium",
    question: {
      en: "What does O(n) usually mean?",
      tr: "O(n) genellikle ne anlama gelir?",
    },
    options: [
      { en: "Runtime grows linearly with input size", tr: "Çalışma süresi input boyutuyla doğrusal artar" },
      { en: "Runtime is always constant", tr: "Çalışma süresi her zaman sabittir" },
      { en: "Runtime is always zero", tr: "Çalışma süresi her zaman sıfırdır" },
      { en: "Runtime depends only on CSS", tr: "Çalışma süresi sadece CSS'e bağlıdır" },
    ],
    correctAnswerIndex: 0,
  },
  {
    id: 10,
    category: "Algorithms",
    difficulty: "Hard",
    question: {
      en: "What is dynamic programming commonly used for?",
      tr: "Dynamic programming genellikle ne için kullanılır?",
    },
    options: [
      { en: "Solving overlapping subproblems efficiently", tr: "Örtüşen alt problemleri verimli çözmek" },
      { en: "Changing HTML tag names", tr: "HTML tag isimlerini değiştirmek" },
      { en: "Styling layouts", tr: "Layoutları stillendirmek" },
      { en: "Creating browser events only", tr: "Sadece tarayıcı eventleri oluşturmak" },
    ],
    correctAnswerIndex: 0,
  },
];

const saveQuizStats = (quizRecord) => {
  const defaultStats = {
    sessions: 0,
    attempted: 0,
    correct: 0,
    incorrect: 0,
  };

  try {
    const storedStats = JSON.parse(localStorage.getItem("interviewflow_quiz_stats"));
    const previousStats = storedStats && typeof storedStats === "object" ? storedStats : defaultStats;
    const storedHistory = JSON.parse(localStorage.getItem("interviewflow_quiz_history"));
    const previousHistory = Array.isArray(storedHistory) ? storedHistory : [];

    localStorage.setItem(
      "interviewflow_quiz_stats",
      JSON.stringify({
        sessions: previousStats.sessions + 1,
        attempted: previousStats.attempted + quizRecord.total,
        correct: previousStats.correct + quizRecord.correct,
        incorrect: (previousStats.incorrect || 0) + quizRecord.incorrect,
      })
    );
    localStorage.setItem(
      "interviewflow_quiz_history",
      JSON.stringify([quizRecord, ...previousHistory])
    );
  } catch {
    localStorage.setItem(
      "interviewflow_quiz_stats",
      JSON.stringify({
        sessions: 1,
        attempted: quizRecord.total,
        correct: quizRecord.correct,
        incorrect: quizRecord.incorrect,
      })
    );
    localStorage.setItem("interviewflow_quiz_history", JSON.stringify([quizRecord]));
  }
};

function QuizMode() {
  const [isStarted, setIsStarted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [questionCount, setQuestionCount] = useState(3);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [language, setLanguage] = useState("en");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [quizRecord, setQuizRecord] = useState(null);

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
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
    setQuizRecord(null);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === activeQuestions[currentIndex].correctAnswerIndex) {
      setScore((prev) => prev + 1);
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    const isLastQuestion = currentIndex === activeQuestions.length - 1;

    if (isLastQuestion) {
      const total = activeQuestions.length;
      const record = {
        id: Date.now(),
        date: new Date().toISOString(),
        category: selectedCategory,
        difficulty: selectedDifficulty,
        total,
        correct: score,
        incorrect: total - score,
        percentage: total > 0 ? Math.round((score / total) * 100) : 0,
        questionIds: activeQuestions.map((question) => question.id),
      };

      saveQuizStats(record);
      setQuizRecord(record);
      setIsFinished(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleRestart = () => {
    setIsStarted(false);
    setActiveQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
    setQuizRecord(null);
  };

  const availableQuestions = getFilteredQuestions();

  if (!isStarted) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {language === "en" ? "Quiz Setup" : "Quiz Ayarları"}
            </h1>
            <p className="text-slate-400">
              {language === "en"
                ? "Customize your quiz before starting the session."
                : "Teste başlamadan önce quiz ayarlarını özelleştir."}
            </p>
          </div>

          <button
            onClick={() => setLanguage((prev) => (prev === "en" ? "tr" : "en"))}
            className="bg-slate-800 border border-slate-700 hover:border-cyan-500 px-4 py-2 rounded-xl transition text-sm"
          >
            {language === "en" ? "TR" : "EN"}
          </button>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-5">
          <div>
            <label className="block text-sm text-slate-400 mb-2">
              {language === "en" ? "Category" : "Kategori"}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
            >
              <option value="All">{language === "en" ? "All" : "Tümü"}</option>
              <option>React</option>
              <option>JavaScript</option>
              <option>HTML/CSS</option>
              <option>Algorithms</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">
              {language === "en" ? "Difficulty" : "Zorluk"}
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
            >
              <option value="All">{language === "en" ? "All" : "Tümü"}</option>
              <option value="Easy">{language === "en" ? "Easy" : "Kolay"}</option>
              <option value="Medium">{language === "en" ? "Medium" : "Orta"}</option>
              <option value="Hard">{language === "en" ? "Hard" : "Zor"}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-400 mb-2">
              {language === "en" ? "Number of Questions" : "Soru Sayısı"}
            </label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
            >
              <option value={3}>{language === "en" ? "3 Questions" : "3 Soru"}</option>
              <option value={5}>{language === "en" ? "5 Questions" : "5 Soru"}</option>
              <option value={10}>{language === "en" ? "10 Questions" : "10 Soru"}</option>
            </select>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-400">
            {language === "en" ? "Available questions:" : "Mevcut soru:"}{" "}
            <span className="text-cyan-400 font-semibold">
              {availableQuestions.length}
            </span>
          </div>

          <button
            onClick={handleStartQuiz}
            disabled={availableQuestions.length === 0}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition disabled:opacity-50"
          >
            {language === "en" ? "Start Quiz" : "Quizi Başlat"}
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
        language={language}
        quizRecord={quizRecord}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {language === "en" ? "Quiz Mode" : "Quiz Modu"}
          </h1>
          <p className="text-slate-400">
            {language === "en"
              ? "Test your technical interview knowledge with multiple-choice questions."
              : "Teknik mülakat bilgini çoktan seçmeli sorularla test et."}
          </p>
        </div>

        <button
          onClick={() => setLanguage((prev) => (prev === "en" ? "tr" : "en"))}
          className="bg-slate-800 border border-slate-700 hover:border-cyan-500 px-4 py-2 rounded-xl transition text-sm"
        >
          {language === "en" ? "TR" : "EN"}
        </button>
      </div>

      <div className="text-slate-400">
        {language === "en"
          ? `Question ${currentIndex + 1} of ${activeQuestions.length}`
          : `Soru ${currentIndex + 1} / ${activeQuestions.length}`}
      </div>

      <QuizCard
        question={activeQuestions[currentIndex]}
        selectedAnswer={selectedAnswer}
        onSelectAnswer={setSelectedAnswer}
        showResult={showResult}
        language={language}
      />

      <div className="flex justify-between">
        <button
          onClick={handleRestart}
          className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl transition"
        >
          {language === "en" ? "Exit Quiz" : "Quizden Çık"}
        </button>

        {!showResult ? (
          <button
            onClick={handleCheckAnswer}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition disabled:opacity-50"
            disabled={selectedAnswer === null}
          >
            {language === "en" ? "Check Answer" : "Cevabı Kontrol Et"}
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition"
          >
            {currentIndex === activeQuestions.length - 1
              ? language === "en"
                ? "Finish Quiz"
                : "Quizi Bitir"
              : language === "en"
                ? "Next Question"
                : "Sonraki Soru"}
          </button>
        )}
      </div>
    </div>
  );
}

export default QuizMode;
