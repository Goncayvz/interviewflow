const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const request = async (path, options = {}) => {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
};

const sync = (promise) => {
  promise.catch(() => undefined);
};

export const fetchRecords = () => request("/records");

export const syncQuestionSolved = (questionId, record) => {
  sync(
    request(`/questions/${questionId}/solved`, {
      method: "PUT",
      body: JSON.stringify(record),
    })
  );
};

export const syncQuestionUnsolved = (questionId) => {
  sync(
    request(`/questions/${questionId}/solved`, {
      method: "DELETE",
    })
  );
};

export const syncTaskCompleted = (taskId, record) => {
  sync(
    request(`/tasks/${taskId}/completed`, {
      method: "PUT",
      body: JSON.stringify(record),
    })
  );
};

export const syncTaskUncompleted = (taskId) => {
  sync(
    request(`/tasks/${taskId}/completed`, {
      method: "DELETE",
    })
  );
};

export const syncTaskEvidence = (taskId, evidence) => {
  sync(
    request(`/tasks/${taskId}/evidence`, {
      method: "PUT",
      body: JSON.stringify(evidence),
    })
  );
};

export const syncTaskEvidenceDelete = (taskId) => {
  sync(
    request(`/tasks/${taskId}/evidence`, {
      method: "DELETE",
    })
  );
};
