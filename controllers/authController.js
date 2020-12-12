const User = require('../models/User');
const port = process.env.PORT;
const { userSchema, authSchema } = require('../helpers/validationSchema');

// global variable

// Create User
const createUser = async (req, res) => {

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
        if(process.env.NODE_ENV === 'production'){
            options.secure = true;
        }

        res.cookie('jwt', token, options) // set in milliseconds
        res.status(201).json({ user: user._id, token: token, redirect: '/home' });

    } catch (err) {
        console.log(err)
        res.render('signup', { errors: ['Something went wrong'] });
    }
}



// Sign in user credentials
const signInUser = async (req, res) => {
    
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
        const options = { httpOnly: true, maxAge: process.env.JWT_EXPIRES_IN * 1000 }

        // for production
        if(process.env.NODE_ENV === 'production'){
            options.secure = true;
        }

        res.cookie('jwt', token, options) // set in milliseconds
        res.status(200).json({ redirect: '/home' });

    } catch (err) {
        console.log(err)
    }  
}


const signOut = (req, res) => {
    // console.log(res)
    res.cookie('jwt', '', { expires: new Date() });
    res.redirect('/');
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
    signInUser,
    signOut
}