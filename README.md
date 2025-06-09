# 📘 Project Documentation (React + Redux Toolkit + TypeScript + Vite)

A reactive real-time chat application built with React, Vite, Redux Toolkit, Socket.IO and TailwindCSS.

---

## 🌐 Live Demo

The application is deployed on GitHub Pages:  
👉 [real-time-chat-app](https://real-time-chat-app-lilac-theta.vercel.app/)

---

## 🧩 Backend Repository

The backend server (Socket.IO, Express, etc.) is available here:
👉 [real-time-chat-app-be](https://github.com/AlexanderMezhenskyi/real-time-chat-app-be)

---
## 🚀 Features

- Multiple chat rooms with room switching
- Real-time messaging via WebSocket using JSON‑RPC
- Auto-scrolling, avatars, and 3D display mode
- Responsive design with TailwindCSS
- Quick start with Vite, ESLint, and Prettier

---
## 🛠 Tech Stack

- Frontend:	React 19, TypeScript, Vite 6
- State Management.	Redux Toolkit, React-Redux
- 3D & Visuals:	Three.js, @react-three/fiber, @react-three/drei
- WebSockets:	socket.io-client
- Styling:	TailwindCSS 4
- Utils:	faker.js (@faker-js/faker) for generating user data
- Code Quality:	ESLint, Prettier, TypeScript, typescript-eslint

---

## 🔧 Getting Started

To set up the project locally, follow these steps:

1. **Install Dependencies**  
   Run the following command in the root directory to install all libraries defined in `package.json`:

   ```bash
   yarn install
   ```

2. **Start Development Server**  
   Launch the Vite development server with Hot Module Replacement (HMR):

   ```bash
   yarn dev
   ```

   After startup, the app will be available at the URL shown in the terminal ([http://localhost:5173](http://localhost:5173)).


3. **Build for Production**  
   Create an optimized production build:

   ```bash
   yarn build
   ```

   The build output will be located in the `dist` directory.


4. **Preview Production Build Locally**  
   Serve the built application locally to test the production version:
   ```bash
   yarn preview
   ```

---

## 📜 Available Scripts

The `package.json` file includes several useful scripts. Run them using:

```bash
yarn <script_name>
```

| Script         | Description                                                     |
|----------------|-----------------------------------------------------------------|
| `dev`          | Starts the Vite dev server with Hot Module Replacement.         |
| `build`        | Bundles the app for production into the `dist` folder.          |
| `preview`      | Serves the production build locally using a static file server. |
| `start`        | Alias for `preview` — serves the built app locally.             |
| `format`       | Formats the codebase using Prettier.                            |
| `format:check` | Checks formatting without making changes.                       |
| `lint`         | Runs ESLint to check for code issues.                           |
| `lint:fix`     | Runs ESLint and automatically fixes fixable issues.             |
| `type-check`   | Runs TypeScript type checking in project files.                 |
