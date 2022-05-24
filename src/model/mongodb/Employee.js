const { reject } = require('async')
const mongoose = require('mongoose')
const { addUser } = require('./User')

/** Defining model of Employee collection */
const scheme = mongoose.Schema({
    _id: String,
    name: String,
    dob: String,
    age: String,
    gender: String,
    joiningDate: Date,
    designation: String,
    department: String,
    accountNo: String
})

const Employee = mongoose.model('Employee', scheme)


/**
 * To add new employee to the database - using sequelize
 * @addNewEmployee
 * @param {object} data - employee details to be inserted
 */
async function addNewEmployee(data) {
    const date = Date.now()
    data.joiningDate = date
    data._id = require('../../utils/common').asyncGenerateRandomId(8)
    const employee = await new Employee(data)
    return new Promise((resolve, reject) => {

        employee.save((err) => {
            console.log(err)
            if (err) {
                   reject(err)
            }
        })
        let obj = {}
        obj.result = true
        resolve(obj)
    })
}


/**
 * To delete employee from the database - using sequelize
 * @deleteEmployee
 * @param {object} id - employee id
 */
async function deleteEmployee(id) {
    const result = await Employee.deleteOne({ _id: id })
    return new Promise((resolve, reject) => {
        if (result) {
            let obj = {}
            obj.result = true
            resolve(obj)
        } else {
            reject(err)
        }
    })
}


/**
 * To add new employee to the database - using sequelize
 * @updateEmployeeDetails
 * @param {object} data - employee details to be updated
 */
async function updateEmployeeDetails(data) {
    try {
        const id = data.id
        delete data.id
        const result = await Employee.updateOne({ _id: id }, data)
        console.log(result)
        return new Promise((resolve, reject) => {
            console.log(result)
            if (result.modifiedCount == 1) {
                let obj = {}
                obj.result = true
                resolve(obj)
            } else {
                let obj = {}
                obj.result = false
                resolve(obj)
            }
        })
    } catch (e) {
     console.log(e)
    }
}


/**
 * To get all data of employees
 * @getAllEmployees
 */
function getAllEmployees() {
    return new Promise((resolve, reject) => {
        Employee.find({}, (err, doc) => {
            if (err) {
                reject(err)
            } else {
                let obj = {}
                obj.result = true
                obj.data = doc
                resolve(obj)
            }
        })
    })
}


module.exports = {
    addNewEmployee,
    getAllEmployees,
    deleteEmployee,
    updateEmployeeDetails

}