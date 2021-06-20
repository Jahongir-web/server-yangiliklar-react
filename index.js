const express = require('express')
const helmet = require("helmet")
var cors = require('cors')
const fileUpload = require('express-fileupload')


// load routes
const newsRoutes = require('./src/routes/news')
const adminRoutes = require('./src/routes/admin')
const userRoutes = require('./src/routes/user')

// defines
const PORT = process.env.PORT || 4001

const app = express()

// middlevare
app.use(express.urlencoded({ extended: true, }))
app.use(fileUpload())
app.use(helmet())
app.use(express.json())
app.use(express.static('static'))
app.use(cors())


// routes
app.use(newsRoutes)
app.use(adminRoutes)
app.use(userRoutes)


app.listen(PORT, () => console.log(PORT))