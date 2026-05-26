function QuizResult({ score, total, onRestart, language = "en", quizRecord }) {
  const percentage =
    quizRecord?.percentage ?? (total > 0 ? Math.round((score / total) * 100) : 0);
  const correct = quizRecord?.correct ?? score;
  const incorrect = quizRecord?.incorrect ?? total - score;
  const category = quizRecord?.category || "All";
  const date = quizRecord?.date ? new Date(quizRecord.date) : new Date();
  const formattedDate = date.toLocaleString(language === "en" ? "en-US" : "tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4 text-center sm:p-8">
      <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
        {language === "en" ? "Quiz Completed" : "Quiz Tamamlandı"}
      </h2>

      <p className="text-slate-400 mb-6">
        {language === "en"
          ? `You answered ${correct} out of ${total} questions correctly.`
          : `${total} sorudan ${correct} tanesini doğru cevapladın.`}
      </p>

      <div className="mb-6 text-5xl font-bold text-cyan-400 sm:text-6xl">
        {percentage}%
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-left">
        <div className="bg-slate-900/60 rounded-xl p-4">
          <p className="text-slate-400 text-sm mb-1">
            {language === "en" ? "Correct" : "Doğru"}
          </p>
          <p className="text-2xl font-bold text-green-300">{correct}</p>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-4">
          <p className="text-slate-400 text-sm mb-1">
            {language === "en" ? "Wrong" : "Yanlış"}
          </p>
          <p className="text-2xl font-bold text-red-300">{incorrect}</p>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-4">
          <p className="text-slate-400 text-sm mb-1">
            {language === "en" ? "Category" : "Kategori"}
          </p>
          <p className="text-2xl font-bold">{category}</p>
        </div>

        <div className="bg-slate-900/60 rounded-xl p-4">
          <p className="text-slate-400 text-sm mb-1">
            {language === "en" ? "Date" : "Tarih"}
          </p>
          <p className="text-lg font-semibold">{formattedDate}</p>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition"
      >
        {language === "en" ? "Restart Quiz" : "Quizi Yeniden Başlat"}
      </button>
    </div>
  );
}

export default QuizResult;
