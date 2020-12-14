const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {

    const token = req.cookies.jwt;

    if(!token){
        res.redirect('/login');
    }

    try {

        if(token)
        {
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decoded);
            req.authID = decoded._id;
            next();
        }
    
    } catch(e) {
        if (e instanceof jwt.JsonWebTokenError) {
			// if the error thrown is because the JWT is unauthorized, return a 401 error
            // return res.status(401).end()
            console.log(e)
            res.redirect('/login');
		}
    }
}


const checkUser = (req, res, next) => {
    
    const token = req.cookies.jwt;

    if(token)
    {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.authID = decoded._id;
        res.locals.authUser = decoded.user;
        next();
    }
    else
    {
        res.locals.authUser = null;
        next()
    }
} 



module.exports = { auth, checkUser };