const Login = require('../models/loginModel')

exports.index = (req, res, next) => {
    res.render('login')
}

exports.send = async (req, res) =>{
    try {
        const login = new Login(req.body);
        await login.loginUser();

        if(login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function(){
            return res.redirect('/register/index');  
            });
            return;
        }

        req.flash('success', 'Acesso concedido');
        req.session.user = login.user;
        req.session.save(function() {
            return res.redirect('/login/loged');  
        });
    } catch (error) {
        console.log(error);
        return res.render('404');
    }
}

exports.logout = (req, res) =>{
    req.session.destroy();
    res.redirect('/')
}

exports.loged = (req, res, next) => {
    res.render('loged');
}