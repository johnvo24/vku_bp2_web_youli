const User = require('../model/User')
const user = new User()

async function updateUserInf(req, res) {
    await user.updateUserInf(req.body, req.file)
        .then(() => {
            user.getUserInformationById(req.body.user_id)
                .then(response => {
                    res.status(200)
                    res.send(response)
                })
                .catch(err => {
                    res.status(500)
                    res.send(err)
                })
        })
        .catch(err => {
            res.status(500)
            res.send(err)
        })
}

module.exports = {updateUserInf}