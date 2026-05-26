# InterviewFlow

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
  <img src="https://img.shields.io/badge/Recharts-FF6384?style=for-the-badge" alt="Recharts" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
</p>

<p align="center">
  Full-stack technical interview preparation platform
</p>

<p align="center">
  <a href="#english">English</a> | <a href="#türkçe">Türkçe</a>
</p>

---

## GB | English

InterviewFlow is a full-stack technical interview preparation platform built
with React, Vite, Express, and MySQL. It helps developer candidates practice
technical questions, complete frontend-focused tasks, save proof of work, and
review preparation progress from a centralized dashboard.

The project is designed as a single-user MVP with MySQL persistence and a
localStorage fallback, so the frontend remains usable even when the backend is
offline.

### Overview

InterviewFlow was developed as a portfolio project to demonstrate frontend
architecture, full-stack data flow, dashboard design, state management, and
database-backed persistence.

Core modules:

- Question Bank
- Mock Interview Mode
- Quiz Mode
- Task-Based Challenges
- Progress Analytics
- Theme Picker
- Evidence Upload System
- Summary Dashboard

### Features

- Question Bank with category and difficulty filters
- Mock Interview mode with timer, random questions, notes, and answer reveal
- Quiz system with score and history tracking
- Task section for React, JavaScript, HTML/CSS, and algorithm challenges
- Task detail modal with expected approach and interview checklist
- Work evidence fields for screenshot, notes, demo URL, and repository URL
- Progress analytics for solved questions and quiz performance
- Soft and dark theme support with customizable UI experience
- Summary dashboard for solved questions, completed tasks, and uploaded evidence
- MySQL-backed records with localStorage fallback
- JSON export for user progress records
- Responsive dashboard-style UI

### Screenshots

Add application screenshots under `docs/screenshots/` and update the image paths below.

| Dashboard |
<img width="1326" height="664" alt="image" src="https://github.com/user-attachments/assets/1458221c-72ac-4d70-a86c-b26edb7974d4" />

 | Question Bank|
 <img width="1318" height="669" alt="image" src="https://github.com/user-attachments/assets/4a39a6ad-aeed-475e-b74e-5331e296f778" />

| Tasks |
<img width="1321" height="655" alt="image" src="https://github.com/user-attachments/assets/c928ed61-59ec-4623-b983-5d6932e09866" />

|Quiz Mode|
<img width="1321" height="650" alt="image" src="https://github.com/user-attachments/assets/471f9d42-1ac9-42f0-a0eb-33d467ac0f9e" />

|Mock Interview|
<img width="1313" height="666" alt="image" src="https://github.com/user-attachments/assets/1104ef9f-838e-4702-af06-2098970e86f8" />

|Progress|
<img width="1328" height="664" alt="image" src="https://github.com/user-attachments/assets/c1adb09b-b228-4a71-994d-ca65749c9fda" />

![Summary]
<img width="1332" height="659" alt="image" src="https://github.com/user-attachments/assets/d73e8d2c-2256-473e-9a76-ecf434bff3cc" />


|Theme picker|
<img width="299" height="460" alt="image" src="https://github.com/user-attachments/assets/a8008c03-af2c-4f78-bac5-02092ac936d9" />


### Tech Stack

Frontend:

- React
- Vite
- React Router
- Tailwind CSS
- Recharts
- localStorage

Backend:

- Node.js
- Express.js
- MySQL

Tools:

- MySQL Workbench
- Git / GitHub

### Project Structure

```text
interviewflow/
|-- server/
|   |-- db.js
|   |-- index.js
|   `-- schema.sql
|-- src/
|   |-- components/
|   |-- data/
|   |   |-- algorithmQuestions.js
|   |   |-- htmlCssQuestions.js
|   |   |-- interviewTasks.js
|   |   |-- javascriptQuestions.js
|   |   |-- questions.js
|   |   `-- reactQuestions.js
|   |-- pages/
|   |-- routes/
|   |-- services/
|   `-- utils/
|-- .env.example
|-- package.json
`-- README.md
```

### Getting Started

Prerequisites:

- Node.js
- npm
- MySQL Server
- MySQL Workbench

Clone the repository:

```bash
git clone https://github.com/Goncayvz/interviewflow.git
cd interviewflow
```

Install dependencies:

```bash
npm install
```

### Database Setup

The project uses this database name:

```text
interflow
```

Open MySQL Workbench and run:

```text
server/schema.sql
```

The schema creates:

- `question_records`
- `task_records`
- `task_evidence`

Verify the tables:

```sql
USE interflow;

SHOW TABLES;
```

### Environment Variables

Create a `.env` file in the project root:

```bash
copy .env.example .env
```

Update your MySQL credentials:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=interflow
API_PORT=4000
VITE_API_URL=http://localhost:4000/api
```

Do not commit the real `.env` file.

### Running the Project

Start the backend API:

```bash
npm run dev:api
```

API URL:

```text
http://localhost:4000/api
```

Health check:

```text
http://localhost:4000/api/health
```

Expected response:

```json
{ "ok": true }
```

Start the frontend in another terminal:

```bash
npm run dev
```

Frontend URL:

```text
http://127.0.0.1:5173/
```

### Available Scripts

| Script | Description |
| :-- | :-- |
| `npm run dev` | Starts the Vite frontend development server |
| `npm run dev:api` | Starts the Express API server |
| `npm run build` | Builds the frontend for production |
| `npm run lint` | Runs ESLint |
| `npm run preview` | Previews the production build locally |

### API Overview

Base URL:

```text
http://localhost:4000/api
```

| Method | Endpoint | Description |
| :-- | :-- | :-- |
| GET | `/health` | API health check |
| GET | `/records` | Fetch saved records |
| PUT | `/questions/:id/solved` | Mark question as solved |
| DELETE | `/questions/:id/solved` | Remove solved state |
| PUT | `/tasks/:id/completed` | Mark task as completed |
| DELETE | `/tasks/:id/completed` | Remove completed state |
| PUT | `/tasks/:id/evidence` | Save task evidence |
| DELETE | `/tasks/:id/evidence` | Delete task evidence |

### Useful Database Queries

```sql
USE interflow;

SELECT * FROM question_records;
SELECT * FROM task_records;
SELECT * FROM task_evidence;
```

### Data Flow

InterviewFlow uses a local-first architecture:

1. User marks a question as solved or completes a task.
2. Frontend updates localStorage immediately.
3. Frontend sends the record to the Express API.
4. API writes the record to MySQL.
5. Summary and related pages can read records back from the API.


### Status

InterviewFlow is ready as a full-stack MVP:

- Frontend works with or without the backend
- Backend connects to MySQL
- MySQL records persist successfully
- Question and task records are stored
- Summary page shows saved activity
- localStorage fallback works correctly

---

## TR | Türkçe

InterviewFlow; React, Vite, Express ve MySQL ile geliştirilmiş full-stack bir
teknik mülakat hazırlık platformudur. Geliştirici adaylarının teknik sorular
çözmesini, frontend odaklı görevler tamamlamasını, yaptığı işlere dair kanıt
yüklemesini ve hazırlık ilerlemesini merkezi bir panelden takip etmesini sağlar.

Proje tek kullanıcılı bir MVP olarak tasarlanmıştır. MySQL kalıcı kayıt desteği
vardır; backend kapalı olsa bile localStorage fallback sayesinde arayüz
çalışmaya devam eder.

### Genel Bakış

InterviewFlow; frontend mimarisi, full-stack veri akışı, dashboard tasarımı,
state yönetimi ve veritabanı destekli kayıt yapısını göstermek için geliştirilmiş
bir portfolyo projesidir.

Ana modüller:

- Question Bank
- Mock Interview Mode
- Quiz Mode
- Task-Based Challenges
- Progress Analytics
- Tema Seçici
- Evidence Upload System
- Summary Dashboard

### Özellikler

- Kategori ve zorluk filtreli soru bankası
- Zamanlayıcı, rastgele soru, not alma ve cevap gösterme özellikli mock interview modu
- Skor ve geçmiş takibi olan quiz sistemi
- React, JavaScript, HTML/CSS ve algoritma görevleri
- Beklenen yaklaşım ve mülakat checklist içeren task detay modalı
- Ekran görüntüsü, not, demo URL ve repo URL alanları
- Çözülen sorular ve quiz performansı için ilerleme analitiği
- Yumuşak ve koyu tema desteğiyle kişiselleştirilebilir arayüz deneyimi
- Çözülen sorular, tamamlanan task'ler ve yüklenen kanıtlar için Summary ekranı
- MySQL destekli kayıt sistemi
- Backend kapalıyken localStorage fallback
- Kullanıcı kayıtlarını JSON olarak dışa aktarma
- Responsive dashboard tarzı arayüz

### Ekran Görüntüleri

Uygulama ekran görüntülerini `docs/screenshots/` klasörüne ekleyip aşağıdaki görsel yollarını güncelleyebilirsin.

| Dashboard | Question Bank |
| :-- | :-- |
| ![Dashboard](docs/screenshots/dashboard.png) | ![Question Bank](docs/screenshots/question-bank.png) |

| Tasks | Summary |
| :-- | :-- |
| ![Tasks](docs/screenshots/tasks.png) | ![Summary](docs/screenshots/summary.png) |

### Kullanılan Teknolojiler

Frontend:

- React
- Vite
- React Router
- Tailwind CSS
- Recharts
- localStorage

Backend:

- Node.js
- Express.js
- MySQL

Araçlar:

- MySQL Workbench
- Git / GitHub

### Proje Yapısı

```text
interviewflow/
|-- server/
|   |-- db.js
|   |-- index.js
|   `-- schema.sql
|-- src/
|   |-- components/
|   |-- data/
|   |   |-- algorithmQuestions.js
|   |   |-- htmlCssQuestions.js
|   |   |-- interviewTasks.js
|   |   |-- javascriptQuestions.js
|   |   |-- questions.js
|   |   `-- reactQuestions.js
|   |-- pages/
|   |-- routes/
|   |-- services/
|   `-- utils/
|-- .env.example
|-- package.json
`-- README.md
```

### Kurulum

Gereksinimler:

- Node.js
- npm
- MySQL Server
- MySQL Workbench

Projeyi klonla:

```bash
git clone https://github.com/Goncayvz/interviewflow.git
cd interviewflow
```

Bağımlılıkları yükle:

```bash
npm install
```

### Veritabanı Kurulumu

Projenin kullandığı veritabanı adı:

```text
interflow
```

MySQL Workbench içinde şu dosyayı çalıştır:

```text
server/schema.sql
```

Bu schema şu tabloları oluşturur:

- `question_records`
- `task_records`
- `task_evidence`

Tabloları kontrol etmek için:

```sql
USE interflow;

SHOW TABLES;
```

### Ortam Değişkenleri

Proje kök dizininde `.env` dosyası oluştur:

```bash
copy .env.example .env
```

MySQL bilgilerini güncelle:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=interflow
API_PORT=4000
VITE_API_URL=http://localhost:4000/api
```


### Projeyi Çalıştırma

Backend API'yi başlat:

```bash
npm run dev:api
```

API adresi:

```text
http://localhost:4000/api
```

Sağlık kontrolü:

```text
http://localhost:4000/api/health
```

Beklenen cevap:

```json
{ "ok": true }
```

Ayrı bir terminalde frontend'i başlat:

```bash
npm run dev
```

Frontend adresi:

```text
http://127.0.0.1:5173/
```

### Komutlar

| Komut | Açıklama |
| :-- | :-- |
| `npm run dev` | Vite frontend geliştirme sunucusunu başlatır |
| `npm run dev:api` | Express API sunucusunu başlatır |
| `npm run build` | Production frontend build'i alır |
| `npm run lint` | ESLint kontrolü çalıştırır |
| `npm run preview` | Production build'i lokal olarak önizler |

### API Özeti

Base URL:

```text
http://localhost:4000/api
```

| Method | Endpoint | Açıklama |
| :-- | :-- | :-- |
| GET | `/health` | API sağlık kontrolü |
| GET | `/records` | Kayıtları getirir |
| PUT | `/questions/:id/solved` | Soruyu çözüldü olarak işaretler |
| DELETE | `/questions/:id/solved` | Çözüldü bilgisini kaldırır |
| PUT | `/tasks/:id/completed` | Task'i tamamlandı olarak işaretler |
| DELETE | `/tasks/:id/completed` | Tamamlandı bilgisini kaldırır |
| PUT | `/tasks/:id/evidence` | Task kanıtını kaydeder |
| DELETE | `/tasks/:id/evidence` | Task kanıtını siler |

### Faydalı Veritabanı Sorguları

```sql
USE interflow;

SELECT * FROM question_records;
SELECT * FROM task_records;
SELECT * FROM task_evidence;
```

### Veri Akışı

InterviewFlow local-first bir yapıyla çalışır:

1. Kullanıcı bir soruyu çözüldü olarak işaretler veya bir task'i tamamlar.
2. Frontend localStorage'ı anında günceller.
3. Frontend kaydı Express API'ye gönderir.
4. API kaydı MySQL'e yazar.
5. Summary ve ilgili sayfalar kayıtları API üzerinden okuyabilir.

### Durum

InterviewFlow şu an full-stack MVP olarak hazırdır:

- Frontend backend olmadan da çalışır
- Backend MySQL'e bağlanır
- MySQL kayıtları başarıyla saklar
- Soru ve task kayıtları veritabanına yazılır
- Summary sayfası kayıtlı aktiviteyi gösterir
- localStorage fallback doğru çalışır

## Author

**Gonca Yavuz**  
Frontend-Focused Full-Stack Developer

## License

This project is licensed under the [MIT License](./LICENSE).
