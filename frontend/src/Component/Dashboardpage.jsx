import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import { getDashboardData } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    high: 0,
    medium: 0,
    low: 0,
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please log in to access dashboard');
      navigate('/login');
      return;
    }

    getDashboardData()
      .then((data) => {
        setDashboardData(data);
        setLoading(false);
        console.log('Dashboard data:', data);
      })
      .catch((err) => {
        console.error('Error loading dashboard data:', err);
        toast.error('Failed to load dashboard data');
        setLoading(false);
      });
  }, [navigate]);

  const statusPieData = {
    labels: ['Pending', 'Completed'],
    datasets: [
      {
        label: 'Tasks by Status',
        data: [dashboardData.pending, dashboardData.completed],
        backgroundColor: ['#facc15', '#22c55e'],
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    ],
  };

  const priorityBarData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Tasks by Priority',
        data: [dashboardData.high, dashboardData.medium, dashboardData.low],
        backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
      },
    ],
  };

  if (loading) return <div style={{ padding: '2rem' }}>Loading dashboard...</div>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>📊 Task Dashboard</h1>

      <div
        style={{
          background: '#f3f4f6',
          padding: '20px',
          borderRadius: '10px',
          marginBottom: '30px',
          textAlign: 'center',
        }}
      >
        <h2>Total Tasks</h2>
        <h1 style={{ fontSize: '3rem', margin: 0 }}>{dashboardData.total}</h1>
      </div>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          justifyContent: 'center',
        }}
      >
        <div style={{ width: '400px' }}>
          <h3 style={{ textAlign: 'center' }}>Tasks by Status</h3>
          <Pie data={statusPieData} />
        </div>

        <div style={{ width: '400px' }}>
          <h3 style={{ textAlign: 'center' }}>Tasks by Priority</h3>
          <Bar data={priorityBarData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
