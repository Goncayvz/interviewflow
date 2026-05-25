import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { questions } from "../data/questions";
import QuestionCard from "../components/questions/QuestionCard";
import SearchBar from "../components/questions/SearchBar";
import QuestionFilter from "../components/questions/QuestionFilter";
import { getSearchableText } from "../utils/getLocalizedText";
import {
  fetchRecords,
  syncQuestionSolved,
  syncQuestionUnsolved,
} from "../services/api";

function QuestionBank() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState(
    searchParams.get("difficulty") || "All"
  );
  const [language, setLanguage] = useState("en");
  const [solvedQuestions, setSolvedQuestions] = useState(() => {
    try {
      const storedSolved = JSON.parse(
        localStorage.getItem("interviewflow_solved")
      );

      return Array.isArray(storedSolved) ? storedSolved : [];
    } catch {
      return [];
    }
  });
  const [questionRecords, setQuestionRecords] = useState(() => {
    try {
      const storedRecords = JSON.parse(
        localStorage.getItem("interviewflow_question_records")
      );

      return storedRecords && typeof storedRecords === "object"
        ? storedRecords
        : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "interviewflow_solved",
      JSON.stringify(solvedQuestions)
    );
  }, [solvedQuestions]);

  useEffect(() => {
    localStorage.setItem(
      "interviewflow_question_records",
      JSON.stringify(questionRecords)
    );
  }, [questionRecords]);

  useEffect(() => {
    fetchRecords()
      .then((records) => {
        const nextQuestionRecords = Object.fromEntries(
          records.questionRecords.map((record) => [
            record.questionId,
            {
              source: record.source,
              solvedAt: record.solvedAt,
            },
          ])
        );
        const nextSolvedQuestions = Object.keys(nextQuestionRecords).map(Number);

        setSolvedQuestions(nextSolvedQuestions);
        setQuestionRecords(nextQuestionRecords);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const params = {};

    if (selectedCategory !== "All") {
      params.category = selectedCategory;
    }

    if (selectedDifficulty !== "All") {
      params.difficulty = selectedDifficulty;
    }

    setSearchParams(params, { replace: true });
  }, [selectedCategory, selectedDifficulty, setSearchParams]);

  const handleToggleSolved = (id) => {
    setSolvedQuestions((prev) => {
      const isSolved = prev.includes(id);

      setQuestionRecords((records) => {
        const nextRecords = { ...records };

        if (isSolved) {
          delete nextRecords[id];
          syncQuestionUnsolved(id);
        } else {
          const record = {
            solvedAt: new Date().toISOString(),
            source: "question-bank",
          };

          nextRecords[id] = record;
          syncQuestionSolved(id, record);
        }

        return nextRecords;
      });

      return isSolved
        ? prev.filter((questionId) => questionId !== id)
        : [...prev, id];
    });
  };

  const filteredQuestions = questions.filter((item) => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    const searchableQuestion = getSearchableText(item.question).toLowerCase();
    const searchableAnswer = getSearchableText(item.answer).toLowerCase();

    const matchesSearch =
      searchableQuestion.includes(normalizedSearchTerm) ||
      searchableAnswer.includes(normalizedSearchTerm);

    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;

    const matchesDifficulty =
      selectedDifficulty === "All" ||
      item.difficulty === selectedDifficulty;

    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Question Bank</h1>
          <p className="text-slate-400">
            Practice technical interview questions by category and difficulty.
          </p>
        </div>

        <button
          onClick={() => setLanguage((prev) => (prev === "en" ? "tr" : "en"))}
          className="bg-slate-800 border border-slate-700 hover:border-cyan-500 px-4 py-2 rounded-xl transition text-sm"
        >
          {language === "en" ? "TR" : "EN"}
        </button>
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
            language={language}
            isSolved={solvedQuestions.includes(item.id)}
            onToggleSolved={handleToggleSolved}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionBank;
