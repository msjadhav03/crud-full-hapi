/** Controller - for creating new employee */
exports.addNewEmployee = {
    validate:require('../validation/Validation').addNewEmployee,
    description : 'Route to add new Employee',
    notes : 'All fields are required !!!',
    tags : ['api'],
    auth : 'jwt',
    handler : require('../factory/Employee_Factory').addNewEmployee  
}

/** Controller - for deleting employee */
exports.deleteEmployee = {
    validate:require('../validation/Validation').deleteEmployee,
    description : 'Route to Delete Employee',
    notes : 'employee id is mandatory !!!',
    tags : ['api'],
    auth : 'jwt',
    handler : require('../factory/Employee_Factory').deleteEmployee  

}

/** Controller - for updating employee details */
exports.updateEmployeeDetails = {
    validate:require('../validation/Validation').updateEmployeeDetails,
    description : 'Route to add new Employee',
    notes : 'employee id is mandatory !!!',
    tags : ['api'],
    auth : 'jwt',
    handler : require('../factory/Employee_Factory').updateEmployeeDetails  

}

/** Controller - to get all employee details */
exports.getAllEmployees = {
    description : 'Route to add get all employees',
    notes : 'No field is mandatory !!!',
    tags : ['api'],
    auth : 'jwt',
    handler : require('../factory/Employee_Factory').getAllEmployees  

}