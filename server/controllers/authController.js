let User = require('../model/User')
const user = new User()

// check out if username is in db, then return object
async function checkExist(value) {
    return await user.getUserInformation(value)
        .then(res => res)
        .catch(err => err)
}

function checkSpecialCharacters(value) {
    for (let i = 0; i < value.length; ++i)
        if ((value[i] <= 'z' && value[i] >= 'a') || (value[i] <= 'Z' && value[i] >= 'A') || (value[i] >= '0' && value[i] <= '9') || value[i] === '@' || value[i] === '.') {
        } else
            return true
    return false
}

function isGmail(value) {
    let dot = 0, at = 0
    for (let i = 0; i < value.length; ++i) {
        dot += value[i] === '.' ? 1 : 0
        at += value[i] === '@' ? 1 : 0
    }
    return dot >= 1 && at === 1;
}

async function getUser(req, res) {
    if (req.body.username.trim() === '' || req.body.userpassword.trim() === '') {
        res.status(409)
        res.send('Empty input is not allowed')
    } else if (req.body.username.trim() !== req.body.username || req.body.userpassword.trim() !== req.body.userpassword) {
        res.status(409)
        res.send('White space is not allowed')
    } else if (checkSpecialCharacters(req.body.username)) {
        res.status(409)
        res.send('Special characters is not allowed')
    } else {
        const data = await checkExist(req.body.username)
        if (data.length === 0) {
            res.status(409)
            res.send('Can not found Username that you inputted')
        } else if (data[0].userpassword !== req.body.userpassword) {
            res.status(409)
            res.send('Password incorrect')
        } else {
            res.send(data[0])
        }
    }
}

async function setUser(req, res) {
    if (req.body.username.trim() === '' || req.body.userpassword.trim() === '' || req.body.display_name.trim() === '') {
        res.status(409)
        res.send('Empty input is not allowed')
    } else if (req.body.username.trim() !== req.body.username || req.body.userpassword.trim() !== req.body.userpassword) {
        res.status(409)
        res.send('White space is not allowed')
    } else if (checkSpecialCharacters(req.body.username)) {
        res.status(409)
        res.send('Special characters is not allowed')
    } else if (req.body.userpassword.length < 6) {
        res.status(409)
        res.send('Password is too weak')
    } else {
        const data = await checkExist(req.body.username)
        if (data.length !== 0) {
            res.status(409)
            res.send('This username has been taken')
        } else {

            await user.setUserInformation(
                req.body.username, req.body.userpassword, req.body.display_name,
                isGmail(req.body.username) ? req.body.username : '',    // set gmail
                isGmail(req.body.username) ? req.body.avatar : ''       // set avatar
            )
                .then(res => res)
                .catch(err => err)
            res.status(200)
            res.send('Register completely')
        }
    }
}

module.exports = {getUser, setUser}

