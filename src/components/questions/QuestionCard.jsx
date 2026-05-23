function QuestionCard({ question,isSolved,onToggleSolved }) {
    return(
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-cyan-500 transition">
            <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                    <div className="flex gap-2 mb-3">
                        <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300">
                            {question.category}
                        </span>
                        <span className="px-3 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
                            {question.difficulty}
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold">{question.question}</h3>
                    </div>
                    <button
                    onClick={() =>onToggleSolved(question.id)}
                    className={`px-4 py-2 rounded-xl text-xs transition ${
                        isSolved
                          ? "bg-green-500 text-white"
                          : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                    >
                    {isSolved ? "Solved" : "Mark  Solved"}
                    </button>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
                {question.answer}
            </p>
        </div>
    );
}
export default QuestionCard;