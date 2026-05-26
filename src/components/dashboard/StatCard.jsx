function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:p-6">
      <p className="text-slate-400 text-sm mb-2">
        {title}
      </p>

      <h3 className="text-2xl font-bold sm:text-3xl">
        {value}
      </h3>
    </div>
  );
}

export default StatCard;
