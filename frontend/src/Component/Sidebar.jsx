


import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'block p-3 bg-blue-600 text-white rounded mb-2'
      : 'block p-3 hover:bg-blue-100 rounded mb-2';

  return (
    <nav style={{ width: '200px', background: '#e5e7eb', padding: '1rem' }}>
      <h2 className="text-xl font-bold mb-4">My App</h2>
      <NavLink to="/dashboard" className={linkClass}>
        Dashboard
      </NavLink>
      <NavLink to="/tasks" className={linkClass}>
        Tasks
      </NavLink>
      <NavLink to="/tasks/new" className={linkClass}>
        New Task
      </NavLink>
    </nav>
  );
};

export default Sidebar;
