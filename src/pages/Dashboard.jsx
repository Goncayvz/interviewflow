import StatCard from "../components/dashboard/StatCard";
import ProgressCard from "../components/dashboard/ProgressCard";
import ActivityChart from "../components/dashboard/ActivityChart";

function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">
          Welcome Back 👋
        </h1>

        <p className="text-slate-400">
          Track your technical interview preparation progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Questions"
          value="320"
        />

        <StatCard
          title="Solved Questions"
          value="148"
        />

        <StatCard
          title="Success Rate"
          value="78%"
        />

        <StatCard
          title="Study Streak"
          value="12 Days"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <ActivityChart />
        </div>

        <ProgressCard />
      </div>
    </div>
  );
}

export default Dashboard;