import { useEffect, useState } from "react";
import { questions } from "../data/questions";
import QuestionCard from "../components/questions/QuestionCard";
import SearchBar from "../components/questions/SearchBar";
import QuestionFilter from "../components/questions/QuestionFilter";

function QuestionBank() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [solvedQuestions, setSolvedQuestions] = useState([]);

  useEffect(() => {
    const storedSolved = JSON.parse(
      localStorage.getItem("interviewflow_solved")
    );

    if (storedSolved) {
      setSolvedQuestions(storedSolved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "interviewflow_solved",
      JSON.stringify(solvedQuestions)
    );
  }, [solvedQuestions]);

  const handleToggleSolved = (id) => {
    setSolvedQuestions((prev) =>
      prev.includes(id)
        ? prev.filter((questionId) => questionId !== id)
        : [...prev, id]
    );
  };

  const filteredQuestions = questions.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesDifficulty =
      selectedDifficulty === "All" ||
      item.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Question Bank</h1>
        <p className="text-slate-400">
          Practice technical interview questions by category and difficulty.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        <QuestionFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
        />
      </div>

      <div className="text-slate-400">
        Showing {filteredQuestions.length} questions
      </div>

      <div className="grid grid-cols-1 gap-5">
        {filteredQuestions.map((item) => (
          <QuestionCard
            key={item.id}
            question={item}
            isSolved={solvedQuestions.includes(item.id)}
            onToggleSolved={handleToggleSolved}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionBank;