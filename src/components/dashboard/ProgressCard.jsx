function ProgressCard({ skills }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-6">
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
