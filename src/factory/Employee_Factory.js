const sendResponse = require("../utils/Response")
const Employee = require('../model/mongodb/Employee')

/** Handler - for creating new employee */
exports.addNewEmployee = async (request, h) => {
    try {
        const data = JSON.parse(JSON.stringify(request.payload))
        const result = await Employee.addNewEmployee(data)
        if (result.result === true) {
            return sendResponse(true, 200, 'success', 'New Employee added', null)
        } else {
            return sendResponse(false, 500, 'failed', 'Failed - employee cannot be added', null)
        }
    } catch (e) {
        return sendResponse(false, 500, 'database_server_error', 'Database server error', null)
    }
}

/** Handler - for deleting employee */
exports.deleteEmployee = async (request, h) => {
    try {
        const id = JSON.parse(JSON.stringify(request.payload.id))
        const result = await Employee.deleteEmployee(id)
        if (result.result == true) {
            return sendResponse(true, 200, 'deleted', 'Deleted - Employee deletion success !!', null)
        } else {
            return sendResponse(false, 500, 'failed', 'Failed - employee cannot be deleted', null)
        }
    } catch (e) {
        return sendResponse(false, 503, 'internal_server_error', 'Internal Server Error', null)

    }
}

/** Handler - for updating employee details */
exports.updateEmployeeDetails = async (request, h) => {
    try{
        const data = JSON.parse(JSON.stringify(request.payload))
        const result = await Employee.updateEmployeeDetails(data)
        if(result.result == true)
        {
            return sendResponse(true, 201, 'updated', 'Updated Successfully', null)
        } else {
            return sendResponse(false, 500, 'failed', 'Failed - employee detail cannot be updated', null)
        }
    }catch(e)
    {
        return sendResponse(false, 503, 'internal_server_error', 'Internal Server Error', null)
    }
}

/** Handler - to get all employee details */
exports.getAllEmployees = async (request, h) => {
    try{
        const result = await Employee.getAllEmployees()
        if(result.result == true)
        {
            return sendResponse(200,'founcd','Employee data fetched successfully',result.data)
        }else
        {
            return sendResponse(false, 500, 'failed', 'Failed - employees cannot be fetched', null)
        }
    }catch(e)
    {
        return sendResponse(false, 503, 'internal_server_error', 'Internal Server Error', null)
    }
}