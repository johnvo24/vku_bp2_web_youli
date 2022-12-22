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

    scheduleController.createTask = async (req, res) => {
        await ScheduleModel().createTask(req.body)
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

    scheduleController.createTaskCategory = async (req, res) => {
        await ScheduleModel().createTaskCategory(req.body)
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

    scheduleController.deleteTaskCategory = async (req, res) => {
        await ScheduleModel().deleteTaskCategory(req.body)
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

    scheduleController.updateTaskCategory = async (req, res) => {
        await ScheduleModel().updateTaskCategory(req.body)
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

    scheduleController.getTaskCategory = async (req, res) => {
        await ScheduleModel().getTaskCategory(req.body)
            .then(r => {
                res.status(200)
                res.send({data: r})
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