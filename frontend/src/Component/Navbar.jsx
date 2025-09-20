import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    
    const cachedTasks = localStorage.getItem('cachedTasks');
    const cachedPage = localStorage.getItem('cachedPage');

    
    localStorage.clear();

    
    if (cachedTasks) {
      localStorage.setItem('cachedTasks', cachedTasks);
    }
    if (cachedPage) {
      localStorage.setItem('cachedPage', cachedPage);
    }

    
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
      <div className="text-lg font-semibold">
        <Link to="/tasks">Task Manager</Link>
      </div>
      <div className="space-x-4">
        {token ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
