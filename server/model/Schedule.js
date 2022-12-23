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
            let sql = "SELECT * from schedule "
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

    scheduleModel.createTask = async data => {
        return await new Promise((resolve, reject) => {
            db.query('insert into ' +
                'schedule(user_id, task_name, task_from, task_to, task_date, task_loop, task_note, task_link, task_color, task_text_color) ' +
                'values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [data.user_id, data.task_name, data.task_from, data.task_to,
                    data.task_date, data.task_loop, data?.task_note, data?.task_link,
                    data?.task_color, data.task_text_color],
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

    return scheduleModel;
}

module.exports = ScheduleModel;