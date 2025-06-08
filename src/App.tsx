// src/App.tsx
import './index.css';
import StatusDashboard from './components/StatusDashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-white shadow py-4 mb-6">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Infra Dashboard</h1>
          <p className="text-sm text-gray-500">Status em tempo real com UptimeRobot</p>
        </div>
      </header>
      <main>
        <StatusDashboard />
      </main>
    </div>
  );
}

export default App;
