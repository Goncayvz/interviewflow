import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { interviewTasks } from "../data/interviewTasks";
import { getLocalizedText, getSearchableText } from "../utils/getLocalizedText";
import SearchBar from "../components/questions/SearchBar";
import {
  fetchRecords,
  syncTaskCompleted,
  syncTaskEvidence,
  syncTaskEvidenceDelete,
  syncTaskUncompleted,
} from "../services/api";

const categories = ["All", "React", "JavaScript", "HTML/CSS", "Algorithms"];
const difficulties = ["All", "Easy", "Medium", "Hard"];
const maxEvidenceFileSize = 1.5 * 1024 * 1024;
const emptyEvidence = {
  notes: "",
  demoUrl: "",
  repoUrl: "",
  imageData: "",
  imageName: "",
};

const readCompletedTasks = () => {
  try {
    const storedTasks = JSON.parse(
      localStorage.getItem("interviewflow_completed_tasks")
    );

    return Array.isArray(storedTasks) ? storedTasks : [];
  } catch {
    return [];
  }
};

const readTaskEvidence = () => {
  try {
    const storedEvidence = JSON.parse(
      localStorage.getItem("interviewflow_task_evidence")
    );

    return storedEvidence && typeof storedEvidence === "object"
      ? storedEvidence
      : {};
  } catch {
    return {};
  }
};

const readTaskRecords = () => {
  try {
    const storedRecords = JSON.parse(
      localStorage.getItem("interviewflow_task_records")
    );

    return storedRecords && typeof storedRecords === "object"
      ? storedRecords
      : {};
  } catch {
    return {};
  }
};

function Tasks() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [language, setLanguage] = useState("en");
  const [completedTasks, setCompletedTasks] = useState(readCompletedTasks);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskEvidence, setTaskEvidence] = useState(readTaskEvidence);
  const [taskRecords, setTaskRecords] = useState(readTaskRecords);
  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "interviewflow_completed_tasks",
      JSON.stringify(completedTasks)
    );
  }, [completedTasks]);

  useEffect(() => {
    localStorage.setItem(
      "interviewflow_task_evidence",
      JSON.stringify(taskEvidence)
    );
  }, [taskEvidence]);

  useEffect(() => {
    localStorage.setItem(
      "interviewflow_task_records",
      JSON.stringify(taskRecords)
    );
  }, [taskRecords]);

  useEffect(() => {
    fetchRecords()
      .then((records) => {
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
        const nextCompletedTasks = Object.entries(nextTaskRecords)
          .filter(([, record]) => Boolean(record.completedAt))
          .map(([taskId]) => Number(taskId));

        setCompletedTasks(nextCompletedTasks);
        setTaskRecords(nextTaskRecords);
        setTaskEvidence(nextTaskEvidence);
      })
      .catch(() => undefined);
  }, []);

  const filteredTasks = useMemo(() => {
    return interviewTasks.filter((task) => {
      const normalizedSearchTerm = searchTerm.toLowerCase();
      const searchableQuestion = getSearchableText(task.question).toLowerCase();
      const searchableAnswer = getSearchableText(task.answer).toLowerCase();
      const matchesSearch =
        searchableQuestion.includes(normalizedSearchTerm) ||
        searchableAnswer.includes(normalizedSearchTerm);
      const matchesCategory =
        selectedCategory === "All" || task.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === "All" || task.difficulty === selectedDifficulty;

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const completedCount = completedTasks.length;
  const submittedCount = Object.values(taskEvidence).filter((evidence) => {
    return Boolean(
      evidence?.notes || evidence?.demoUrl || evidence?.repoUrl || evidence?.imageData
    );
  }).length;
  const completionRate =
    interviewTasks.length > 0
      ? Math.round((completedCount / interviewTasks.length) * 100)
      : 0;

  const toggleCompleted = (id) => {
    setCompletedTasks((prev) => {
      const isCompleted = prev.includes(id);

      setTaskRecords((records) => {
        const nextRecords = { ...records };

        if (isCompleted) {
          syncTaskUncompleted(id);

          if (nextRecords[id]) {
            const restRecord = { ...nextRecords[id] };

            delete restRecord.completedAt;

            const hasOtherRecordData = Object.keys(restRecord).length > 0;

            if (hasOtherRecordData) {
              nextRecords[id] = restRecord;
            } else {
              delete nextRecords[id];
            }
          }
        } else {
          const completedAt = new Date().toISOString();

          nextRecords[id] = {
            ...nextRecords[id],
            completedAt,
          };
          syncTaskCompleted(id, { completedAt });
        }

        return nextRecords;
      });

      return isCompleted ? prev.filter((taskId) => taskId !== id) : [...prev, id];
    });
  };

  const updateEvidence = (taskId, patch) => {
    const updatedAt = new Date().toISOString();
    const evidence = {
      ...emptyEvidence,
      ...taskEvidence[taskId],
      ...patch,
      updatedAt,
    };

    setTaskEvidence((prev) => ({
      ...prev,
      [taskId]: evidence,
    }));
    setTaskRecords((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        evidenceUpdatedAt: updatedAt,
      },
    }));
    syncTaskEvidence(taskId, evidence);
  };

  const clearEvidence = (taskId) => {
    setTaskEvidence((prev) => {
      const next = { ...prev };
      delete next[taskId];
      return next;
    });
    setTaskRecords((prev) => {
      const next = { ...prev };

      if (next[taskId]?.completedAt) {
        delete next[taskId].evidenceUpdatedAt;
      } else {
        delete next[taskId];
      }

      return next;
    });
    setUploadError("");
    syncTaskEvidenceDelete(taskId);
  };

  const handleEvidenceImageUpload = (taskId, file) => {
    setUploadError("");

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setUploadError("Please upload an image file.");
      return;
    }

    if (file.size > maxEvidenceFileSize) {
      setUploadError("Image must be smaller than 1.5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateEvidence(taskId, {
        imageData: reader.result,
        imageName: file.name,
      });
    };

    reader.onerror = () => {
      setUploadError("Image could not be uploaded.");
    };

    reader.readAsDataURL(file);
  };

  const closeTaskDetails = () => {
    setSelectedTask(null);
    setUploadError("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
        <div className="min-w-0">
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl">Tasks</h1>
          <p className="text-slate-400">
            React, JavaScript, HTML/CSS and algorithm interview tasks.
          </p>
        </div>

        <button
          onClick={() => setLanguage((prev) => (prev === "en" ? "tr" : "en"))}
          className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm transition hover:border-cyan-500"
        >
          {language === "en" ? "TR" : "EN"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:p-6">
          <p className="text-slate-400 text-sm mb-2">Total Tasks</p>
          <h2 className="text-3xl font-bold sm:text-4xl">{interviewTasks.length}</h2>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:p-6">
          <p className="text-slate-400 text-sm mb-2">Completed Tasks</p>
          <h2 className="text-3xl font-bold sm:text-4xl">{completedCount}</h2>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:p-6">
          <p className="text-slate-400 text-sm mb-2">Completion Rate</p>
          <h2 className="text-3xl font-bold text-cyan-400 sm:text-4xl">
            {completionRate}%
          </h2>
        </div>

        <div className="rounded-2xl border border-slate-700 bg-slate-800 p-4 sm:p-6">
          <p className="text-slate-400 text-sm mb-2">Evidence Uploaded</p>
          <h2 className="text-3xl font-bold sm:text-4xl">{submittedCount}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
          >
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(event) => setSelectedDifficulty(event.target.value)}
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-500"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty}>{difficulty}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-slate-400">
        <span>Showing {filteredTasks.length} tasks</span>
        <Link to="/mock-interview" className="text-cyan-300 hover:text-cyan-200">
          Open mock interview
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {filteredTasks.map((task) => {
          const isCompleted = completedTasks.includes(task.id);
          const evidence = taskEvidence[task.id];
          const hasEvidence = Boolean(
            evidence?.notes ||
              evidence?.demoUrl ||
              evidence?.repoUrl ||
              evidence?.imageData
          );

          return (
            <div
              key={task.id}
              onClick={() => setSelectedTask(task)}
              className="cursor-pointer rounded-2xl border border-slate-700 bg-slate-800 p-4 transition hover:border-cyan-500 sm:p-6"
            >
              <div className="mb-4 flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300">
                      {task.category}
                    </span>
                    <span className="px-3 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
                      {task.difficulty}
                    </span>
                    {hasEvidence && (
                      <span className="px-3 py-1 text-xs rounded-full bg-green-500 text-white">
                        Evidence
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-semibold sm:text-lg">
                    {getLocalizedText(task.question, language)}
                  </h3>
                </div>

                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleCompleted(task.id);
                  }}
                  className={`w-full shrink-0 rounded-xl px-4 py-2 text-xs transition sm:w-auto ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  {isCompleted ? "Completed" : "Mark Complete"}
                </button>
              </div>

              <p className="text-slate-400 text-sm leading-relaxed">
                {getLocalizedText(task.answer, language)}
              </p>

              <p className="mt-4 text-xs font-medium text-cyan-300">
                Click to view task details
              </p>
            </div>
          );
        })}
      </div>

      {selectedTask && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
          onClick={closeTaskDetails}
        >
          <div
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-2xl sm:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
              <div className="min-w-0">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300">
                    {selectedTask.category}
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-slate-700 text-slate-300">
                    {selectedTask.difficulty}
                  </span>
                </div>

                <h2 className="text-xl font-bold leading-tight sm:text-2xl">
                  {getLocalizedText(selectedTask.question, language)}
                </h2>
              </div>

              <button
                onClick={closeTaskDetails}
                className="shrink-0 rounded-xl bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-xl bg-slate-800 p-5">
                <p className="mb-2 text-sm font-semibold text-slate-300">
                  Task Detail
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  {getLocalizedText(selectedTask.question, language)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-800 p-5">
                <p className="mb-2 text-sm font-semibold text-slate-300">
                  Expected Approach
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  {getLocalizedText(selectedTask.answer, language)}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-slate-700 bg-slate-950 p-5">
              <p className="mb-3 text-sm font-semibold text-slate-300">
                Interview Checklist
              </p>
              <div className="grid grid-cols-1 gap-3 text-sm text-slate-400 md:grid-cols-3">
                <span>Explain your approach clearly.</span>
                <span>Handle edge cases.</span>
                <span>Keep the solution readable.</span>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-slate-700 bg-slate-950 p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-300">
                    Work Evidence
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    Upload a screenshot, notes, demo link, or repository link for this task.
                  </p>
                </div>

                <button
                  onClick={() => clearEvidence(selectedTask.id)}
                  className="rounded-xl bg-slate-800 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-700"
                >
                  Clear
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-slate-400">
                    Screenshot
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      handleEvidenceImageUpload(
                        selectedTask.id,
                        event.target.files?.[0]
                      )
                    }
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-slate-300"
                  />

                  {uploadError && (
                    <p className="mt-2 text-sm text-red-300">{uploadError}</p>
                  )}

                  {taskEvidence[selectedTask.id]?.imageData && (
                    <div className="mt-4 overflow-hidden rounded-xl border border-slate-700 bg-slate-800">
                      <img
                        src={taskEvidence[selectedTask.id].imageData}
                        alt={taskEvidence[selectedTask.id].imageName || "Task evidence"}
                        className="max-h-72 w-full object-contain"
                      />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm text-slate-400">
                      Demo URL
                    </label>
                    <input
                      type="url"
                      value={taskEvidence[selectedTask.id]?.demoUrl || ""}
                      onChange={(event) =>
                        updateEvidence(selectedTask.id, {
                          demoUrl: event.target.value,
                        })
                      }
                      placeholder="https://..."
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-400">
                      Repository URL
                    </label>
                    <input
                      type="url"
                      value={taskEvidence[selectedTask.id]?.repoUrl || ""}
                      onChange={(event) =>
                        updateEvidence(selectedTask.id, {
                          repoUrl: event.target.value,
                        })
                      }
                      placeholder="https://github.com/..."
                      className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-slate-400">
                      Notes
                    </label>
                    <textarea
                      value={taskEvidence[selectedTask.id]?.notes || ""}
                      onChange={(event) =>
                        updateEvidence(selectedTask.id, {
                          notes: event.target.value,
                        })
                      }
                      placeholder="What did you build, what changed, what did you learn?"
                      className="min-h-28 w-full resize-none rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                onClick={() => {
                  toggleCompleted(selectedTask.id);
                }}
                className={`rounded-xl px-5 py-3 text-sm transition ${
                  completedTasks.includes(selectedTask.id)
                    ? "bg-green-500 text-white"
                    : "bg-cyan-500 text-white hover:bg-cyan-600"
                }`}
              >
                {completedTasks.includes(selectedTask.id)
                  ? "Completed"
                  : "Mark Complete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;
