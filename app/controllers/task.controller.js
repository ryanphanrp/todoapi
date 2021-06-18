const mongoose = require('mongoose');
const Task = require('../models/task.model');


/**
 * Get all tasks in collection
 */
module.exports.getAllTasks = (req, res) => {
    Task.find()
        .select('_id task status')
        .then((allTask) => {
            return res.status(200).json({
                success: true,
                message: 'Successfull! A list of all tasks',
                data: allTask,
                count: allTask.length
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Server Error!',
                error: error.message
            });
        })
}


/**
 * Get a single task by @param _id
 */
module.exports.getSingleTask = (req, res) => {
    const id = req.params.taskId;
    Task.findById(id)
        .then((result) => {
            res.status(200).json({
                success: true,
                message: `More on ${result.title}`,
                data: result
            })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Server Error!',
                error: error.message
            });
        });
}


/**
 * Create a new word
 */
module.exports.createTask = (req, res) => {

    // Finding existed word
    Task.find({ task: req.body.task })
        .then((data) => {
            if (data.length) {
                return res.status(409).json({
                    success: false,
                    message: 'This task has been existed in database.',
                })
            }
            // Create task to save
            const task = new Task({
                _id: mongoose.Types.ObjectId(),
                task: req.body.task
            });

            // Return - saving task to database
            return task.save()
                .then((newTask) => {
                    return res.status(201).json({
                        success: true,
                        message: 'New task has been created successfully!',
                        data: newTask
                    });
                })
                .catch((error) => {
                    console.log(error);
                    res.status(500).json({
                        success: false,
                        message: 'Server Error!',
                        error: error.message
                    });
                });
        })
}


/**
 * Update a single task by @param _id
 */
module.exports.updateTask = (req, res) => {
    const id = req.params.taskId;
    const updateData = { task: req.body.task };
    Task.findByIdAndUpdate(id, { $set: updateData }).exec()
        .then(() => {
            res.status(202).json({
                success: true,
                message: 'This task has been updated successfully!',
                data: updateData
            })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Server Error!',
                error: error.message
            });
        });
}


/**
 * Update status task by @param _id
 */
module.exports.updateStatus = (req, res) => {
    const id = req.params.taskId;
    const updateData = { status: req.body.status == "true" };
    Task.findByIdAndUpdate(id, { $set: updateData }).exec()
        .then(() => {
            res.status(202).json({
                success: true,
                message: 'This task has been updated successfully!',
                data: updateData
            })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Server Error!',
                error: error.message
            });
        });
}


/**
 * Delte a single task by @param _id
 */
module.exports.deleteTask = (req, res) => {
    const id = req.params.taskId;
    Task.findByIdAndRemove(id).exec()
        .then(() => {
            res.status(200).json({
                success: true,
                message: 'This task has been deleted successfully!',
            })
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Server Error!',
                error: error.message
            });
        });
}