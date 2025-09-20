import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTask } from '../../utils/api';
import toast from 'react-hot-toast'; 

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTask(id)
      .then(data => {
        setTask(data);
        setError('');
      })
      .catch(err => {
        console.error('Error loading task', err);
        setError('Could not load task');
        toast.error('Failed to load task'); 
      });
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!task) return <p>Loading task detail...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow">
      <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
      <p className="text-gray-600 mb-2">
        Due Date: {new Date(task.dueDate).toLocaleDateString()}
      </p>
      <p className="mb-4">{task.description || 'No description provided.'}</p>
      <p>
        Status:{' '}
        <span
          className={
            task.status === 'completed' ? 'text-green-600' : 'text-orange-600'
          }
        >
          {task.status}
        </span>
      </p>
      <p className="mt-2">
        Priority:{' '}
        <span
          className={`font-semibold ${
            task.priority === 'high'
              ? 'text-red-600'
              : task.priority === 'medium'
              ? 'text-yellow-600'
              : 'text-green-600'
          }`}
        >
          {task.priority}
        </span>
      </p>
      <div className="mt-4">
        <Link
          to={`/tasks/edit/${task._id}`}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
        >
          Edit
        </Link>
        <Link
          to="/tasks"
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Back to list
        </Link>
      </div>
    </div>
  );
};

export default TaskDetail;
