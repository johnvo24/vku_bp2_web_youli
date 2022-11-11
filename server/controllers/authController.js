let User = require('../model/User')
const user = new User()

// check out if username is in db, then return object
async function checkExist(value) {
    return await user.getUserInformation('username', value)
        .then(res => res)
        .catch(err => err)
}

async function getUser(req, res) {
    if(req.body.username.trim() === '' ) {//|| req.body.userpassword.trim() === '') {
        res.status(409)
        res.send('Empty input is not allowed')
    }

    if(req.body.username.trim() !== req.body.username || req.body.userpassword.trim() !== req.body.userpassword) {
        res.status(409)
        res.send('White space is not allowed')
    }

    const data = await checkExist(req.body.username)
    console.log(data)
    if(data.length === 0) {
        res.status(409)
        res.send('Can not found Username that you inputted')
    }
    // if(data[0].userpassword !== req.body.userpassword) {
    //     res.status(409)
    //     res.send('Password incorrect')
    // }
}

module.exports = getUser