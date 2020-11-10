const User = require('../models/User');


// handle Errors 
const handleError = (err) => {
    // console.log(err.message, err.code);
    let errors = { name: '', email: '', password: '' };

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
        res.status(201).send(user)
    } catch (err) {
        const errors = handleError(err);
        res.status(400).json({errors});
    }
}

// Get User
const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (e) {
        res.status(400).send();
    }
}

// Get Single User
const getSingleUser = async (req, res) => {
    const _id = req.params.id;

    try {
        const user = await User.findById(_id);

        if(!user){
            return res.status(400).send();
        }

        res.send(user);

    } catch (e) {
        res.status(400).send(e);
    }
}

// Update Single User
const updateUser = async (req, res) => {

    const _id = req.params.id;
    const body = req.body;
    // check params
    const updateParams = Object.keys(req.body);
    const allowedParams = ['name', 'phone', 'email', 'password'];
    const isValidParams = updateParams.every(update => allowedParams.includes(update));
    
    if(!isValidParams){
        return res.status(400).send({ message: 'Updates are not allowed.' });
    }

    try {
        
        const user = await User.findByIdAndUpdate(_id, body);

        if(!user){
            return res.status(400).send();
        }

        res.send(user)

    } catch (e) {
        res.status(400).send();
    }
}

// Archive User
const archiveUser =  async (req, res) => {
    
    const _id = req.params.id;
    const archive = { archive: true };
    try {
        const user = await User.findByIdAndUpdate(_id, archive, { new: true, runValidators: true });

        if(!user){
            return res.status(400).send({ error: 'Something went wrong' })
        }

        res.send(user);
    } catch (e) {
        res.status(400).send();
    }
}

// Delete Many  Note: DELETE ALL
const deleteMany = async (req, res) => {
    try {
        await User.deleteMany({});
        res.status(200).send({message: 'Deleted success all the data.'})
    } catch (e) {
        res.status(400).send({ message: 'Failed to delete all the data.' })
    }
}


module.exports = { createUser, getUsers, getSingleUser, updateUser, archiveUser, deleteMany }