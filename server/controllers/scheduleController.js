const ScheduleModel = require("../model/Schedule");


const scheduleController = () => {
    const scheduleController = {};

    scheduleController.index = async (req, res) => {
        res.send(await ScheduleModel().getDateTask(req.params.user_id, req.params.date));
    }

    scheduleController.getTaskData = async (req, res) => {
        res.send(await ScheduleModel().getTask(req.params.schedule_id));
    }

    scheduleController.createTask = async (req, res) => {
        await ScheduleModel().createTask(req.body)
            .then(() => {
                res.status(200)
                res.send("Created task successfully")
            })
            .catch(err => {
                res.status(500)
                res.send(err)
                console.log(err)
            })
    }
    scheduleController.deleteTask = async (req, res) => {
        await ScheduleModel().deleteTask(req.body)
            .then(() => {
                res.status(200)
                res.send()
            })
            .catch(err => {
                res.status(500)
                res.send(err)
                console.log(err)
            })
    }
    scheduleController.updateTask = async (req, res) => {
        await ScheduleModel().updateTask(req.body)
            .then(() => {
                res.status(200)
                res.send()
            })
            .catch(err => {
                res.status(500)
                res.send(err)
                console.log(err)
            })
    }
    return scheduleController;
}

module.exports = scheduleController;