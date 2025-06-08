import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import axios from 'axios';

ChartJS.register(LineElement, PointElement, LinearScale, Title, CategoryScale, Tooltip);

type Monitor = {
  id: number;
  friendly_name: string;
  url: string;
  status: number;
  logs: {
    datetime: number;
    duration: number;
  }[];
};

export default function StatusDashboard() {
  const [monitors, setMonitors] = useState<Monitor[]>([]);

  const statusToText = (status: number) => {
    return status === 2 ? '🟢 Online' : '🔴 Offline';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/status');
        setMonitors(res.data.monitors || []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-10">
      <h1 className="text-4xl font-bold text-center">Status da Infraestrutura</h1>
      <p className="text-center text-gray-600">Monitoramento em tempo real via UptimeRobot</p>

      {monitors.map((monitor) => {
        const logs = [...monitor.logs].reverse();
        const labels = logs.map(log =>
          new Date(log.datetime * 1000).toLocaleTimeString()
        );
        const durations = logs.map(log => log.duration || 0);

        const data = {
          labels,
          datasets: [
            {
              label: 'Tempo de resposta (ms)',
              data: durations,
              borderColor: 'rgba(75,192,192,1)',
              backgroundColor: 'rgba(75,192,192,0.1)',
              tension: 0.3,
            },
          ],
        };

        const options = {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              suggestedMax: 3000,
            },
          },
        };

        return (
          <div key={monitor.id} className="border rounded-xl shadow p-4 bg-white">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">
                Monitor: <a href={monitor.url} className="text-blue-600" target="_blank" rel="noreferrer">{monitor.friendly_name}</a>
              </span>
              <span className={`font-bold ${monitor.status === 2 ? 'text-green-600' : 'text-red-600'}`}>
                Status: {statusToText(monitor.status)}
              </span>
            </div>
            <Line data={data} options={options} />
          </div>
        );
      })}
    </div>
  );
}