import Task from "../model/task.model.js"



export const getTasks = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const tasks = await Task.find({ user: req.user.id })
      .sort({ dueDate: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Task.countDocuments({ user: req.user.id });

    res.json({
      tasks,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
export const createTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;

  if (!title || !dueDate) {
    return res.status(400).json({ msg: 'Title and Due Date are required' });
  }

  if (!req.user || !req.user.id) {
    return res.status(401).json({ msg: 'Unauthorized: No user found in token' });
  }

  try {
    const newTask = new Task({
      user: req.user.id,
      title,
      description,
      dueDate,
      priority,
      status,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error('Error creating task:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};
export const updateTask = async (req, res) => {
  const { title, description, dueDate, priority, status } = req.body;

  try {
    let task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, priority, status },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id });
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};
