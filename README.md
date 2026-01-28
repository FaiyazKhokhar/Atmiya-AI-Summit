# Atmiya AI Summit - Worker & Customer Management Platform

A modern web application built with React and Vite that manages worker and customer interactions with voice recognition capabilities.

## ?? Project Overview

This platform provides separate authentication and dashboards for two main user types:
- **Customers**: Browse workers, manage profiles, and request services
- **Workers**: Manage availability, view customer requests, and update profiles

### Key Features
- ?? Role-based authentication (Customer & Worker)
- ?? Speech Recognition integration
- ?? Dashboard for both customers and workers
- ?? User profile management
- ?? Modern UI with Tailwind CSS
- ? Fast development with Vite
- ??? SQLite database backend

## ??? Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **Vite** - Build tool
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling (via tailwind-merge)
- **Lucide React** - Icons
- **Framer Motion** - Animations
- **React Icons** - Additional icon library

### Backend
- **Node.js/Express** - Server framework
- **SQLite3** - Database
- **CORS** - Cross-origin requests handling

## ?? Project Structure

`
+-- src/
¦   +-- components/           # Reusable UI components
¦   ¦   +-- Button.jsx
¦   ¦   +-- Card.jsx
¦   ¦   +-- Input.jsx
¦   ¦   +-- Layout.jsx
¦   ¦   +-- Navbar.jsx
¦   +-- pages/               # Page components
¦   ¦   +-- Home.jsx
¦   ¦   +-- Login.jsx
¦   ¦   +-- CustomerRegistration.jsx
¦   ¦   +-- CustomerDashboard.jsx
¦   ¦   +-- CustomerProfile.jsx
¦   ¦   +-- WorkerLogin.jsx
¦   ¦   +-- WorkerRegistration.jsx
¦   ¦   +-- WorkerDashboard.jsx
¦   ¦   +-- WorkerProfile.jsx
¦   +-- hooks/               # Custom React hooks
¦   ¦   +-- useSpeechRecognition.js
¦   +-- contexts/            # React context for state management
¦   +-- services/            # API and external services
¦   +-- App.jsx
¦   +-- main.jsx
+-- public/                  # Static assets
+-- server.js               # Express server
+-- database.sqlite         # SQLite database
+-- package.json
+-- vite.config.js
+-- README.md
`

## ?? Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   `ash
   git clone https://github.com/FaiyazKhokhar/Atmiya-AI-Summit.git
   cd Atmiya-AI-Summit
   `

2. **Install dependencies**
   `ash
   npm install
   `

3. **Start the development server**
   `ash
   npm run dev
   `
   Frontend will be available at `http://localhost:5173`

4. **In a separate terminal, start the backend server**
   `ash
   npm run server
   `
   Backend will be available at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start Vite development server
- `npm run server` - Start Express backend server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## ?? Authentication Flow

### Customer Path
- Home ? Customer Login ? Customer Dashboard ? Customer Profile

### Worker Path
- Home ? Worker Login ? Worker Dashboard ? Worker Profile

## ?? Speech Recognition

The application includes a custom `useSpeechRecognition` hook for voice input capabilities, enabling hands-free interaction with the platform.

## ?? Database

SQLite database (`database.sqlite`) stores:
- Customer information
- Worker profiles and availability
- User authentication data
- Service requests and interactions

## ?? Deployment

Build the project for production:
`ash
npm run build
`

This generates an optimized production build in the `dist/` directory.

## ?? License

This project is part of the Atmiya AI Summit initiative.

## ?? Contributors

- **Faiyaz Khokhar** - Project Lead

## ?? Support

For issues, questions, or contributions, please open an issue on the GitHub repository.

---

**Last Updated:** January 2026
