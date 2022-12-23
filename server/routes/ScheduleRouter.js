const express = require('express');
const scheduleController = require('../controllers/scheduleController');
const scheduleRouter = express.Router();

scheduleRouter.get('/index/:user_id/:date', scheduleController().index);
scheduleRouter.get('/get_task/:schedule_id/:type', scheduleController().getTaskData);
scheduleRouter.post('/create_task', scheduleController().createTask)
scheduleRouter.post('/create_task_category', scheduleController().createTaskCategory)
scheduleRouter.post('/delete_task', scheduleController().deleteTask)
scheduleRouter.post('/delete_task_category', scheduleController().deleteTaskCategory)
scheduleRouter.post('/update_task', scheduleController().updateTask)
scheduleRouter.post('/update_task_category', scheduleController().updateTaskCategory)
scheduleRouter.post('/get_task_category', scheduleController().getTaskCategory)

module.exports = scheduleRouter;