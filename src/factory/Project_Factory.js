
const Project = require('../model/mysql/Project')
const sendResponse = require('../utils/Response')

/** Handler - for creating new project */
exports.createNewProject = async (request, h) => {
    try {
        const data = JSON.parse(JSON.stringify(request.payload))
        const result = await Project.addProject(data)
        if (result == true) {
            return sendResponse(true, 200, 'created', 'New project added', null)
        } else {
            return sendResponse(true, 500, 'database_server_error', 'Database Server Error', null)
        }
    } catch (e) {
        console.log(e)
        return sendResponse(false, 503, 'internal_server_error', 'Internal Server Error', null)
    }
}

/** Handler - for updating project details */
exports.updateProject = async (request, h) => {
    try {
        const data = JSON.parse(JSON.stringify(request.payload))
        const result = await Project.updateProject(data)
        if (result == true) {
            return sendResponse(true, 200, 'updated', 'Project Updated', null)
        } else {
            return sendResponse(true, 500, 'database_server_error', 'Database Server Error', null)
        }
    } catch (e) {
        console.log(e)
        return sendResponse(false, 503, 'internal_server_error', 'Internal Server Error', null)
    }

}

/** Handler - for deleting project */
exports.deleteProject = async (request, h) => {
    try {
        const id = JSON.parse(JSON.stringify(request.payload._id))
        const result = await Project.deleteProject(id)
        if (result == true) {
            return sendResponse(true, 200, 'deleted', 'Project Deleted', null)
        } else {
            return sendResponse(true, 500, 'database_server_error', 'Database Server Error', null)
        }
    } catch (e) {
        console.log(e)
        return sendResponse(false, 503, 'internal_server_error', 'Internal Server Error', null)
    }
}

/** Handler - to get all project details */
exports.getAllProjects = async (request, h) => {
    try {
        const result = await Project.getAllProjects()
        if (result) {
            return sendResponse(true, 200, 'found', 'Project Data fetched successfully', result)
        } else {
            return sendResponse(true, 500, 'database_server_error', 'Database Server Error', null)
        }
    } catch (e) {
        console.log(e)
        return sendResponse(false, 503, 'internal_server_error', 'Internal Server Error', null)
    }
}