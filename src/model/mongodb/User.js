const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const config = require('../../../config/env_local_var.json')
const generateId = require('../../utils/common')

/** Defining model of User collection */
const scheme = new mongoose.Schema({
    _id: String,
    first_name: String,
    last_name: String,
    age: Number,
    email: String,
    password: String,
    token: String
})

const User = mongoose.model('User', scheme)


/**
 * To check if user exists previously
 * @checkUserExistence
 * @param {string} email - email is unqiue for all users
 */

function checkUserExistence(email) {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email }, (err, result) => {
            if (result) {
                resolve(true)
            } else if (err) {
                reject(err)
            } else {
                resolve(false)
            }
        })
    })
}



/**
 * To add new user to the database
 * @addUser
 * @param {object} data - user data to be added 
 */
async function addUser(data) {
    try {
        const token = generateAccessToken(data)
        data._id = generateId.asyncGenerateRandomId(8)
        data.token = token
        const user = await new User(data)
        await user.save()
        let obj = {}
        obj.accessToken = token
        return obj;
    } catch (e) {
        return e;
    }

}


/**
 * To check whether user exists and its credentials match
 * @checkForUserAndPasswordExistence
 * @param {string} email - email of the user to login
 * @param {string} password - password of the user to login
 */
function checkForUserAndPasswordExistence(email, password) {
    return new Promise((resolve, reject) => {
        User.findOne({ email: email, password: password }, (err, doc) => {
            if (err) {
                reject(err)
            } else if (doc) {
                let obj = {}
                obj.result = true
                obj.accessToken = generateAccessToken({ email, password })
                resolve(obj)
            } else {
                let obj = {}
                obj.result = true
                resolve(obj)
            }
        })
    })
}


/**
 * To update the user access token after every successfully login
 * @updateAccessToken
 * @param {string} email - email of the user 
 * @param {string} token - token of the user 
 */
async function updateAccessToken(email, token) {
    const result = await User.updateOne({ email: email }, { token: token })
    return new Promise((resolve, reject) => {
        try {
             if (result.modifiedCount == 1) {
                let obj = {}
                obj.result = true
                resolve(obj)
            } else {
                let obj = {}
                obj.result = false
                resolve(obj)
            }
        } catch (e) {
            reject(e)
        }
    })
}


/**
 * To get all users data
 * @getAllUsers
 */
function getAllUsers() {
    return new Promise((resolve, reject) => {
        User.find({}, (err, doc) => {
            if (err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })
    })
}



/**
 * To generate access token
 * @generateAccessToken
 */
function generateAccessToken(data) {
    return jwt.sign(data, config.jwt.key, { expiresIn: '21800s' });
}



module.exports = {
    checkUserExistence,
    addUser,
    checkForUserAndPasswordExistence,
    updateAccessToken,
    getAllUsers
}