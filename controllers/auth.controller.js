const User = require('../models/User');
const port = process.env.PORT;
const { userSchema, authSchema } = require('../helpers/validationSchema');


// handle Errors 
const handleError = (err) => {
    // console.log(err.message, err.code);
    let errors = { name: '', email: '', password: '', signin: '' };

    // sign in error
    if(err.message == 'unauthorized'){
        errors.signin = 'UnAuthorized Attempt to Sign In';
        return errors;
    }
    
    return errors;
}



// Create User
const createUser = async (req, res) => {

    const data = {};
    const params = req.body

    try {

        const { error } = userSchema.validate(params, { abortEarly: false });
        const errorsArr = [];
        if(error) 
        {
            error.details.map(err => errorsArr.push(err.message))
            data['errors'] = errorsArr;
            return res.status(422).send(data)
        }
        
        const emailExists = await User.findOne({ email: params.email });
        if(emailExists) 
        {
            data['errors'] = '\"Email\" is already taken';
            return res.status(422).send(data);
        }

        const user = new User(params);
        await user.save();
        const token = await user.generateAuthToken();

        if(port == '5000')
        {
            // development
            res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.JWT_EXPIRES_IN * 1000 }) // set in milliseconds
        }
        else
        {
            // production
            res.cookie('jwt', token, { secure: true, maxAge: process.env.JWT_EXPIRES_IN * 1000 }) // https only ,set in milliseconds
        }

        res.status(201).send({ user: user._id, token: token});

    } catch (err) {
        data['errors'] = 'Somethinng went wrong';
        console.log(err)
        res.status(500).send(data);
    }
}

// Sign in user credentials
const signInUser = async (req, res) => {

    const params = req.body;
    const data = {};

    try {
        const { error } = authSchema.validate(params, { abortEarly: false });
        const errorArr = [];
        if(error)
        {
            error.details.map(err => errorArr.push(err.message));
            data['errors'] = errorArr;
            return res.status(422).send(data);
        }

        const user = await User.findByCredentials(params.email, params.password);
        const token = await user.generateAuthToken();

        // if(port == '5000')
        // {
        //     // development
        //     res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.JWT_EXPIRES_IN * 1000 }) // set in milliseconds
        // } else 
        // {
        //     // production
        //     res.cookie('jwt', token, { secure: true, maxAge: process.env.JWT_EXPIRES_IN * 1000 }) // https only ,set in milliseconds
        // }
            // development
            res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.JWT_EXPIRES_IN * 1000 }) // set in milliseconds
        res.status(200).send({ user: user._id });

    } catch (err) {
        if(err.message == 'unauthorized'){
            data['errors'] = err.message;
            res.status(422).json(data);
        }
        res.status(400).send();
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