import { useEffect, useState } from "react";
import { questions } from "../data/questions";
import { getLocalizedText } from "../utils/getLocalizedText";

const categories = ["All", "React", "JavaScript", "HTML/CSS", "Algorithms"];
const difficulties = ["All", "Easy", "Medium", "Hard"];
const durations = [5, 10, 15, 20, 30];

const getFilteredQuestions = (category, difficulty) => {
  return questions.filter((question) => {
    const matchesCategory = category === "All" || question.category === category;
    const matchesDifficulty =
      difficulty === "All" || question.difficulty === difficulty;

    return matchesCategory && matchesDifficulty;
  });
};

const getRandomQuestionValue = (category = "All", difficulty = "All") => {
  const filteredQuestions = getFilteredQuestions(category, difficulty);
  const questionPool = filteredQuestions.length > 0 ? filteredQuestions : questions;
  const randomIndex = Math.floor(Math.random() * questionPool.length);

  return questionPool[randomIndex];
};

const readSolvedQuestions = () => {
  try {
    const storedSolved = JSON.parse(localStorage.getItem("interviewflow_solved"));

    return Array.isArray(storedSolved) ? storedSolved : [];
  } catch {
    return [];
  }
};

function MockInterview() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState(15);
  const [currentQuestion, setCurrentQuestion] = useState(() =>
    getRandomQuestionValue()
  );
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [notes, setNotes] = useState("");
  const [language, setLanguage] = useState("en");
  const [showAnswer, setShowAnswer] = useState(false);
  const [solvedQuestions, setSolvedQuestions] = useState(readSolvedQuestions);

  useEffect(() => {
    localStorage.setItem("interviewflow_solved", JSON.stringify(solvedQuestions));
  }, [solvedQuestions]);

  const resetSession = (duration = selectedDuration) => {
    setNotes("");
    setShowAnswer(false);
    setTimeLeft(Number(duration) * 60);
    setIsRunning(false);
  };

  const getRandomQuestion = () => {
    setCurrentQuestion(getRandomQuestionValue(selectedCategory, selectedDifficulty));
    resetSession();
  };

  const handleDurationChange = (value) => {
    const duration = Number(value);

    setSelectedDuration(duration);
    resetSession(duration);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentQuestion(getRandomQuestionValue(category, selectedDifficulty));
    resetSession();
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentQuestion(getRandomQuestionValue(selectedCategory, difficulty));
    resetSession();
  };

  useEffect(() => {
    if (!isRunning) {
      return undefined;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  if (!currentQuestion) {
    return <p className="text-slate-400">Loading question...</p>;
  }

  const displayedQuestion = getLocalizedText(currentQuestion.question, language);
  const displayedAnswer = getLocalizedText(currentQuestion.answer, language);
  const isCurrentQuestionSolved = solvedQuestions.includes(currentQuestion.id);
  const availableQuestions = getFilteredQuestions(
    selectedCategory,
    selectedDifficulty
  );

  const markCurrentQuestionSolved = () => {
    setSolvedQuestions((prev) =>
      prev.includes(currentQuestion.id) ? prev : [...prev, currentQuestion.id]
    );
  };

  const handleToggleAnswer = () => {
    setShowAnswer((prev) => !prev);
    markCurrentQuestionSolved();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Mock Interview</h1>
          <p className="text-slate-400">
            {language === "en"
              ? "Simulate a real technical interview session with a timer and notes."
              : "Zamanlayıcı ve notlarla gerçek bir teknik mülakat oturumu simüle et."}
          </p>
        </div>

        <button
          onClick={() => setLanguage((prev) => (prev === "en" ? "tr" : "en"))}
          className="bg-slate-800 border border-slate-700 hover:border-cyan-500 px-4 py-2 rounded-xl transition text-sm"
        >
          {language === "en" ? "TR" : "EN"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <div className="flex gap-2 mb-5">
            <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300">
              {currentQuestion.category}
            </span>

            <span className="px-3 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
              {currentQuestion.difficulty}
            </span>
          </div>

          <h2 className="text-3xl font-bold mb-6">{displayedQuestion}</h2>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleToggleAnswer}
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-3 rounded-xl transition"
            >
              {showAnswer
                ? language === "en"
                  ? "Hide Answer"
                  : "Cevabı Gizle"
                : language === "en"
                  ? "Show Answer"
                  : "Cevabı Göster"}
            </button>

            {isCurrentQuestionSolved && (
              <span className="bg-green-500 text-white px-5 py-3 rounded-xl">
                {language === "en" ? "Practiced" : "Çalışıldı"}
              </span>
            )}
          </div>

          {showAnswer && (
            <div className="mt-5 bg-slate-900 border border-slate-700 rounded-xl p-5">
              <p className="text-slate-400 mb-2">
                {language === "en" ? "Suggested Answer" : "Önerilen Cevap"}
              </p>

              <p className="text-slate-200 leading-relaxed">
                {displayedAnswer}
              </p>
            </div>
          )}
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-5">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">
                {language === "en" ? "Category" : "Kategori"}
              </label>
              <select
                value={selectedCategory}
                onChange={(event) => handleCategoryChange(event.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "All" && language === "tr" ? "Tümü" : category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                {language === "en" ? "Difficulty" : "Zorluk"}
              </label>
              <select
                value={selectedDifficulty}
                onChange={(event) => handleDifficultyChange(event.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === "All" && language === "tr"
                      ? "Tümü"
                      : difficulty === "Easy" && language === "tr"
                        ? "Kolay"
                        : difficulty === "Medium" && language === "tr"
                          ? "Orta"
                          : difficulty === "Hard" && language === "tr"
                            ? "Zor"
                            : difficulty}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                {language === "en" ? "Duration" : "Süre"}
              </label>
              <select
                value={selectedDuration}
                onChange={(event) => handleDurationChange(event.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
              >
                {durations.map((duration) => (
                  <option key={duration} value={duration}>
                    {language === "en"
                      ? `${duration} minutes`
                      : `${duration} dakika`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-400">
            {language === "en" ? "Available questions:" : "Mevcut soru:"}{" "}
            <span className="text-cyan-400 font-semibold">
              {availableQuestions.length}
            </span>
          </div>

          <div className="text-center">
            <p className="text-slate-400 mb-2">
              {language === "en" ? "Interview Timer" : "Mülakat Süresi"}
            </p>

            <div className="text-5xl font-bold text-cyan-400">
              {formatTime(timeLeft)}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setIsRunning(true)}
              className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl transition"
            >
              {language === "en" ? "Start" : "Başlat"}
            </button>

            <button
              onClick={() => setIsRunning(false)}
              className="bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl transition"
            >
              {language === "en" ? "Pause" : "Duraklat"}
            </button>

            <button
              onClick={() => resetSession()}
              className="bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl transition"
            >
              {language === "en" ? "Reset" : "Sıfırla"}
            </button>
          </div>

          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder={
              language === "en"
                ? "Write your interview notes..."
                : "Mülakat notlarını yaz..."
            }
            className="w-full min-h-40 bg-slate-900 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500 resize-none"
          />

          <button
            onClick={getRandomQuestion}
            disabled={availableQuestions.length === 0}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl transition disabled:opacity-50"
          >
            {language === "en" ? "Next Question" : "Sonraki Soru"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MockInterview;
