const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {

    const token = req.cookies.jwt;

    if(!token){
        res.redirect('/');
    }

    try {

        if(token)
        {
            let decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded);
            next();
        }
    
    } catch(e) {
        if (e instanceof jwt.JsonWebTokenError) {
			// if the error thrown is because the JWT is unauthorized, return a 401 error
            // return res.status(401).end()
            console.log(e)
            res.redirect('/');
		}
    }

}

module.exports = { auth };