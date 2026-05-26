import { getLocalizedText } from "../../utils/getLocalizedText";

function QuizCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  showResult,
  language = "en",
}) {
  const displayedQuestion = getLocalizedText(question.question, language);

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:p-6">
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300">
          {question.category}
        </span>

        <span className="px-3 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
          {question.difficulty}
        </span>
      </div>

      <h2 className="mb-6 text-xl font-bold sm:text-2xl">{displayedQuestion}</h2>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const displayedOption = getLocalizedText(option, language);
          const isSelected = selectedAnswer === index;
          const isCorrect = question.correctAnswerIndex === index;

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
              key={displayedOption}
              onClick={() => onSelectAnswer(index)}
              disabled={showResult}
              className={`w-full text-left border rounded-xl px-4 py-3 transition ${optionClass}`}
            >
              <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center sm:gap-3">
                <span>{displayedOption}</span>

                {!showResult && isSelected && (
                  <span className="text-sm font-medium">
                    {language === "en" ? "Selected" : "Seçildi"}
                  </span>
                )}

                {showResult && isCorrect && (
                  <span className="text-sm font-medium">
                    {language === "en" ? "Correct" : "Doğru"}
                  </span>
                )}

                {showResult && isSelected && !isCorrect && (
                  <span className="text-sm font-medium">
                    {language === "en" ? "Your Answer" : "Cevabın"}
                  </span>
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
