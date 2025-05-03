# Notes Dashboard

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
* **Performance:** Uses either `@vitejs/plugin-react` (Babel) or `@vitejs/plugin-react-swc` (SWC) for fast refresh and performance.

---

## 🛠️ Tech Stack

* **React 18 + Vite**
* **React Router**
* **Axios**
* **Tailwind CSS / Styled Components (optional)**
* **JWT Auth**
* **Gemini-pro(for AI summaries and tag suggestions)**
* **API (Node.js/Express or any backend)**

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
```

> ⚠️ Do **not** expose sensitive keys on the frontend. Use backend routes to interact with external APIs securely.

### 3. Run the App

```bash
npm run dev


The app will be available at: [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```bash
src/
│
├── api/                # Axios client and endpoints
├── components/         # Reusable components
├── features/           # Auth, Notes, Tags features
├── hooks/              # Custom hooks
├── pages/              # Page-level components
├── utils/              # Helper functions (e.g., token handling)
├── App.jsx             # App routing
└── main.jsx            # Entry point
```

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
