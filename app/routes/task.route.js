const express = require('express');
const Task = require('../models/task.model');
const controller = require('../controllers/task.controller');


/** Initial */
const router = express.Router();


/** Routes */
router.get('/', controller.getAllTasks);
router.post('/', controller.createTask);
router.get('/:taskId', controller.getSingleTask);
router.put('/:taskId/task', controller.updateTask);
router.put('/:taskId/status', controller.updateStatus);
router.delete('/:taskId', controller.deleteTask);

module.exports = router;