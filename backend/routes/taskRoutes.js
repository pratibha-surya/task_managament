
import express from 'express';

import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../controller/task.controller.js';
import auth from '../middlware/auth.js';

const router = express.Router();

router.get('/', auth, getTasks);
router.get('/:id', auth, getTaskById);
router.post('/', auth, createTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

export default router;
