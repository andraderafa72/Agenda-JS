const Login = require('../models/loginModel')

exports.index = (req, res, next) => {
    res.render('login')
}

exports.send = (req, res) =>{
    // const login = new Login(req.body);
    // login.entrar();

    // if(login.errors.length > 0) {
    //     res.send(login.errors)
    //     return
    // }

    // res.send(login.body);
}