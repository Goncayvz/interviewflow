import StatCard from "../components/dashboard/StatCard";
import ProgressCard from "../components/dashboard/ProgressCard";
import ActivityChart from "../components/dashboard/ActivityChart";
import { questions } from "../data/questions";

const categories = ["React", "JavaScript", "HTML/CSS", "Algorithms"];

const readStoredArray = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));

    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const readQuizStats = () => {
  try {
    const value = JSON.parse(localStorage.getItem("interviewflow_quiz_stats"));

    return value && typeof value === "object"
      ? value
      : { sessions: 0, attempted: 0, correct: 0 };
  } catch {
    return { sessions: 0, attempted: 0, correct: 0 };
  }
};

function Dashboard() {
  const solvedQuestions = readStoredArray("interviewflow_solved");
  const quizStats = readQuizStats();
  const totalQuestions = questions.length;
  const solvedCount = solvedQuestions.length;
  const successRate =
    totalQuestions > 0 ? Math.round((solvedCount / totalQuestions) * 100) : 0;
  const quizAccuracy =
    quizStats.attempted > 0
      ? Math.round((quizStats.correct / quizStats.attempted) * 100)
      : 0;
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
      progress: total > 0 ? Math.round((solved / total) * 100) : 0,
    };
  });
  const skills = categoryData.map((item) => ({
    name: item.category,
    progress: item.progress,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mb-2 text-3xl font-bold sm:text-4xl">
          Welcome Back 👋
        </h1>

        <p className="text-slate-400">
          Track your technical interview preparation progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Questions"
          value={totalQuestions}
        />

        <StatCard
          title="Solved Questions"
          value={solvedCount}
        />

        <StatCard
          title="Success Rate"
          value={`${successRate}%`}
        />

        <StatCard
          title="Quiz Accuracy"
          value={`${quizAccuracy}%`}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ActivityChart data={categoryData} />
        </div>

        <ProgressCard skills={skills} />
      </div>
    </div>
  );
}

export default Dashboard;
