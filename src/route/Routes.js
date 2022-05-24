module.exports = [
    {
        method : 'POST',
        path : '/createNewUser',
        options : require('../controller/User_Controller').createNewUser
    },
    {
        method : 'POST',
        path :'/login',
        options : require('../controller/User_Controller').login
    },
    {
        method : 'GET',
        path : '/getAllUsers',
        options : require('../controller/User_Controller').getAllUsers
    },
    {
        method : 'GET',
        path : '/getAllEmployees',
        options : require('../controller/Employee_Controller').getAllEmployees
    },
    {
        method : 'POST',
        path : '/addNewEmployee',
        options : require('../controller/Employee_Controller').addNewEmployee
    },
    {
        method : 'POST',
        path : '/deleteEmployee',
        options : require('../controller/Employee_Controller').deleteEmployee
    },
    {
        method : 'POST',
        path : '/updateEmployee',
        options : require('../controller/Employee_Controller').updateEmployeeDetails
    },
    {
        method : 'GET',
        path : '/getAllTasks',
        options : require('../controller/Task_Controller').getAllTasks
    },
    {
        method : 'POST',
        path : '/addNewTask',
        options : require('../controller/Task_Controller').addNewTask
    },
    {
        method : 'POST',
        path : '/deleteTask',
        options : require('../controller/Task_Controller').deleteTask
    },
    {
        method : 'POST',
        path : '/updateTask',
        options : require('../controller/Task_Controller').updateTask
    },
    {
        method : 'POST',
        path : '/createNewProject',
        options : require('../controller/Project_Controller').createNewProject
    },
    {
        method : 'POST',
        path : '/deleteProject',
        options : require('../controller/Project_Controller').deleteProject
    },
    {
        method : 'POST',
        path : '/updateProject',
        options : require('../controller/Project_Controller').updateProject
    },
    {
        method : 'GET',
        path : '/getAllProject',
        options : require('../controller/Project_Controller').getAllProjects
    }

]