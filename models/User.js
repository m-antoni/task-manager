const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        lowercase: true,
        unique: true,
        trim: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    archive: {
        type: Boolean,
        required: true,
        default: false,
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


// fire after save
// userSchema.post('save', function (doc, next) {
//     // do some code here
//     next();
// })


// fire before save
 userSchema.pre('save', async function (next) {
   
    const user = this;
    const salt = await bcrypt.genSalt();

    // can take advantage if password is updated aswell
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, salt);
    }

    next();
 })



const User = mongoose.model('User', userSchema);


module.exports = User;