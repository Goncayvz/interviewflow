import cors from "cors";
import express from "express";
import "dotenv/config";
import { pool, toIsoString, toMysqlDate } from "./db.js";

const app = express();
const port = Number(process.env.API_PORT || 4000);

app.use(cors());
app.use(express.json({ limit: "3mb" }));

const asyncHandler = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

const mapQuestionRecord = (row) => ({
  questionId: row.question_id,
  source: row.source,
  solvedAt: toIsoString(row.solved_at),
});

const mapTaskRecord = (row) => ({
  taskId: row.task_id,
  completedAt: toIsoString(row.completed_at),
  evidenceUpdatedAt: toIsoString(row.evidence_updated_at),
});

const mapTaskEvidence = (row) => ({
  taskId: row.task_id,
  notes: row.notes || "",
  demoUrl: row.demo_url || "",
  repoUrl: row.repo_url || "",
  imageData: row.image_data || "",
  imageName: row.image_name || "",
  updatedAt: toIsoString(row.updated_at),
});

app.get("/api/health", asyncHandler(async (_req, res) => {
  await pool.query("SELECT 1");
  res.json({ ok: true });
}));

app.get("/api/records", asyncHandler(async (_req, res) => {
  const [questionRows] = await pool.query(
    "SELECT question_id, source, solved_at FROM question_records ORDER BY solved_at DESC"
  );
  const [taskRows] = await pool.query(
    "SELECT task_id, completed_at, evidence_updated_at FROM task_records ORDER BY COALESCE(evidence_updated_at, completed_at, created_at) DESC"
  );
  const [evidenceRows] = await pool.query(
    "SELECT task_id, notes, demo_url, repo_url, image_data, image_name, updated_at FROM task_evidence ORDER BY updated_at DESC"
  );

  res.json({
    questionRecords: questionRows.map(mapQuestionRecord),
    taskRecords: taskRows.map(mapTaskRecord),
    taskEvidence: evidenceRows.map(mapTaskEvidence),
  });
}));

app.put("/api/questions/:id/solved", asyncHandler(async (req, res) => {
  const questionId = Number(req.params.id);
  const solvedAt = toMysqlDate(req.body.solvedAt);
  const source = req.body.source || "question-bank";

  await pool.execute(
    `INSERT INTO question_records (question_id, source, solved_at)
     VALUES (:questionId, :source, :solvedAt)
     ON DUPLICATE KEY UPDATE source = VALUES(source), solved_at = VALUES(solved_at)`,
    { questionId, source, solvedAt }
  );

  res.json({ questionId, source, solvedAt: solvedAt.toISOString() });
}));

app.delete("/api/questions/:id/solved", asyncHandler(async (req, res) => {
  await pool.execute("DELETE FROM question_records WHERE question_id = ?", [
    Number(req.params.id),
  ]);

  res.status(204).end();
}));

app.put("/api/tasks/:id/completed", asyncHandler(async (req, res) => {
  const taskId = Number(req.params.id);
  const completedAt = toMysqlDate(req.body.completedAt);

  await pool.execute(
    `INSERT INTO task_records (task_id, completed_at)
     VALUES (:taskId, :completedAt)
     ON DUPLICATE KEY UPDATE completed_at = VALUES(completed_at)`,
    { taskId, completedAt }
  );

  res.json({ taskId, completedAt: completedAt.toISOString() });
}));

app.delete("/api/tasks/:id/completed", asyncHandler(async (req, res) => {
  const taskId = Number(req.params.id);

  await pool.execute(
    `UPDATE task_records
     SET completed_at = NULL
     WHERE task_id = ?`,
    [taskId]
  );
  await pool.execute(
    `DELETE FROM task_records
     WHERE task_id = ? AND completed_at IS NULL AND evidence_updated_at IS NULL`,
    [taskId]
  );

  res.status(204).end();
}));

app.put("/api/tasks/:id/evidence", asyncHandler(async (req, res) => {
  const taskId = Number(req.params.id);
  const updatedAt = toMysqlDate(req.body.updatedAt);

  await pool.execute(
    `INSERT INTO task_records (task_id, evidence_updated_at)
     VALUES (:taskId, :updatedAt)
     ON DUPLICATE KEY UPDATE evidence_updated_at = VALUES(evidence_updated_at)`,
    { taskId, updatedAt }
  );
  await pool.execute(
    `INSERT INTO task_evidence
      (task_id, notes, demo_url, repo_url, image_data, image_name, updated_at)
     VALUES
      (:taskId, :notes, :demoUrl, :repoUrl, :imageData, :imageName, :updatedAt)
     ON DUPLICATE KEY UPDATE
      notes = VALUES(notes),
      demo_url = VALUES(demo_url),
      repo_url = VALUES(repo_url),
      image_data = VALUES(image_data),
      image_name = VALUES(image_name),
      updated_at = VALUES(updated_at)`,
    {
      taskId,
      notes: req.body.notes || "",
      demoUrl: req.body.demoUrl || "",
      repoUrl: req.body.repoUrl || "",
      imageData: req.body.imageData || "",
      imageName: req.body.imageName || "",
      updatedAt,
    }
  );

  res.json({ taskId, updatedAt: updatedAt.toISOString() });
}));

app.delete("/api/tasks/:id/evidence", asyncHandler(async (req, res) => {
  const taskId = Number(req.params.id);

  await pool.execute("DELETE FROM task_evidence WHERE task_id = ?", [taskId]);
  await pool.execute(
    `UPDATE task_records
     SET evidence_updated_at = NULL
     WHERE task_id = ?`,
    [taskId]
  );
  await pool.execute(
    `DELETE FROM task_records
     WHERE task_id = ? AND completed_at IS NULL AND evidence_updated_at IS NULL`,
    [taskId]
  );

  res.status(204).end();
}));

app.use((error, _req, res, _next) => {
  void _next;

  res.status(500).json({
    message: "Database operation failed",
    detail: error.message,
  });
});

app.listen(port, () => {
  console.log(`InterviewFlow API running on http://localhost:${port}`);
});
