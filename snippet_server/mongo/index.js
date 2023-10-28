const mongoose = require ('mongoose')
// BUILD THE MONGO URI CONNECTION STRING
const {username, password, projectname} = require('../config.json')
const mongoURL = `mongodb+srv://${username}:${password}@cluster0.ofmqtxz.mongodb.net/${projectname}?retryWrites=true&w=majority`

