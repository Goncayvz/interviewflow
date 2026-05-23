import { useEffect, useState } from "react";
import { questions } from "../data/questions";

const getRandomQuestionValue = () => {
  const randomIndex = Math.floor(Math.random() * questions.length);
  return questions[randomIndex];
};

function MockInterview() {
  const [currentQuestion, setCurrentQuestion] = useState(() =>
    getRandomQuestionValue()
  );
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [notes, setNotes] = useState("");
  const [language, setLanguage] = useState("en");

  const getRandomQuestion = () => {
    setCurrentQuestion(getRandomQuestionValue());
    setNotes("");
    setTimeLeft(15 * 60);
    setIsRunning(false);
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

  const displayedQuestion =
    typeof currentQuestion?.question === "object"
      ? currentQuestion.question[language]
      : currentQuestion?.question;

  const displayedAnswer =
    typeof currentQuestion?.answer === "object"
      ? currentQuestion.answer[language]
      : currentQuestion?.answer;

  if (!currentQuestion) {
    return <p className="text-slate-400">Loading question...</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Mock Interview</h1>
          <p className="text-slate-400">
            Simulate a real technical interview session with a timer and notes.
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

          <div className="bg-slate-900 border border-slate-700 rounded-xl p-5">
            <p className="text-slate-400 mb-2">
              {language === "en" ? "Suggested Answer" : "Önerilen Cevap"}
            </p>

            <p className="text-slate-200 leading-relaxed">
              {displayedAnswer}
            </p>
          </div>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-5">
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
              onClick={() => {
                setTimeLeft(15 * 60);
                setIsRunning(false);
              }}
              className="bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl transition"
            >
              {language === "en" ? "Reset" : "Sıfırla"}
            </button>
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={
              language === "en"
                ? "Write your interview notes..."
                : "Mülakat notlarını yaz..."
            }
            className="w-full min-h-40 bg-slate-900 border border-slate-700 rounded-xl p-4 outline-none focus:border-cyan-500 resize-none"
          />

          <button
            onClick={getRandomQuestion}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl transition"
          >
            {language === "en" ? "Next Question" : "Sonraki Soru"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MockInterview;
