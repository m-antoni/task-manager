const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {

    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET), (err, decodedToken) => {
            if(err){
                console.log(err);
                res.redirect('/');
            } 
            else{
                console.log(decodedToken)
                req.user = decodedToken.user
                next();
            }
        }
        next();
    }
    else{
        res.redirect('/');
    }
}

module.exports = { auth };