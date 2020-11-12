const User = require('../models/User');

// handle Errors 
const handleError = (err) => {
    // console.log(err.message, err.code);
    let errors = { name: '', email: '', password: '', signin: '' };

    // sign in error
    if(err.message == 'unauthorized'){
        errors.signin = 'UnAuthorized Attempt to Sign In';
        return errors;
    }
    
    // duplicate error code
    if(err.code === 11000){
        errors.email = 'Email is already taken';
        return errors;
    }

    // validation errors check
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).map(({properties}) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}


// Create User
const createUser = async (req, res) => {
    
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        // for production
        // res.cookie('jwt', token, { secure: true, maxAge: process.env.JWT_EXPIRES_IN * 1000 }) // https only ,set in milliseconds
        
        // uncomment for dev
        res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.JWT_EXPIRES_IN * 1000 }) // set in milliseconds

        res.status(201).send({ user: user._id});
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({errors});
    }
}

// Sign in user credentials
const signInUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();

        // for production
        // res.cookie('jwt', token, { secure: true, maxAge: process.env.JWT_EXPIRES_IN * 1000 }) // https only ,set in milliseconds
        
        // uncomment for dev
        res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.JWT_EXPIRES_IN * 1000 }) // set in milliseconds
        res.status(200).send({ user: user._id });

    } catch (err) {
        const errors = handleError(err);
        console.log(err)
        res.status(400).json({errors});
    }
   
}


// Sign In page
const signInPage = (req, res) => {

    const data = {
        title: 'Sign In',
    }

    res.render('signin', data);
}

// Sign Up page
const signUpPage = (req, res) => {

    const data = {
        title: 'Sign Up',
    }

    res.render('signup', data);
}


module.exports =  {
    signInPage,
    signUpPage,
    createUser,
    signInUser
}