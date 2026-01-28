# GenAI-Powered Decision-Support Platform for Informal Workers

A comprehensive platform connecting informal workers with fair job opportunities using AI-powered matching and wage recommendations.

## 🚀 Features

### For Workers
- ✅ Aadhaar + Mobile authentication
- ✅ Skill profile management with verification
- ✅ AI-powered job matching with explanations
- ✅ Fair wage recommendations
- ✅ Demand and income estimation
- ✅ Work history and portfolio

### For Employers
- ✅ Business registration and verification
- ✅ Job posting with fair wage suggestions
- ✅ Verified worker search and matching
- ✅ Secure communication
- ✅ Rating and feedback system

### Platform Features
- ✅ Human-in-the-loop AI oversight
- ✅ Explainable AI decisions
- ✅ Mobile-first responsive design
- ✅ Multi-language support architecture
- ✅ Data privacy and security compliance

## 🏗️ Tech Stack

### Backend (Microservices)
- **Node.js** with **TypeScript**
- **Express.js** framework
- **MongoDB** database
- **Redis** caching
- **JWT** authentication
- **Zod** validation
- **Winston** logging

### Frontend
- **React 18** with **TypeScript**
- **Vite** build tool
- **Tailwind CSS** styling
- **React Router** navigation
- **Zustand** state management
- **React Query** API handling
- **React Hook Form** + **Zod** forms

### Infrastructure
- Microservices architecture
- API Gateway pattern
- Container-ready (Docker)
- Environment-based configuration

## 📦 Prerequisites

- Node.js 18+ [Download](https://nodejs.org/)
- MongoDB 7+ [Download](https://www.mongodb.com/try/download/community)
- Redis 7+ [Download](https://redis.io/download)
- npm 9+ (comes with Node.js)

## 🛠️ Installation

### 1. Clone and Setup
```bash
# Create project directory
mkdir genai-workers-platform
cd genai-workers-platform

# Initialize project
npm init -y
npm install concurrently typescript @types/node --save-dev

# Create tsconfig.json
# (Copy from tsconfig.json section below)
