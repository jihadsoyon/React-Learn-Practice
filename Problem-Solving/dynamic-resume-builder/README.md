# Dynamic Resume Builder

A live, split-screen resume builder that lets you craft a professional resume with real-time preview, drag-to-reorder sections, and automatic local persistence — no backend required.

---
## Live link:

https://resume-builder0.netlify.app/

## Problems Solved

- **No more static templates** — resume structure is fully dynamic; add, remove, and reorder sections to match your story
- **Instant visual feedback** — changes appear in the live preview as you type, no save-and-refresh cycle
- **Data survives refreshes** — everything auto-saves to localStorage so your work is never lost
- **Print-ready output** — the preview renders in A4 format so printing to PDF gives a clean, recruiter-ready document
- **Bullet-point experience entries** — each job can have multiple achievement bullets, the hardest part to get right in most resume tools
- **Skill level tagging** — categorized skills with Beginner / Intermediate / Advanced / Expert levels, rendered as a clean inline list in the preview

---

## Features

- **Personal Info** — name, title, email, phone, location, LinkedIn/portfolio, summary
- **Education** — institution, degree, field, start/end year, GPA
- **Work Experience** — company, role, start/end date, "currently working" toggle, dynamic bullet points
- **Skills** — grouped by category with per-skill proficiency levels, tag-based input
- **Projects** — name, date, live URL, description, tech stack tags
- **Live Split-Screen Preview** — A4-formatted resume updates on every keystroke
- **Drag-to-Reorder Sections** — rearrange section order in the sidebar; preview updates instantly
- **LocalStorage Persistence** — auto-saves on every change, survives page refresh
- **Print / PDF Export** — browser print dialog with print-only CSS for clean output
- **Reset** — clear all data with confirmation guard
- **Toast Notifications** — lightweight feedback for add/remove/reorder actions
- **Mobile Responsive** — toggle between edit and preview modes on small screens

---

## Tech Stack

| Tech | Version | Role |
|---|---|---|
| React | 19.2 | UI & component state |
| JavaScript (ES2024) | — | Application logic |
| Tailwind CSS | v4.3 | Utility-first styling |
| Vite | latest | Dev server & build |
| LocalStorage API | — | Client-side persistence |
| HTML5 Drag and Drop API | — | Section reordering |
| CSS Print Media Query | — | PDF-ready output |
