const Joi = require('joi')


module.exports = {
    createNewUser :
    {
        payload : Joi.object({
            first_name : Joi.string().required(),
            last_name : Joi.string().required(),
            age : Joi.number().required(),
            email : Joi.string().email(),
            password : Joi.string().required()
        })
    },
    login :{
        payload : Joi.object({
            email : Joi.string().email(),
            password : Joi.string().required()
        })
    },
    addNewEmployee:
    {
        payload : Joi.object({
            name : Joi.string().required(),
            department : Joi.string().required(),
            dob : Joi.string().required(),
            age:Joi.number().required(),
            gender : Joi.string().required(),
            designation : Joi.string().required(),
            accountNo:Joi.string().required()
        })
    },
    updateEmployeeDetails:
    {
        payload : Joi.object({
            id:Joi.string().required(),
            name : Joi.string(),
            department : Joi.string(),
            dob : Joi.string(),
            age:Joi.number(),
            gender : Joi.string(),
            designation : Joi.string(),
            accountNo:Joi.string()
        })
    },
    deleteEmployee : 
    {
        payload :Joi.object(
            {
                id : Joi.string().required()
            })
    },
    addNewTask :
    {
        payload : Joi.object({
            task_id:Joi.number().required(),
            task_name : Joi.string().required(),
            givenTime : Joi.string().required(),
            task_details : Joi.string().required(),
            project_name : Joi.string().required()

        })
    },
    updateTask :
    {
        payload : Joi.object({
            task_id:Joi.number().required(),
            task_name : Joi.string(),
            givenTime : Joi.string(),
            task_details : Joi.string(),
            project_name : Joi.string()
        })
    },
    deleteTask :
    {
        payload :
        Joi.object({
            task_id:Joi.number().required()
        })
    },
    addNewProject :
    {
        payload: Joi.object({
            _id: Joi.number().required(),
            name : Joi.string().required(),
            category : Joi.string().required(),
            noOfMembers : Joi.number().required(),
            timePeriod : Joi.string().required(),
            details : Joi.string().required()
        })
    },
    updateProject :
    {
        payload: Joi.object({
            _id: Joi.number().required(),
            name : Joi.string(),
            category : Joi.string(),
            noOfMembers : Joi.number(),
            timePeriod : Joi.string(),
            details : Joi.string()
        })
    },
    deleteProject : {
        payload : Joi.object({
            _id: Joi.number().required()
        })
    }
}