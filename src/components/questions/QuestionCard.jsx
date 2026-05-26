import { getLocalizedText } from "../../utils/getLocalizedText";

function QuestionCard({ question, language = "en", isSolved, onToggleSolved }) {
  const displayedQuestion = getLocalizedText(question.question, language);
  const displayedAnswer = getLocalizedText(question.answer, language);

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4 transition hover:border-cyan-500 sm:p-6">
      <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div className="min-w-0">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300">
              {question.category}
            </span>
            <span className="px-3 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
              {question.difficulty}
            </span>
          </div>
          <h3 className="text-base font-semibold sm:text-lg">{displayedQuestion}</h3>
        </div>
        <button
          onClick={() => onToggleSolved(question.id)}
          className={`w-full shrink-0 rounded-xl px-4 py-2 text-xs transition sm:w-auto ${
            isSolved
              ? "bg-green-500 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          {isSolved ? "Solved" : "Mark Solved"}
        </button>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed">
        {displayedAnswer}
      </p>
    </div>
  );
}
export default QuestionCard;
