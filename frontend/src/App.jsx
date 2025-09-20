import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';


import Login from './Component/Auth/Login';
import Register from './Component/Auth/Register';
import ProtectedRoute from './Component/Auth/ProtectedRoute';
import TaskList from './Component/TaskList';
import TaskForm from './Component/TaskForm';
import TaskDetail from './Component/TaskDetail';
import Dashboard from './Component/Dashboardpage';

import { setAuthToken } from '../utils/api';
import { Toaster } from 'react-hot-toast';
import Layout from './Component/Layout';

function App() {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  return (
    <Router>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
       
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

       
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          
          <Route index element={<Navigate to="/tasks" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<TaskList />} />
          <Route path="tasks/new" element={<TaskForm />} />
          <Route path="tasks/edit/:id" element={<TaskForm />} />
          <Route path="tasks/:id" element={<TaskDetail />} />
        </Route>

       
        <Route path="*" element={<Navigate to="/tasks" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
