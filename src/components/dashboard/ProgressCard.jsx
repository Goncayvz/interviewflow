function ProgressCard({ skills }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:p-6">
      <h2 className="mb-4 text-lg font-semibold sm:mb-6 sm:text-xl">
        Skill Progress
      </h2>

      <div className="space-y-5">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-2">
              <span>{skill.name}</span>
              <span>{skill.progress}%</span>
            </div>

            <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 rounded-full"
                style={{
                  width: `${skill.progress}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressCard;
