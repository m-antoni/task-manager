const { boolean } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
    },
    user_id: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


const Task = mongoose.model('Task', taskSchema);


module.exports = Task;