
import express from 'express';

import { createTask, deleteTask, getDashboardData, getTaskById, getTasks, updateTask } from '../controller/task.controller.js';
import auth from '../middlware/auth.js';

const router = express.Router();

router.get('/', auth, getTasks);
router.get('/:id', auth, getTaskById);
router.post('/', auth, createTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);
router.get('/dashboard',auth,  getDashboardData);

export default router;
