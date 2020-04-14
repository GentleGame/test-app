const express = require('express')
const main = express.Router()
const session = require('express-session')
const Store = session.Store
const MongooseStore = require('mongoose-express-session')(Store)
const passport = require('passport')
const initPassport = require('./configs/passport.config.js')


const auth = (req,res,next) => {
    if(req.isAuthenticated()){
        next()
    }else{
        return res.redirect('/')
    }
}


main.route('/')
.get((req,res,next) => {
    res.end("<h1>Index page</h1>")
})

main.route('/login')
.get((req,res) => {res.send("<form method='post' action='/login'><input type='text' name='email'><input type='text' name='password'><button type='submit'>send</button></form>")})
.post((req,res,next) => {
    passport.authenticate('local', (err, user) => {
        if(err){
            return next(err)
        }
        if(!user){
            return res.send('Укажите правильные данные')
        }
        req.logIn(user, (err) =>{
            if(err){
                return next(err)
            }
            return res.redirect('/admin')
        })
    })(req,res,next)
})


main.route('/logout')
.get((req,res) => {
    req.logOut()
    res.redirect('/')
})


main.route('/admin')
.get(auth, (req,res,next) => {
    res.send('Admin page');
})

// main.route('/*')
// .all((req,res) => {
//     res.status(404).end("<h1>404 Page Not Found</h1>")
// })


module.exports = main