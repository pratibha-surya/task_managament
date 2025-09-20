import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './Component/Navbar';
import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import ProtectedRoute from './Component/Auth/ProtectedRoute';
import TaskList from './Component/TaskList';
import TaskForm from './Component/TaskForm';
import TaskDetail from './Component/TaskDetail';
import { setAuthToken } from '../utils/api';


import { Toaster } from 'react-hot-toast';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    setAuthToken(token);
  }, []);

  return (
    <Router>
      <Navbar />

     
      <Toaster position="top-right" reverseOrder={false} />

      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/tasks" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ Protected Routes */}
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TaskList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/new"
            element={
              <ProtectedRoute>
                <TaskForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/edit/:id"
            element={
              <ProtectedRoute>
                <TaskForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/:id"
            element={
              <ProtectedRoute>
                <TaskDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
