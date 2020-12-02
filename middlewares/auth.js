const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = (req, res, next) => {

    const token = req.cookies.token;

    //verify token which is in cookie value
    if(token){
        jwt.verify(token, process.env.JWT_SECRET), (err, decodedToken) => {
            if(err){
                console.log(err.message);
                res.redirect('/');
            } 
            else{
                req.user = decodedToken.user
                next();
            }
        }
    }
    else{
        res.redirect('/');
    }
}

module.exports = auth;