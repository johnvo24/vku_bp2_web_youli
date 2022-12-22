const db = require("../config/db");


const ScheduleModel = () => {
    const scheduleModel = {};
    //get task per day
    scheduleModel.getDateTask = async (user_id, date) => {
        let dateTask = [];
        dateTask = await new Promise((resolve, reject) => {
            let sql = "SELECT * from schedule WHERE user_id=? and (task_date=? or task_loop='infinity') ORDER BY task_from ASC";
            db.query(
                sql,
                [user_id, date],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            )
        })
            .then((result) => dateTask = result)
            .catch((err) => console.log(err));

        return dateTask;
    }

    // get task by id
    scheduleModel.getTask = async (schedule_id) => {
        let taskData = [];
        taskData = await new Promise((resolve, reject) => {
            let sql = "SELECT * from schedule S "
                + "JOIN task T on S.task_id = T.task_id "
                + "WHERE schedule_id=?";
            db.query(
                sql,
                [schedule_id],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result[0]);
                }
            )
        })
            .then((result) => taskData = result)
            .catch((err) => console.log(err));

        return taskData;
    }

    // get task by c_task
    scheduleModel.getCustomTask = async (schedule_id) => {
        let customTaskData = [];
        customTaskData = await new Promise((resolve, reject) => {
            let sql = "SELECT * from schedule S "
                + "JOIN custom_task CT on S.c_task_id = CT.task_id "
                + "WHERE schedule_id=?";
            db.query(
                sql,
                [schedule_id],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result[0]);
                }
            )
        })
            .then((result) => customTaskData = result)
            .catch((err) => console.log(err));

        return customTaskData;
    }

    scheduleModel.createTask = async data => {
        return await new Promise((resolve, reject) => {
            db.query('insert into ' +
                'schedule(user_id, task_id, c_task_id, task_from, task_to, task_date, task_loop, task_note, task_link, task_color, task_text_color) ' +
                'values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [data.user_id, data.task_id, data.c_task_id, data.task_from, data.task_to,
                    data.task_date, data.task_loop, data?.task_note, data?.task_link,
                    data?.task_color, data.task_text_color],
                (err, result) => {
                    if (err) reject(err)
                    resolve()
                })
        })
    }

    scheduleModel.createTaskCategory = async data => {
        return await new Promise((resolve, reject) => {
            db.query('insert into ' +
                'custom_task ' +
                'values (?, ?, ?)',
                [data.user_id, data.task_name, data.task_description],
                (err, result) => {
                    if (err) reject(err)
                    resolve()
                })
        })
    }

    scheduleModel.deleteTask = async data => {
        return await new Promise((resolve, reject) => {
            db.query('delete from ' +
                'schedule ' +
                'where schedule_id = ?',
                [data.schedule_id],
                (err, result) => {
                    if (err) reject(err)
                    resolve()
                })
        })
    }

    scheduleModel.deleteTaskCategory = async data => {
        return await new Promise((resolve, reject) => {
            db.query('delete from ' +
                'custom_task ' +
                'where task_id = ?',
                [data.task_id],
                (err, result) => {
                    if (err) reject(err)
                    resolve()
                })
        })
    }

    scheduleModel.updateTask = async data => {
        return await new Promise((resolve, reject) => {
            db.query('update schedule ' +
                'set task_from = ?, task_to = ?, task_date = ?, task_loop = ?, task_note = ?, task_link = ?, task_color = ?, task_text_color = ? ' +
                'where schedule_id = ?',
                [data.task_from, data.task_to, data.date, data.task_loop,
                    data.task_note, data.task_link, data.task_color,
                    data.task_text_color, data.schedule_id],
                (err, result) => {
                    if (err) reject(err)
                    resolve()
                })
        })
    }

    scheduleModel.updateTaskCategory = async data => {
        return await new Promise((resolve, reject) => {
            db.query('update custom_task ' +
                'set task_name = ?, task_description = ? ' +
                'where task_id = ?',
                [data.task_name, data.task_description, data.task_id],
                (err, result) => {
                    if (err) reject(err)
                    resolve()
                })
        })
    }

    // by user_id
    scheduleModel.getTaskCategory = async data => {
        return await new Promise((resolve, reject) => {
            db.query('select * from custom_task ' +
                'where user_id = ?',
                [data.user_id],
                (err, result) => {
                    if (err) reject(err)
                    resolve(result)
                })
        })
    }

    return scheduleModel;
}

module.exports = ScheduleModel;