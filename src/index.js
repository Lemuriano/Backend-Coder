const express = require('express')
const router = require('./router')
const handlebars = require('express-handlebars')

const port = 8080

const app = express()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))

router(app)

module.exports = app
