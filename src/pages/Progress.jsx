import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import { questions } from "../data/questions";

const categories = ["React", "JavaScript", "HTML/CSS", "Algorithms"];
const difficulties = ["Easy", "Medium", "Hard"];

const readSolvedQuestions = () => {
  try {
    const storedSolved = JSON.parse(localStorage.getItem("interviewflow_solved"));

    return Array.isArray(storedSolved) ? storedSolved : [];
  } catch {
    return [];
  }
};

const readQuizStats = () => {
  try {
    const storedStats = JSON.parse(localStorage.getItem("interviewflow_quiz_stats"));

    return storedStats && typeof storedStats === "object"
      ? {
          sessions: storedStats.sessions || 0,
          attempted: storedStats.attempted || 0,
          correct: storedStats.correct || 0,
          incorrect:
            storedStats.incorrect ?? (storedStats.attempted || 0) - (storedStats.correct || 0),
        }
      : { sessions: 0, attempted: 0, correct: 0, incorrect: 0 };
  } catch {
    return { sessions: 0, attempted: 0, correct: 0, incorrect: 0 };
  }
};

const readQuizHistory = () => {
  try {
    const storedHistory = JSON.parse(localStorage.getItem("interviewflow_quiz_history"));

    return Array.isArray(storedHistory) ? storedHistory : [];
  } catch {
    return [];
  }
};

function Progress() {
  const solvedQuestions = readSolvedQuestions();
  const quizStats = readQuizStats();
  const quizHistory = readQuizHistory();
  const solvedCount = solvedQuestions.length;
  const totalQuestion = questions.length;
  const successRate =
    totalQuestion > 0 ? Math.round((solvedCount / totalQuestion) * 100) : 0;
  const quizSuccessRate =
    quizStats.attempted > 0
      ? Math.round((quizStats.correct / quizStats.attempted) * 100)
      : 0;
  const totalQuizzes = quizHistory.length || quizStats.sessions;
  const averageScore =
    quizHistory.length > 0
      ? Math.round(
          quizHistory.reduce((sum, item) => sum + (item.percentage || 0), 0) /
            quizHistory.length
        )
      : quizSuccessRate;
  const correctWrongData = [
    { name: "Correct", value: quizStats.correct },
    { name: "Wrong", value: quizStats.incorrect },
  ];

  const categoryData = categories.map((category) => {
    const total = questions.filter((question) => question.category === category).length;
    const solved = questions.filter(
      (question) =>
        question.category === category && solvedQuestions.includes(question.id)
    ).length;

    return {
      category,
      solved,
      total,
      remaining: total - solved,
      completion: total > 0 ? Math.round((solved / total) * 100) : 0,
    };
  });

  const difficultyData = difficulties.map((difficulty) => {
    const value = questions.filter((question) => question.difficulty === difficulty).length;

    return {
      name: difficulty,
      value,
    };
  });

  const tooltipStyle = {
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
  };
  const tooltipItemStyle = {
    color: "var(--chart-label)",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Progress Analytics</h1>
        <p className="text-slate-400">
          Track your preparation progress and category performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Solved Questions</p>
          <h2 className="text-4xl font-bold">{solvedCount}</h2>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Total Questions</p>
          <h2 className="text-4xl font-bold">{totalQuestion}</h2>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Completion Rate</p>
          <h2 className="text-4xl font-bold text-cyan-400">{successRate}%</h2>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <div className="flex items-center justify-between gap-4 mb-5">
          <h2 className="text-xl font-semibold">Quiz Performance</h2>
          <span className="text-sm text-slate-400">
            {totalQuizzes} sessions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="bg-slate-900/60 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-2">Total Quizzes</p>
            <h3 className="text-3xl font-bold">{totalQuizzes}</h3>
          </div>

          <div className="bg-slate-900/60 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-2">Quiz Questions</p>
            <h3 className="text-3xl font-bold">{quizStats.attempted}</h3>
          </div>

          <div className="bg-slate-900/60 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-2">Correct Answers</p>
            <h3 className="text-3xl font-bold text-teal-300">
              {quizStats.correct}
            </h3>
          </div>

          <div className="bg-slate-900/60 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-2">Wrong Answers</p>
            <h3 className="text-3xl font-bold text-red-300">
              {quizStats.incorrect}
            </h3>
          </div>

          <div className="bg-slate-900/60 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-2">Quiz Success Rate</p>
            <h3 className="text-3xl font-bold text-purple-300">
              {quizSuccessRate}%
            </h3>
          </div>

          <div className="bg-slate-900/60 rounded-xl p-4">
            <p className="text-slate-400 text-sm mb-2">Average Score</p>
            <h3 className="text-3xl font-bold text-cyan-400">
              {averageScore}%
            </h3>
          </div>
        </div>

        <div className="mt-6 h-[280px] bg-slate-900/60 rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Correct / Wrong Chart</h3>

          <ResponsiveContainer width="100%" height="82%">
            <BarChart
              data={correctWrongData}
              margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
            >
              <XAxis
                dataKey="name"
                stroke="var(--chart-axis)"
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="var(--chart-axis)" allowDecimals={false} />
              <Tooltip
                contentStyle={tooltipStyle}
                itemStyle={tooltipItemStyle}
                cursor={{ fill: "transparent" }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {correctWrongData.map((item) => (
                  <Cell
                    key={item.name}
                    fill={
                      item.name === "Correct"
                        ? "var(--chart-secondary)"
                        : "var(--chart-tertiary)"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-w-5xl">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 h-[460px]">
          <div className="flex items-center justify-between gap-4 mb-5">
            <h2 className="text-xl font-semibold">Category Performance</h2>
            <span className="text-sm text-slate-400">
              {solvedCount}/{totalQuestion} solved
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {categoryData.map((item) => (
              <div
                key={item.category}
                className="rounded-xl bg-slate-900/60 px-4 py-3"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-slate-200">
                    {item.category}
                  </span>
                  <span className="text-sm font-semibold text-teal-300">
                    {item.completion}%
                  </span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-slate-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-cyan-500"
                    style={{ width: `${item.completion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={240}>
            <BarChart
              data={categoryData}
              margin={{ top: 10, right: 10, left: 0, bottom: 52 }}
            >
              <XAxis
                dataKey="category"
                stroke="var(--chart-axis)"
                interval={0}
                angle={-25}
                textAnchor="end"
                height={72}
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="var(--chart-axis)" allowDecimals={false} />
              <Tooltip
                contentStyle={tooltipStyle}
                itemStyle={tooltipItemStyle}
                cursor={{ fill: "transparent" }}
              />
              <Legend />
              <Bar
                dataKey="solved"
                stackId="category"
                fill="var(--chart-secondary)"
                radius={[8, 8, 0, 0]}
              >
                <LabelList
                  dataKey="solved"
                  position="insideTop"
                  fill="var(--chart-label)"
                  fontSize={12}
                />
              </Bar>
              <Bar
                dataKey="remaining"
                stackId="category"
                fill="var(--chart-muted)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 h-[390px]">
          <h2 className="text-xl font-semibold mb-6">
            Difficulty Distribution
          </h2>

          <ResponsiveContainer width="100%" height="82%">
            <BarChart
              data={difficultyData}
              margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            >
              <XAxis
                dataKey="name"
                stroke="var(--chart-axis)"
                interval={0}
                height={48}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                itemStyle={tooltipItemStyle}
                cursor={{ fill: "transparent" }}
              />
              <Bar
                dataKey="value"
                fill="var(--chart-tertiary)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-6">Category Progress</h2>

        <div className="space-y-5">
          {categoryData.map((item) => (
            <Link
              key={item.category}
              to={`/question?category=${encodeURIComponent(item.category)}`}
              className="block rounded-xl p-3 -m-3 transition hover:bg-slate-900/60"
            >
              <div className="flex items-center justify-between gap-4 mb-2">
                <div>
                  <span className="font-medium">{item.category}</span>
                  <p className="text-xs text-slate-400">
                    Open filtered questions
                  </p>
                </div>

                <span className="text-slate-400">
                  {item.solved}/{item.total} - {item.completion}%
                </span>
              </div>

              <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cyan-500 rounded-full"
                  style={{ width: `${item.completion}%` }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Progress;
