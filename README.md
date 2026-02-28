<<<<<<< HEAD
# Zaplink — Secure QR Code & File Sharing Platform

> ⚠️ **IMPORTANT**: This frontend requires a **backend server** running to work properly. See [BACKEND_SETUP.md](BACKEND_SETUP.md) for detailed instructions.
=======
<<<<<<< HEAD
# Zaplink Frontend - GDG CHARUSAT Open Source Contri Sprintathon 
>>>>>>> origin/main

## 🎯 About This Project

Zaplink is an open-source platform that lets you transform any file, link, or text into a **secure, shareable QR code** — instantly. Whether it's a PDF report, a video, an image, or a URL, Zaplink wraps it in a unique short link and QR code that you can share anywhere.

Every "Zap" (your uploaded content) can be locked with a **password** and configured to **self-destruct** after a set number of views or a time limit — making it ideal for sensitive, time-critical content sharing.

Zaplink also lets you **customize your QR code** with frames, logos, and styles before downloading or sharing it. It's built with React, TypeScript, Vite, and Tailwind CSS, and is maintained by **GDG CHARUSAT** as part of their open-source learning initiative.

## ✨ Features

- 📁 **Multi-format Support** — Upload PDFs, images, videos, audio, documents, presentations, ZIP archives, URLs, and plain text
- 🔐 **Password Protection** — Lock any Zap with a password so only authorized people can access it
- 💣 **Self-Destruct** — Set a view-count limit or an expiry time after which the link stops working automatically
- 🎨 **QR Code Customization** — Choose from frame styles (rounded, circle, shadow, gradient, border) and embed your own logo
- ⚡ **Instant QR Generation** — Get a QR code and short link in seconds, no registration required
- 🌗 **Dark/Light Mode** — Full theme toggle support for a comfortable experience
- 📱 **Fully Responsive** — Works seamlessly on mobile, tablet, and desktop

## 📸 Screenshots

### Home — Choose What to Share
![Home Page](public/screenshots/home.png)

### Step-by-Step Upload Flow
![Steps to Generate](public/screenshots/steps-to-generate.png)

### Things You Can Share
![Things to Share](public/screenshots/things-to-share.png)

---

## 🚀 Quick Start for Contributors

### Prerequisites

- Node.js (v18 or higher)
- npm
- Git
- **Backend Server** (REQUIRED - must be running before testing uploads)

### Installation & Setup

#### Step 1: Clone & Install Frontend
```bash
# Fork and clone your fork
git clone https://github.com/YOUR-USERNAME/Zaplink_frontend.git
cd Zaplink_frontend

# Add upstream remote
git remote add upstream https://github.com/gdg-charusat/Zaplink_frontend.git

# Install dependencies
npm install
```

#### Step 2: Get the Backend Running (CRITICAL!)

The frontend **REQUIRES** a backend server running on `http://localhost:5000` for uploads to work.

##### Option A: Backend in Sibling Directory (Recommended)
```bash
# In a NEW terminal, from parent directory
cd ..
git clone https://github.com/gdg-charusat/Zaplink_backend.git
cd Zaplink_backend

# Install and start backend
npm install
npm start
```

✅ Backend should now be running on `http://localhost:5000`

##### Option B: Backend on Different Port
Create `.env` file in frontend directory:
```env
VITE_BACKEND_URL=http://localhost:3000
```

Replace `3000` with your actual backend port, then start frontend.

##### Option C: Using Docker
```bash
cd ../Zaplink_backend
docker build -t zaplink-backend .
docker run -p 5000:5000 zaplink-backend
```

#### Step 3: Start Development Frontend

In the `Zaplink_frontend` directory (in a NEW terminal):
```bash
npm run dev
```

✅ Frontend will open at `http://localhost:5173`

### ✓ Verify Setup is Correct

Open browser DevTools (F12) and check the console:

**✅ Success - You should see:**
```
ℹ Development Mode: Using Vite proxy for /api routes
📍 Proxy target: http://localhost:5000 (default)
```

**❌ Error - If you see:**
```
Failed to load resource: the server responded with a status of 500 (Internal Server Error)
AggregateError [ECONNREFUSED]
```

**This means:** Backend is NOT running! Follow Step 2 again.

### 🛠 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Upload returns 404** | Backend not running. Start it: `cd ../Zaplink_backend && npm start` |
| **ECONNREFUSED error** | Backend not running on port 5000. Check `npm start` output in backend terminal |
| **Backend on different port** | Create `.env`: `VITE_BACKEND_URL=http://localhost:YOUR_PORT` |
| **"Cannot find module" errors** | Run `npm install` in both frontend AND backend |
| **Port 5000 already in use** | Either kill that process or use a different port with `.env` config |

### 📝 Common Development Flow

```bash
# Terminal 1: Backend
cd ../Zaplink_backend
npm start
# Should show: Server running on http://localhost:5000

# Terminal 2: Frontend  
cd ../Zaplink_frontend
npm run dev
# Should show: Local: http://localhost:5173
```

### 🔄 After Changes

- **Frontend changes**: Automatically reload in browser
- **Backend changes**: Restart the backend server (Ctrl+C, then `npm start`)

---

## 📚 Contributing

We welcome contributions from developers of all skill levels! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) guide to get started.

### Finding Issues

Browse our [Issues](https://github.com/gdg-charusat/Zaplink_frontend/issues) page for tasks:

- **Beginner** 🟢: Look for `good-first-issue` or `beginner` labels
- **Intermediate** 🟡: Look for `intermediate` label

### Contribution Workflow

1. Pick an issue and comment to get assigned
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit: `git commit -m "feat: add feature description"`
5. Push: `git push origin feature/your-feature-name`
6. Open a Pull Request

Need help? Check out our detailed [CONTRIBUTING.md](CONTRIBUTING.md) guide!

---

## 🛠 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS
- **Shadcn/ui** - Component library

---

## 📁 Project Structure

```
Zaplink_frontend/
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── utils/          # Helper functions
│   ├── types/          # TypeScript type definitions
│   ├── styles/         # Global styles
│   └── assets/         # Static assets (images, fonts)
├── public/             # Public static files
├── CONTRIBUTING.md     # Contribution guidelines
└── README.md           # This file
```

---

## 🧪 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 🤝 Community

- **Event**: GDG CHARUSAT Open Source Contri Sprintathon
- **Discord/WhatsApp**: [Link to community group]
- **Maintainers**: [List maintainer GitHub usernames]

---

## 📜 Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to understand the expected behavior in our community.

---

## 📝 License

[Add your license here]

---


## 🌟 Contributors

Thanks to all our amazing contributors!

<!-- Add contributor badges or list here -->-

---

## 📞 Need Help?

- 📖 Check the [CONTRIBUTING.md](CONTRIBUTING.md) guide
- 💬 Comment on the issue you're working on
- 🗣️ Ask in the event Discord/WhatsApp group
- 🐛 Found a bug? [Create an issue](https://github.com/gdg-charusat/Zaplink_frontend/issues/new)

---

**Happy Coding! 🚀**

Made with ❤️ by GDG CHARUSAT
=======
# Code Duel Frontend

<div align="center">
   <img src="public/assets/image.png" alt="LeetCode Tracker Screenshot" style="max-width: 100%; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); margin-bottom: 16px;" />
</div>

A sleek, modern web application designed to help developers stay consistent with their LeetCode practice. Compete with friends, track your daily progress, and stay accountable through a structured challenge system.

## 🚀 Overview
LeetCode Tracker is a full-stack platform where users can join or create coding challenges. The system monitors your LeetCode submissions and evaluates your daily performance based on pre-defined targets.

### Key Features
- **Mobile-Responsive Design**: Fully accessible on all devices with a dedicated mobile navigation drawer.
- **Challenge Management**: Create challenges with custom rules, daily targets, and penalty systems.
- **Leaderboards**: Real-time rankings to stay competitive with peers.
- **Activity Heatmaps**: Visual representation of your coding consistency.
- **Dark Mode**: Eye-friendly interface with dynamic theme switching.


## 🛠️ Tech Stack

<div align="center">

|  | Technology |
| :---: | :--- |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" width="28"/> | **Frontend Framework:** [React 18](https://reactjs.org/) |
| <img src="https://vitejs.dev/logo.svg" alt="Vite" width="28"/> | **Build Tool:** [Vite](https://vitejs.dev/) |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" width="28"/> | **Language:** [TypeScript](https://www.typescriptlang.org/) |
| <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/tailwindcss/tailwindcss-plain.svg" alt="Tailwind CSS" width="28"/> | **Styling:** [Tailwind CSS](https://tailwindcss.com/) |
| <img src="https://ui.shadcn.com/favicon.ico" alt="shadcn/ui" width="28"/> | **UI Components:** [shadcn/ui](https://ui.shadcn.com/) |
| <img src="https://lucide.dev/favicon.ico" alt="Lucide React" width="28"/> | **Icons:** [Lucide React](https://lucide.dev/) |
| <img src="https://date-fns.org/favicon.ico" alt="date-fns" width="28"/> | **Date Handling:** [date-fns](https://date-fns.org/) |
| <img src="https://axios-http.com/assets/favicon.ico" alt="Axios" width="28"/> | **API Client:** [Axios](https://axios-http.com/) |

</div>


## 📦 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/gdg-charusat/Code_duel_frontend.git
   cd Code_duel_frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

### Environment Configuration
Create a `.env` file in the root directory and add the following:
```env
VITE_API_URL=http://localhost:3000
```

### Running Locally
To start the development server:
```bash
npm run dev
```
The app will be available at [http://localhost:8080](http://localhost:8080).


## 📂 Project Structure

```
Code_duel_frontend/
│
├── public/
│   ├── assets/                # Static images and assets (e.g., screenshots)
│   ├── favicon.ico            # App favicon
│   └── robots.txt             # Robots exclusion file
│
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── challenge/         # Challenge-related components
│   │   ├── common/            # Common/shared UI elements
│   │   ├── dashboard/         # Dashboard widgets and charts
│   │   ├── layout/            # Layout and navigation (Navbar, Layout)
│   │   ├── leaderboard/       # Leaderboard table and related UI
│   │   └── ui/                # Base UI primitives (shadcn/ui)
│   ├── contexts/              # React Contexts (Auth, Theme)
│   ├── data/                  # Static/mock data
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # API config and utility functions
│   ├── pages/                 # Page-level components (routes)
│   ├── types/                 # TypeScript type definitions
│   ├── App.tsx                # Main App component
│   ├── main.tsx               # App entry point
│   └── index.css              # Global styles
│
├── .github/                   # GitHub workflows and templates
├── package.json               # Project metadata and dependencies
├── tsconfig.json              # TypeScript configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
├── vite.config.ts             # Vite configuration
├── README.md                  # Project documentation
└── ...                        # Other configs and docs
```

### Key Directories
- **components/**: All UI building blocks, organized by feature and type.
- **pages/**: Top-level route components for each page.
- **contexts/**: Global state management using React Context API.
- **lib/**: API utilities and helper functions.
- **hooks/**: Custom React hooks for reusable logic.
- **types/**: TypeScript type definitions for strong typing.
- **public/assets/**: Static images, screenshots, and icons.

---


## 🤝 Contribution Workflow
1. **Fork the Project** on GitHub ([How to fork a repo](https://docs.github.com/en/get-started/quickstart/fork-a-repo)).
2. **Create your Feature Branch:**
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Commit your Changes:**
   ```bash
   git commit -m 'feat: add YourFeatureName'
   ```
4. **Push to the Branch:**
   ```bash
   git push origin feature/YourFeatureName
   ```
5. **Open a Pull Request** ([How to create a PR](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)).


## 📄 License
Distributed under the ISC License. See [LICENSE](LICENSE) for more information.

---

For more details, visit the [project repository](https://github.com/gdg-charusat/Code_duel_frontend).



>>>>>>> upstream/main
