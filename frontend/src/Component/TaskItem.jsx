
import React from 'react';
import { Link } from 'react-router-dom';

const priorityColor = {
  high: 'border-red-500',
  medium: 'border-yellow-500',
  low: 'border-green-500'
};

const TaskItem = ({ task, onStatusToggle, onDelete }) => {
  return (
    <div className={`border-l-4 ${priorityColor[task.priority] || 'border-gray-500'} bg-white shadow p-4 mb-3 flex justify-between items-start`}>
      <div>
        <Link to={`/tasks/${task._id}`} className="text-xl font-bold hover:underline">{task.title}</Link>
        <p className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        <p className="text-sm text-gray-800">Status: <span className={task.status === 'completed' ? 'text-green-600' : 'text-orange-600'}>{task.status}</span></p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onStatusToggle(task._id, task.status === 'pending' ? 'completed' : 'pending')}
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          {task.status === 'pending' ? 'Mark Completed' : 'Mark Pending'}
        </button>
        <Link to={`/tasks/edit/${task._id}`} className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-700">Edit</Link>
        <button
          onClick={() => onDelete(task._id)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
