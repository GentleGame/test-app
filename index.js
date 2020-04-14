const express = require('express')
const session = require('express-session')
const Store = session.Store
const MongooseStore = require('mongoose-express-session')(Store)
const passport = require('passport')
const mongoose = require('mongoose')
const morgan = require('morgan')
const mainRouter = require('./routers/main')
require('dotenv').config()

console.log(process.env.MONGOOSE)
mongoose.connect(process.env.MONGOOSE).then(()=>{
    console.log('success connection to DB')
}).catch((e) => {
    console.log(e)
})

const app = express()
const port = 4000;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(
    session({
        secret: 'ihatetulgu',
        store: new MongooseStore({connection: mongoose}),
        cookie:{
            path: '/',
            httpOnly: true,
            maxAge: 60*60*1000
        },
        resave: false,
        saveUninitialized: false
    })
)
require('./config.passport')
app.use(passport.initialize())
app.use(passport.session())

app.use(mainRouter)

app.listen(port, console.log('Server listening on ', port))