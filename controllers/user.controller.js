const User = require('../models/User');

// Create User
const createUser = async (req, res) => {
    
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send();
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
        res.status(400).send();
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
        const user = await User.findByIdAndUpdate(_id, body, { new: true, runValidators: true });

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

module.exports = { createUser, getUsers, getSingleUser, updateUser, archiveUser }