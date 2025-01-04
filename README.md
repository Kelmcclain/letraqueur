# Le Traqueur - Incident Tracking System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.x-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Firebase](https://img.shields.io/badge/Firebase-10.x-orange)

Le Traqueur is a modern, real-time incident tracking system built with React, TypeScript, and Firebase. It provides organizations with a robust solution for monitoring and managing workplace incidents with features like live time tracking, incident counting, and detailed analytics.

## 🌟 Features

- **Real-time Incident Tracking**
  - Live timer tracking since last incident
  - Visual progress indicators with color-coded states
  - Increment/decrement incident counter with animations

- **User Authentication**
  - Secure Firebase authentication
  - User-specific data isolation
  - Account management functionality

- **Modern UI/UX**
  - Responsive design for all devices
  - Glassmorphic UI elements
  - Smooth animations and transitions
  - Dark mode support

- **Analytics & Statistics**
  - Real-time statistics dashboard
  - Time-based analytics
  - Progress tracking and reporting

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Kelmcclain/letraqueur.git
cd letraqueur
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Configure Firebase:
   - Create a new Firebase project
   - Enable Authentication and Firestore
   - Copy your Firebase configuration
   - Create a `.env.local` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## 🏗️ Project Structure

```
src/
├── components/         # React components
│   ├── auth/          # Authentication components
│   ├── ui/            # Reusable UI components
│   ├── Timer.tsx
│   └── IncidentCounter.tsx
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── services/          # Firebase and other services
└── types/             # TypeScript types
```

## 🛠️ Built With

- [React](https://reactjs.org/) - UI Framework
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [Firebase](https://firebase.google.com/) - Backend and Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI Components
- [Lucide Icons](https://lucide.dev/) - Icons

## 📦 Key Dependencies

- `@firebase/auth` - Authentication
- `@firebase/firestore` - Database
- `react-router-dom` - Routing
- `tailwindcss` - Styling
- `lucide-react` - Icons
- `@radix-ui/react-*` - UI primitives

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide](https://lucide.dev/) for the icon set
- [Firebase](https://firebase.google.com/) for the backend infrastructure

## 📧 Contact

Name - [@Kelmcclain](https://twitter.com/kelmcclain)

Project Link: [https://github.com/Kelmcclain/letraqueur](https://github.com/Kelmcclain/letraqueur)