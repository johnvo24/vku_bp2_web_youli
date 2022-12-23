const express = require('express');
const scheduleController = require('../controllers/scheduleController');
const scheduleRouter = express.Router();

scheduleRouter.get('/index/:user_id/:date', scheduleController().index);
scheduleRouter.get('/get_task/:schedule_id', scheduleController().getTaskData);
scheduleRouter.post('/create_task', scheduleController().createTask)
scheduleRouter.post('/delete_task', scheduleController().deleteTask)
scheduleRouter.post('/update_task', scheduleController().updateTask)

module.exports = scheduleRouter;