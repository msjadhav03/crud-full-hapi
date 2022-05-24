/** Controller - to add new task */
exports.addNewTask = {
    validate : require('../validation/Validation').addNewTask,
    description : 'To add new tasks',
    notes : 'All fields are mandatory',
    tags : ['api'],
    auth : 'jwt',
    handler : require('../factory/Task_Factory').addNewTask
}

/** Controller - for updating task details */
exports.updateTask = {
    validate : require('../validation/Validation').updateTask,
    description : 'To update task details',
    notes : 'task id is madatory',
    tags : ['api'],
    auth : 'jwt',
    handler : require('../factory/Task_Factory').updateNewTask
}

/** Controller - for deleting task */
exports.deleteTask = {
    validate : require('../validation/Validation').deleteTask,
    description : 'To delete task',
    notes : 'task id is madatory',
    tags : ['api'],
    auth : 'jwt',
    handler : require('../factory/Task_Factory').deleteTask
}

/** Controller - to get all tasks details */
exports.getAllTasks = {
    description : 'To get list of all tasks',
    notes : 'No field mandatory',
    tags : ['api'],
    auth : 'jwt',
    handler : require('../factory/Task_Factory').getAllTasks
}