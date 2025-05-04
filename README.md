# Notes Dashboard

  🌐 Live Frontend URL (Railway):
  https://smartnotesfrontend-production.up.railway.app/  
  
A minimal yet powerful note-taking dashboard built using **React** with **Vite**, featuring:

* ✅ User authentication via JWT (stored in cookies)
* 📄 Paginated and searchable notes display
* ✍️ AI-generated summaries and suggested tags
* 🏷️ Tag management
* 🚀 Fast refresh and development with Vite
* 🔒 Secure, validated forms and robust error handling

---

## 📦 Features

* **Authentication:** Login/register users using JWT stored in HTTP-only cookies.
* **Dashboard:** Paginated note viewer with search support.
* **Notes:** Create, edit, and delete notes with AI-generated summaries.
* **Tags:** Auto-suggested tags using AI, with full CRUD support.
* **UI/UX:** Clean and intuitive interface with responsive design.
* **Architecture:** Modular and scalable component structure.
* **API:** RESTful API integration for backend CRUD operations.

---

## 🛠️ Tech Stack

* **React 18 + Vite**
* **React Router**
* **Axios**
* **Tailwind CSS / Styled Components**
* **JWT Auth**
* **Gemini-pro(for AI summaries and tag suggestions)**
* **API (Node.js/Express or any backend)**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Shanmuk587/SmartNotesFrontend.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```


  ## 🌐 API Configuration

The application uses **Axios** to make HTTP requests to the backend.

### 🔧 Axios Setup (in frontend code) services/api.js:

```js
const api = axios.create({
  // For production:
  // baseURL: 'https://smartnotesbackend-production.up.railway.app/api',

  // For local development:
  baseURL: 'http://localhost:3000/api',

  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
```

---

## 🛠️ Local Development Setup

When running your app locally:

* **Backend** should be started on `http://localhost:3000`
* Axios `baseURL` should be set to:

```js
baseURL: 'http://localhost:3000/api'
```

---
### 3. Run the App

```bash
npm run dev


The app will be available at: [http://localhost:5173](http://localhost:5173)

---

## 📌 Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
```

---

## 🔐 Auth Flow (JWT Cookies)

1. On login/register: server returns HTTP-only cookie with access token.
2. On each request, the cookie is automatically sent.
3. Token is verified on the backend for protected routes.
4. Frontend can use a `useAuth` hook or context to manage state.

---

## 🧠 AI Integration

* Uses Gemini-pro via API for:

  * Summarizing note content.
  * Suggesting relevant tags.
* On note creation/editing, a backend route interacts with the AI and returns summaries/tags.

---
