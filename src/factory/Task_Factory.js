
const Task = require('../model/mysql/Task')
const sendResponse = require('../utils/Response')

/** Handler - to add new task */
exports.addNewTask = async (request, h) => {
    try {
        console.log('Came inside addNewTask')
        const data = JSON.parse(JSON.stringify(request.payload))
        const result = await Task.createNewTask(data)
        if (result == true) {
            return sendResponse(true, 200, 'created', 'New Task added', null)
        } else {
            return sendResponse(true, 500, 'database_server_error', 'Database Server Error', null)
        }
    } catch (e) {
        console.log(e)
        return sendResponse(false, 503, 'internal_server_error', 'Internal Server Error', null)
    }

}

/** Handler - for updating task details */
exports.updateNewTask = async (request, h) => {
    try {
        const data = JSON.parse(JSON.stringify(request.payload))
        const result = await Task.updateTask(data)
        if (result == true) {
            return sendResponse(true, 200, 'updated', 'Task Updated successfully', null)
        } else {
            return sendResponse(true, 500, 'database_server_error', 'Database Server Error', null)
        }
    } catch (e) {
        console.log(e)
        return sendResponse(false, 503, 'internal_server_error', 'Internal Server Error', null)
    }
}

/** Handler - for deleting task */
exports.deleteTask = async (request, h) => {
    try {
        const _id = JSON.parse(JSON.stringify(request.payload.task_id))
        const result = await Task.deleteTask(_id)
        if (result == true) {
            return sendResponse(true, 200, 'deleted', 'Task Deleted Successfully', null)
        } else {
            return sendResponse(true, 500, 'database_server_error', 'Database Server Error', null)
        }
    } catch (e) {
        return sendResponse(false, 503, 'internal_server_error', 'Internal Server Error', null)
    }
}

/** Handler - to get all tasks details */
exports.getAllTasks = async (request, h) => {
    try {

        const result = await Task.getAllTasks()
        if (result) {
            return sendResponse(true, 200, 'found', 'Success - Task Data fetched sucessfully !!!', result)
        } else {
            return sendResponse(true, 500, 'database_server_error', 'Database Server Error', null)
        }
    } catch (e) {
        return sendResponse(false, 503, 'internal_server_error', 'Internal Server Error', null)
    }
}