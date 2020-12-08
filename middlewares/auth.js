const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {

    const token = req.cookies.jwt;

    console.log(process.env.JWT_SECRET)

    if(token){
        jwt.verify(token, process.env.JWT_SECRET), (err, decodedToken) => {
            if(err){
                // console.log(err.message);
                res.redirect('/');
            } 
            else{
                console.log(decodedToken)
                req.user = decodedToken.user
                next();
            }
        }
    }
    else{
        res.redirect('/');
    }
}

module.exports = { auth };