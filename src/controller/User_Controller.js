/** Controller - for creating new user */
exports.createNewUser = {
    validate : require('../validation/Validation').createNewUser,
    description : "Route add new user",
    notes : "All fields are mandatory",
    tags : ['api'],
    handler : require('../factory/User_Factory').createNewUser
}

/** Controller - for getting logged in and access token */
exports.login = {
    validate : require('../validation/Validation').login,
    description : "Route to log in and get access token",
    notes : "All fields are mandatory - email , password",
    tags : ['api'],
    handler : require('../factory/User_Factory').login
}

/** Controller - to get all users data */
exports.getAllUsers = {
    description : "To Get all users of the app",
    notes : "No required fields",
    tags : ['api'],
    auth : 'jwt',
    handler : require('../factory/User_Factory').getAllUsers
}

