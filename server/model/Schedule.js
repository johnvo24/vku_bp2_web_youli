const db = require("../config/db");


const ScheduleModel = () => {
    const scheduleModel = {};

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

    return scheduleModel;
}

module.exports = ScheduleModel;