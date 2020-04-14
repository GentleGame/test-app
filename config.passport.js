const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const userDB = {
    id: 1,
    email: 'fast@kek.com',
    password: '123'
}

passport.serializeUser((user,done) => {
    console.log(`serialize`, user)
    done(null, user.id)
})

passport.deserializeUser((id,done) => {
    console.log("deserialize ", id)
    const user = (userDB.id === id) ? userDB : false;
    done(null, user)
})

passport.use(
    new LocalStrategy({usernameField: 'email'},(email, password, done) => {
        if(email === userDB.email && password === userDB.password){
            return done(null, userDB)
        }else{
            return done(null, false)
        }
    })
)