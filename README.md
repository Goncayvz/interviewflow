# InterviewFlow

InterviewFlow is a React interview preparation app with question tracking,
hands-on tasks, task evidence uploads, progress analytics, and summary records.

## Frontend

```bash
npm install
npm run dev
```

Frontend runs at `http://127.0.0.1:5173/` by default.

## MySQL Backend

The backend uses Express and MySQL. MySQL Workbench can be used to create and
inspect the database.

1. Start MySQL Server.
2. Open MySQL Workbench.
3. Run `server/schema.sql`.
4. Copy `.env.example` to `.env`.
5. Update your MySQL username and password in `.env`.
6. Start the API:

```bash
npm run dev:api
```

API runs at `http://localhost:4000/api`.

## Database Tables

- `question_records`: solved question records and source.
- `task_records`: task completion and evidence timestamps.
- `task_evidence`: notes, demo link, repository link, and screenshot data.

The frontend still keeps a localStorage fallback. If the API or MySQL is not
running, the app continues to work locally; when the API is running, new records
are also written to MySQL.
