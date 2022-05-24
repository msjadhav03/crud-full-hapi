/** Controller - for creating new project */
exports.createNewProject = {
    validate: require('../validation/Validation').addNewProject,
    description: "To add new Project",
    notes: 'All fields are mandatory',
    tags: ['api'],
    auth : 'jwt',
    handler: require('../factory/Project_Factory').createNewProject
}

/** Controller - for updating project details */
exports.updateProject = {
    validate: require('../validation/Validation').updateProject,
    description: "To update Project",
    notes: '_id field is mandatory',
    tags: ['api'],
    auth : 'jwt',
    handler: require('../factory/Project_Factory').updateProject

}

/** Controller - for deleting project */
exports.deleteProject = {
    validate: require('../validation/Validation').deleteProject,
    description: "To delete Project",
    notes: '_id field is mandatory',
    tags: ['api'],
    auth : 'jwt',
    handler: require('../factory/Project_Factory').deleteProject

}

/** Controller - to get all project details */
exports.getAllProjects = {
    description: "To get all project data",
    notes: 'No fields are mandatory',
    tags: ['api'],
    auth : 'jwt',
    handler: require('../factory/Project_Factory').getAllProjects
}