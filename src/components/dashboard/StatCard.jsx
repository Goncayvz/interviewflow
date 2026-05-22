function StatCard({ title, value }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
      <p className="text-slate-400 text-sm mb-2">
        {title}
      </p>

      <h3 className="text-3xl font-bold">
        {value}
      </h3>
    </div>
  );
}

export default StatCard;