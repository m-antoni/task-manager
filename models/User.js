const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    archive: {
        type: Boolean,
        required: true,
        default: false,
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });



// Generate Authentication Token
userSchema.methods.generateAuthToken = async function() {
    
    const user = this
    // Note: set in seconds to expire
    const token = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { 
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN)
    }); 

    return token;
}

// static function for login user
userSchema.statics.findByCredentials = async function (email, password) {

    const user = await this.findOne({ email });
    const status = 401;

    // check user
    if(!user){
        return status;
    }

    // check password 
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return status;
    }

    return user;
}



// Fire before save to collection
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