# ⚡ LeetTracker

A LeetCode progress tracker with a built-in **spaced repetition revision scheduler** — so you never forget a problem you've already solved.

🔗 **Live App:** [leetcode-tracker-gilt.vercel.app](https://leetcode-tracker-gilt.vercel.app/)

---

## 🎯 Why this exists

LeetCode lets you solve problems, but it doesn't tell you *when to revisit them*. Most people forget easy problems within a week and hard problems within a day — exactly when interviews are around the corner.

LeetTracker solves this using the **Ebbinghaus Forgetting Curve** (the same principle behind Anki and Duolingo): every problem you add gets an automatic revision date based on its difficulty, and the app surfaces what to revise — overdue, due today, or upcoming — every time you open it.

---

## ✨ Features

- 🔐 **Google Authentication** — secure per-user login via Firebase
- ☁️ **Cloud sync** — your data follows you across devices (Firestore)
- 📊 **Visual dashboard** — pie chart for difficulty breakdown, bar chart for weekly activity
- 🔁 **Spaced repetition scheduler** — automatic revision dates (7 days for Easy, 3 for Medium, 1 for Hard)
- 🔥 **Streak tracker** — tracks consecutive days of practice
- 🔍 **Search & filter** — find problems instantly by name, topic, or difficulty
- 🔔 **Toast notifications** — instant feedback on every action
- 🌑 **Dark glassmorphism UI** — custom-built, no UI library used

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React, React Router |
| Charts | Recharts |
| Auth & Database | Firebase Authentication, Firestore |
| Styling | Custom CSS-in-JS (no framework) |
| Notifications | react-hot-toast |
| Deployment | Vercel |
| Version Control | Git & GitHub |

---

## 📸 Screenshots

*(Add 2–3 screenshots here: Dashboard, Problem List, Revision page)*

---

## 🚀 Getting Started Locally

```bash
git clone https://github.com/chaithra0926/leetcode-tracker.git
cd leetcode-tracker
npm install
```

Create a `.env` file in the root with your own Firebase config:
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Run the app:
```bash
npm run dev
```

---

## 👩‍💻 Author

**Chaithra**
B.Tech ECE Student | Aspiring Frontend Developer
[GitHub](https://github.com/chaithra0926)