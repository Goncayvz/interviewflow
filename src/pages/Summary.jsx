import { useEffect, useState } from "react";
import { questions } from "../data/questions";
import { interviewTasks } from "../data/interviewTasks";
import { getLocalizedText } from "../utils/getLocalizedText";
import { fetchRecords } from "../services/api";

const summaryViews = {
  all: "all",
  questions: "questions",
  tasks: "tasks",
};

const readStoredArray = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));

    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const readStoredObject = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));

    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
};

const formatRecordDate = (value) => {
  if (!value) {
    return "No date";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

function Summary() {
  const [activeView, setActiveView] = useState(summaryViews.all);
  const [solvedQuestionIds, setSolvedQuestionIds] = useState(() =>
    readStoredArray("interviewflow_solved")
  );
  const [completedTaskIds, setCompletedTaskIds] = useState(() =>
    readStoredArray("interviewflow_completed_tasks")
  );
  const [taskEvidence, setTaskEvidence] = useState(() =>
    readStoredObject("interviewflow_task_evidence")
  );
  const [questionRecords, setQuestionRecords] = useState(() =>
    readStoredObject("interviewflow_question_records")
  );
  const [taskRecordData, setTaskRecordData] = useState(() =>
    readStoredObject("interviewflow_task_records")
  );

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
        const nextTaskRecords = Object.fromEntries(
          records.taskRecords.map((record) => [
            record.taskId,
            {
              completedAt: record.completedAt,
              evidenceUpdatedAt: record.evidenceUpdatedAt,
            },
          ])
        );
        const nextTaskEvidence = Object.fromEntries(
          records.taskEvidence.map((evidence) => [
            evidence.taskId,
            {
              notes: evidence.notes,
              demoUrl: evidence.demoUrl,
              repoUrl: evidence.repoUrl,
              imageData: evidence.imageData,
              imageName: evidence.imageName,
              updatedAt: evidence.updatedAt,
            },
          ])
        );
        const nextSolvedQuestionIds = Object.keys(nextQuestionRecords).map(Number);
        const nextCompletedTaskIds = Object.entries(nextTaskRecords)
          .filter(([, record]) => Boolean(record.completedAt))
          .map(([taskId]) => Number(taskId));

        localStorage.setItem(
          "interviewflow_solved",
          JSON.stringify(nextSolvedQuestionIds)
        );
        localStorage.setItem(
          "interviewflow_question_records",
          JSON.stringify(nextQuestionRecords)
        );
        localStorage.setItem(
          "interviewflow_completed_tasks",
          JSON.stringify(nextCompletedTaskIds)
        );
        localStorage.setItem(
          "interviewflow_task_records",
          JSON.stringify(nextTaskRecords)
        );
        localStorage.setItem(
          "interviewflow_task_evidence",
          JSON.stringify(nextTaskEvidence)
        );

        setSolvedQuestionIds(nextSolvedQuestionIds);
        setQuestionRecords(nextQuestionRecords);
        setCompletedTaskIds(nextCompletedTaskIds);
        setTaskRecordData(nextTaskRecords);
        setTaskEvidence(nextTaskEvidence);
      })
      .catch(() => undefined);
  }, []);

  const solvedQuestions = questions.filter((question) =>
    solvedQuestionIds.includes(question.id)
  );
  const completedTasks = interviewTasks.filter((task) =>
    completedTaskIds.includes(task.id)
  );
  const evidenceTasks = interviewTasks.filter((task) => {
    const evidence = taskEvidence[task.id];

    return Boolean(
      evidence?.notes || evidence?.demoUrl || evidence?.repoUrl || evidence?.imageData
    );
  });
  const taskRecordIds = new Set([
    ...completedTasks.map((task) => task.id),
    ...evidenceTasks.map((task) => task.id),
  ]);
  const taskRecords = interviewTasks.filter((task) => taskRecordIds.has(task.id));
  const shouldShowQuestions =
    activeView === summaryViews.all || activeView === summaryViews.questions;
  const shouldShowTasks =
    activeView === summaryViews.all || activeView === summaryViews.tasks;
  const exportRecords = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      solvedQuestionIds,
      completedTaskIds,
      questionRecords,
      taskRecords: taskRecordData,
      taskEvidence,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = "interviewflow-summary.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Summary</h1>
          <p className="text-slate-400">
            Review Question Bank records and Task records in separate sections.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveView(summaryViews.all)}
            className={`rounded-xl px-4 py-2 text-sm transition ${
              activeView === summaryViews.all
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveView(summaryViews.questions)}
            className={`rounded-xl px-4 py-2 text-sm transition ${
              activeView === summaryViews.questions
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Question Bank
          </button>
          <button
            onClick={() => setActiveView(summaryViews.tasks)}
            className={`rounded-xl px-4 py-2 text-sm transition ${
              activeView === summaryViews.tasks
                ? "bg-cyan-500 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            Tasks
          </button>
          <button
            onClick={exportRecords}
            className="rounded-xl bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
          >
            Export JSON
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Question Bank Records</p>
          <h2 className="text-4xl font-bold">{solvedQuestions.length}</h2>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Total Questions</p>
          <h2 className="text-4xl font-bold">{questions.length}</h2>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Task Records</p>
          <h2 className="text-4xl font-bold">{taskRecords.length}</h2>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <p className="text-slate-400 text-sm mb-2">Task Evidence</p>
          <h2 className="text-4xl font-bold text-cyan-400">
            {evidenceTasks.length}
          </h2>
        </div>
      </div>

      {shouldShowQuestions && (
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Question Bank Summary</h2>
          <span className="text-sm text-slate-400">
            {solvedQuestions.length}/{questions.length} solved
          </span>
        </div>

        {solvedQuestions.length === 0 ? (
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 text-slate-400">
            No solved questions yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {solvedQuestions.map((question) => {
              const record = questionRecords[question.id];

              return (
              <div
                key={question.id}
                className="rounded-2xl border border-slate-700 bg-slate-800 p-5"
              >
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
                    {question.category}
                  </span>
                  <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                    {question.difficulty}
                  </span>
                  <span className="rounded-full bg-green-500 px-3 py-1 text-xs text-white">
                    Solved
                  </span>
                  {record?.source && (
                    <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                      {record.source === "mock-interview"
                        ? "Mock Interview"
                        : "Question Bank"}
                    </span>
                  )}
                </div>
                <h3 className="font-semibold">
                  {getLocalizedText(question.question)}
                </h3>
                <p className="mt-2 text-xs text-slate-400">
                  Solved at: {formatRecordDate(record?.solvedAt)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {getLocalizedText(question.answer)}
                </p>
              </div>
              );
            })}
          </div>
        )}
      </section>
      )}

      {shouldShowTasks && (
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Task Summary</h2>
          <span className="text-sm text-slate-400">
            {taskRecords.length}/{interviewTasks.length} records
          </span>
        </div>

        {taskRecords.length === 0 ? (
          <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 text-slate-400">
            No task records yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {taskRecords.map((task) => {
              const evidence = taskEvidence[task.id];
              const isCompleted = completedTaskIds.includes(task.id);
              const record = taskRecordData[task.id];

              return (
                <div
                  key={task.id}
                  className="rounded-2xl border border-slate-700 bg-slate-800 p-5"
                >
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
                      {task.category}
                    </span>
                    <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                      {task.difficulty}
                    </span>
                    {isCompleted && (
                      <span className="rounded-full bg-green-500 px-3 py-1 text-xs text-white">
                        Completed
                      </span>
                    )}
                    {evidence && (
                      <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-300">
                        Evidence added
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold">{getLocalizedText(task.question)}</h3>
                  <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-400">
                    {isCompleted && (
                      <span>
                        Completed at: {formatRecordDate(record?.completedAt)}
                      </span>
                    )}
                    {evidence && (
                      <span>
                        Evidence updated:{" "}
                        {formatRecordDate(
                          evidence.updatedAt || record?.evidenceUpdatedAt
                        )}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {getLocalizedText(task.answer)}
                  </p>

                  {evidence && (
                    <div className="mt-5 grid grid-cols-1 gap-5 rounded-xl border border-slate-700 bg-slate-900 p-4 lg:grid-cols-[180px_1fr]">
                      {evidence.imageData ? (
                        <img
                          src={evidence.imageData}
                          alt={evidence.imageName || "Task evidence"}
                          className="h-36 w-full rounded-xl border border-slate-700 object-cover"
                        />
                      ) : (
                        <div className="flex h-36 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-sm text-slate-400">
                          No image
                        </div>
                      )}

                      <div>
                        <p className="mb-2 text-sm font-semibold text-slate-300">
                          Task Evidence
                        </p>
                        {evidence.notes && (
                          <p className="mt-3 text-sm leading-relaxed text-slate-400">
                            {evidence.notes}
                          </p>
                        )}

                        <div className="mt-4 flex flex-wrap gap-3 text-sm">
                          {evidence.demoUrl && (
                            <a
                              href={evidence.demoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-cyan-300 hover:text-cyan-200"
                            >
                              Demo URL
                            </a>
                          )}
                          {evidence.repoUrl && (
                            <a
                              href={evidence.repoUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-cyan-300 hover:text-cyan-200"
                            >
                              Repository URL
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>
      )}
    </div>
  );
}

export default Summary;
