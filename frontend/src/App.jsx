// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

import { useState } from 'react';
import { useAuth } from './hooks/useAuth.js';
import { AuthProvider } from './context/AuthProvider.jsx';
import AuthPage from './pages/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import ExamsPage from './pages/ExamsPage.jsx';
import UpcomingPage from './pages/UpcomingPage.jsx';

function Nav() {
  const { user, logout } = useAuth();
  return (
    <nav className="nav">
      <div className="nav-brand">StudyPal</div>
      <div className="nav-links">
        <span className="nav-user">{user?.name}</span>
        <button className="btn btn-ghost btn-sm" onClick={logout}>Sign out</button>
      </div>
    </nav>
  );
}

function App() {
  const { user, loading } = useAuth();
  const [tab, setTab] = useState('today');

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48 }}>📚</div>
        <p style={{ color: 'var(--gray-400)', marginTop: 8 }}>Loading StudyPal…</p>
      </div>
    </div>
  );

  if (!user) return <AuthPage />;

  return (
    <div className="layout">
      <Nav tab={tab} setTab={setTab} />
      <main className="main">
        <div className="tab-nav">
          <button className={`tab ${tab === 'today' ? 'active' : ''}`} onClick={() => setTab('today')}>Today</button>
          <button className={`tab ${tab === 'upcoming' ? 'active' : ''}`} onClick={() => setTab('upcoming')}>Upcoming</button>
          <button className={`tab ${tab === 'exams' ? 'active' : ''}`} onClick={() => setTab('exams')}>My Exams</button>
        </div>
        {tab === 'today' && <DashboardPage />}
        {tab === 'upcoming' && <UpcomingPage />}
        {tab === 'exams' && <ExamsPage />}
      </main>
    </div>
  );
}

export default function Root() {
  return <AuthProvider><App /></AuthProvider>;
}
