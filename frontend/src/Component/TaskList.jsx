import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast'; 

import TaskItem from './TaskItem';
import Pagination from './Pagination';
import { deleteTask, fetchTasks, updateTask } from '../../utils/api';

const TaskList = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('cachedTasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [page, setPage] = useState(() => {
    const savedPage = localStorage.getItem('cachedPage');
    return savedPage ? Number(savedPage) : 1;
  });

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      loadTasks(page); 
    }
  }, [page, token]);

  const loadTasks = async (pageNum) => {
    setLoading(true);
    try {
      const data = await fetchTasks(pageNum);
      setTasks(data.tasks);
      setTotalPages(data.totalPages || 1);
      
      localStorage.setItem('cachedTasks', JSON.stringify(data.tasks));
      localStorage.setItem('cachedPage', pageNum);
    } catch (err) {
      console.error('Error fetching tasks', err);
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (id, newStatus) => {
    try {
      await updateTask(id, { status: newStatus });
      toast.success(`Task marked as ${newStatus}`);
      loadTasks(page); 
    } catch (err) {
      console.error('Error updating task status', err);
      toast.error('Failed to update task status');
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    try {
      await deleteTask(id);
      toast.success('Task deleted');
      loadTasks(page);
    } catch (err) {
      console.error('Error deleting task', err);
      toast.error('Failed to delete task');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Tasks</h2>
        <a
          href="/tasks/new"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          New Task
        </a>
      </div>

      {loading && <p>Loading tasks...</p>}
      {!loading && tasks.length === 0 && <p>No tasks found.</p>}

      <div>
        {tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onStatusToggle={handleStatusToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          setPage(newPage);
          localStorage.setItem('cachedPage', newPage);
        }}
      />
    </div>
  );
};

export default TaskList;
