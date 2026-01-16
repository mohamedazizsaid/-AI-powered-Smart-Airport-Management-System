import React, { useState } from 'react';
import AdminDashboard from './views/AdminDashboard';
import CheckInView from './views/CheckInView';
import AIChatbot from './components/AIChatbot';
import './App.css';

function App() {
  const [view, setView] = useState('admin');

  return (
    <div className="App overflow-hidden">
      {/* View Toggler for Demo */}
      <div className="fixed top-4 right-4 z-[100] flex gap-2">
        <button
          onClick={() => setView('admin')}
          className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${view === 'admin' ? 'bg-airport-accent text-white' : 'bg-white/10 text-slate-500 hover:bg-white/20'
            }`}
        >
          Admin Console
        </button>
        <button
          onClick={() => setView('checkin')}
          className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${view === 'checkin' ? 'bg-emerald-500 text-white' : 'bg-white/10 text-slate-500 hover:bg-white/20'
            }`}
        >
          User Check-in
        </button>
      </div>

      {view === 'admin' ? (
        <>
          <AdminDashboard />
          <AIChatbot />
        </>
      ) : (
        <CheckInView />
      )}
    </div>
  );
}

export default App;
