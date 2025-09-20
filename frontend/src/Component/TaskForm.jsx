import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTask, updateTask, createTask } from '../../utils/api';
import toast from 'react-hot-toast'; 

const TaskForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'pending',
  });

  const [loading, setLoading] = useState(false); 
  const [saving, setSaving] = useState(false);    
  const [error, setError] = useState('');        

  
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetchTask(id)
      .then(task => {
        setFormData({
          title: task.title || '',
          description: task.description || '',
          dueDate: task.dueDate
            ? new Date(task.dueDate).toISOString().slice(0, 10)
            : '',
          priority: task.priority || 'medium',
          status: task.status || 'pending',
        });
        setError('');
      })
      .catch(err => {
        console.error('Error fetching task:', err);
        setError('Could not load task');
        toast.error('Failed to load task'); 
      })
      .finally(() => setLoading(false));
  }, [id]);

  
  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.dueDate) {
      setError('Title and Due Date are required');
      toast.error('Title and Due Date are required'); 
      return;
    }

    try {
      setSaving(true);

      if (id) {
        await updateTask(id, formData);
        toast.success('Task updated successfully'); 
      } else {
        await createTask(formData);
        toast.success('Task created successfully'); 
      }

      navigate('/tasks');
    } catch (err) {
      console.error('Error saving task:', err.response || err);
      const message = err?.response?.data?.message || 'Something went wrong';
      setError(message);
      toast.error(message); 
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Task' : 'New Task'}</h2>

     
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
        
          <div>
            <label htmlFor="title" className="block mb-1 font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              disabled={saving}
            />
          </div>

         
          <div>
            <label htmlFor="description" className="block mb-1 font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              rows="4"
              disabled={saving}
            />
          </div>

        
          <div>
            <label htmlFor="dueDate" className="block mb-1 font-medium">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
              disabled={saving}
            />
          </div>

         
          <div>
            <label htmlFor="priority" className="block mb-1 font-medium">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={saving}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          
          <div>
            <label htmlFor="status" className="block mb-1 font-medium">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              disabled={saving}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 disabled:opacity-50"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
              disabled={saving}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TaskForm;
