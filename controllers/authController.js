const User = require('../models/User');
const port = process.env.PORT;
const { userSchema, authSchema } = require('../helpers/validationSchema');
require('dotenv').config();

// Create User
const registerPost = async (req, res) => {

    const error_msg = [];
    const params = req.body;

    if(params.password != params.confirm_password){
        error_msg.push('Password and Confirm Password do not match');
        return res.status(404).json({ errors: error_msg });
    }

    const { error } = userSchema.validate(params, { abortEarly: false });

    if(error) {
        error.details.map(err => error_msg.push(err.message))
        return res.status(404).json({ errors: error_msg });
    }
    
    const emailExists = await User.findOne({ email: params.email });
    if(emailExists) {
        error_msg.push(`${params.email} is already taken`);
        return res.status(404).json({ errors: error_msg });
    }

    try {

        const user = new User(params);
        await user.save();
        const token = await user.generateAuthToken();

        const options = { httpOnly: true, maxAge: process.env.JWT_EXPIRES_IN * 1000 };

        // for production
        if(process.env.NODE_ENV == 'production'){
            options.secure = true;
        }

        res.cookie('jwt', token, options) // set in milliseconds
        res.status(201).json({ user: user._id, token: token });

    } catch (err) {
        console.log(err)
    }
}



// Sign in user credentials
const loginPost = async (req, res) => {
    
    const error_msg = [];
    const params = req.body;

    const { error } = authSchema.validate(params, { abortEarly: false });

    if(error){
        error.details.map(err => error_msg.push(err.message));
        return res.status(404).json({ errors: error_msg });
    }

    try {

        const user = await User.findByCredentials(params.email, params.password);

        if(user == 401){
            error_msg.push('Incorrect email or password.')
            return res.status(404).json({ errors: error_msg });
        }

        const token = await user.generateAuthToken();
        const options = { httpOnly: true, maxAge: process.env.JWT_EXPIRES_IN * 1000 }; // set in milliseconds

        // for production
        if(process.env.NODE_ENV == 'production'){
            options.secure = true;
        }

        res.cookie('jwt', token, options) 
        res.status(200).json({ user: req.user });

    } catch (err) {
        console.log(err)
    }  
}


const logOut = (req, res) => {
    console.log(res.cookie);
    res.cookie('jwt', '', { expires: new Date() });
    res.redirect('/login');
}

// Sign In page
const loginPage = (req, res) => {

    const data = { title: 'Login' }

    res.render('login', data);
}

// Sign Up page
const registerPage = (req, res) => {

    const data = {  title: 'Register' }

    res.render('register', data);
}


module.exports =  { loginPage, registerPage, registerPost, loginPost, logOut };