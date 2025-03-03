const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

passport.use(new localStrategy(async (USERNAME,password,done)=>{
    try{
        // console.log('Request credentials: ',USERNAME,password);
        const user = await Person.findOne({username: USERNAME});
        if(!user){
            return done(null,false,{message: 'Incorrect username'});
        }
        const isPassword = await user.comparePassword(password) ? true : false;
        if(isPassword){
            return done(null,user);
        }
        else{
            return done(null,false,{message:"Incorrect password"});
        }
    }catch(err){
        return done(err);
    }
}));

module.exports = passport;