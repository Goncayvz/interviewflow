const categories = ["All", "React", "JavaScript", "HTML/CSS"];
const difficulties = ["All", "Easy", "Medium", "Hard"];

function QuestionFilter({
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
      >
        {categories.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </select>

      <select
        value={selectedDifficulty}
        onChange={(e) => setSelectedDifficulty(e.target.value)}
        className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
      >
        {difficulties.map((difficulty) => (
          <option key={difficulty}>{difficulty}</option>
        ))}
      </select>
    </div>
  );
}

export default QuestionFilter;