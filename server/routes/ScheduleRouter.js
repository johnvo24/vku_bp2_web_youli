const express = require('express');
const scheduleController = require('../controllers/scheduleController');
const scheduleRouter = express.Router();

scheduleRouter.get('/index/:user_id/:date', scheduleController().index);
scheduleRouter.get('/get_task/:schedule_id/:type', scheduleController().getTaskData);

module.exports = scheduleRouter;