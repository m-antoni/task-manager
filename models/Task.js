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
    completed: {
        type: Number,
        default: 0
    },
    archive: {
        type: Number,
        required: true,
        default: 0,
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });



const Task = mongoose.model('Task', taskSchema);


module.exports = Task;