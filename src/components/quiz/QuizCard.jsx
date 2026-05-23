function QuizCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  showResult,
}) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
      <div className="flex gap-2 mb-4">
        <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300">
          {question.category}
        </span>

        <span className="px-3 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
          {question.difficulty}
        </span>
      </div>

      <h2 className="text-2xl font-bold mb-6">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = question.correctAnswer === option;

          let optionClass =
            "bg-slate-900 border-slate-700 hover:border-cyan-500";

          if (!showResult && isSelected) {
            optionClass = "bg-cyan-500/20 border-cyan-500 text-cyan-300";
          }

          if (showResult && isCorrect) {
            optionClass = "bg-green-500/20 border-green-500 text-green-300";
          }

          if (showResult && isSelected && !isCorrect) {
            optionClass = "bg-red-500/20 border-red-500 text-red-300";
          }

          return (
            <button
              key={option}
              onClick={() => onSelectAnswer(option)}
              disabled={showResult}
              className={`w-full text-left border rounded-xl px-4 py-3 transition ${optionClass}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span>{option}</span>

                {!showResult && isSelected && (
                  <span className="text-sm font-medium">Selected</span>
                )}

                {showResult && isCorrect && (
                  <span className="text-sm font-medium">Correct</span>
                )}

                {showResult && isSelected && !isCorrect && (
                  <span className="text-sm font-medium">Your Answer</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuizCard;