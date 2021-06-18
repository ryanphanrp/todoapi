const mongoose = require('mongoose');



// Task Schema
const taskSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    task: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Task', taskSchema);