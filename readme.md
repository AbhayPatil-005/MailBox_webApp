![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?logo=firebase)
![Redux](https://img.shields.io/badge/Redux-593D88?logo=redux)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?logo=bootstrap)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?logo=netlify&logoColor=white)

# React Mail Client ***

### A fully functional email application built using React, Firebase, and Redux Toolkit, featuring real-time updates, message management, and a clean Bootstrap-based UI.

Live Demo: View Deployed App 🚀 
***

## Features
**User Authentication** — Secure signup and login using Firebase Auth
**Compose & Send Emails** — Rich text editor with Froala integration
**Inbox & Sent View** — Real-time sync with read/unread indicators
**Auto Polling** — Refreshes mailbox every 2 seconds for new mails
**Delete Mails** — Remove unwanted emails instantly
**Unread Count Badge** — Displays number of unread mails in sidebar
**Responsive Layout** — Built fully with React-Bootstrap components
**Toasts & Loaders** — Clean UX feedback system
**Custom Hooks** — Modularized fetching and mail API logic
***

## Tech Stack

**Frontend**: React(Vite)
**State Management**: Redux Toolkit
**UI Library**: React-Bootstrap
**Rich Text Editor**: Froala WYSIWYG
**Backend / Database**: Firebase Realtime Database
**Auth**: Firebase Authentication
**Deployment**: Netlify
***

## Folder and file structure

src/
├── components/
│   ├── Features/
│   │   ├── InboxView.jsx
│   │   ├── SentView.jsx
│   │   ├── ComposeMail.jsx
│   │   ├── ReadMail.jsx
│   ├── Layout/
│   │   ├── NavBar.jsx
│   │   ├── SideBar.jsx
│
├── hooks/
│   ├── useFetch.js
│   ├── useMailApi.js
│
├── store/
│   ├── authSlice.js
│   ├── store.js
│
├── pages/
│   ├── Auth/
│   │   ├── LoginPage.jsx
│   │   ├── SignUpPage.jsx
│   ├── HomePage.jsx
│
└── App.jsx
└── main.jsx

***

## Set up instructions

- ###  Clone the repo:
``` cd react-mail-client ```

- ###  Install dependencies
**Create a .env file in the root directory:**
VITE_FIREBASE_BASE_URL=https://your-project.firebaseio.com

- ### Run locally
`npm run dev`

- ### Build for production
`npm run build`

***

## Custom Hooks
`useFetch` - *Reusable data fetching hook with optional polling and error handling.*

`useMailApi` - *Centralized API logic for sending, reading, and marking emails as read.*

## Author

- Mechanical Engineer turned Frontend Developer.
- Passionate about building scalable and elegant UI systems

## Future Enhancements

- Mail search and filter.
- Attachment upload.
- Real-time notifications via **Firebase listeners**.
- PWA(progressive web application) support.
