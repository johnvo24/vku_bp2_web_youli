const express = require('express')
const NoteBoxModel = require('./model/NoteBox')
const routes = require('./routes')
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

routes(app)