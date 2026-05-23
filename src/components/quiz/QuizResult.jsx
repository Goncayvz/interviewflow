function QuizResult({ score, total, onRestart }) {
  const percentage = Math.round((score / total) * 100);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center">
      <h2 className="text-3xl font-bold mb-3">Quiz Completed 🎉</h2>

      <p className="text-slate-400 mb-6">
        You answered {score} out of {total} questions correctly.
      </p>

      <div className="text-6xl font-bold text-cyan-400 mb-6">
        {percentage}%
      </div>

      <button
        onClick={onRestart}
        className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-xl transition"
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default QuizResult;