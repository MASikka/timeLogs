const passport = require('passport');
const User = require('../models/user');
const Log = require('../models/logs');

exports.getMainPage = (req,res)=>{
    res.render('home');
}

exports.getRegisterPage = (req,res)=>{
    res.render('register');
}

exports.getLoginPage = (req,res)=>{
    res.render('login');
}

exports.postRegister = (req,res)=>{
    User.register({username: req.body.username}, req.body.password, (error,user)=>{
        if(error){
            console.log(error);
            res.redirect('/register');
        }else{
            passport.authenticate('local')(req,res, ()=>{
                res.render('/logs');
            });
        }
    });
}

exports.postLogin = (req,res) =>{
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });
    req.login(user, (error)=>{
        if(error){
            console.log(error);
            res.redirect('/login');
        }else{
            passport.authenticate('local')(req,res, ()=>{
                res.redirect('/logs');
            });    
        
    }})
}

exports.getLogs = (req,res)=>{
    if(req.isAuthenticated()){
        let current = new Date();
        let cDate =current.getDate()  + '/' + (current.getMonth() + 1) + '/' +current.getFullYear();
        cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
        dateTime = cDate + ' ' + cTime;
        const newLog = new Log(dateTime);        
        newLog.saveLog();
        Log.fetchLogs(items => {
        res.render('logs', {logsDisplay: items});
    }); 
    }else{
        res.redirect('/login');
    }
}


exports.getLogout = (req,res)=>{
    req.logout();
    res.redirect('/');
}