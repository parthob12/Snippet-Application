// 1. run: npm install
// 2. use: the thunder client JSON file and import into Thunder Client collections
// 3. run: npm run start
const express = require('express')
const cors = require('cors')

const mongo = require('./mongo/index.js')

// call the express function which create the express application
// this allows us to use the full functionality of our express application
const app = express()

const PORT = 8080

// options object to expose header to the client
const options = { exposedHeaders: ['Authorization'] };

// middleware to enable cors
app.use(cors(options));

// parses JSON body in POST and/or PUT request
app.use(express.json())

// require in our resource routes
const users = require('./api/users/user.routes.js')
const snippets = require('./api/snippets/snippet.routes.js')
const bookmarks = require('./api/bookmarks/bookmark.routes.js')

// mount the resource routes to our express app
app.use('/users', users)
app.use('/snippets', snippets)
app.use('/bookmarks', bookmarks)

// start the express server

app.listen(PORT, async () => {
    console.log(`Server is listening on port ${PORT}`)
    await mongo.connectDB()
});
