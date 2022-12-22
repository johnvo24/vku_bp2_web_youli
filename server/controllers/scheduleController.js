const ScheduleModel = require("../model/Schedule");


const scheduleController = () => {
    const scheduleController = {};

    scheduleController.index = async (req, res) => {
        res.send(await ScheduleModel().getDateTask(req.params.user_id, req.params.date));
    }
    scheduleController.getTaskData = async (req, res) => {
        if(req.params.type === "1") {
            res.send(await ScheduleModel().getTask(req.params.schedule_id));
        }
        else {
            res.send(await ScheduleModel().getCustomTask(req.params.schedule_id));
        }
    }

    return scheduleController;
}

module.exports = scheduleController;