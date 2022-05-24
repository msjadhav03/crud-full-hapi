const User = require('../model/mongodb/User')
const sendResponse = require('../utils/Response')

/** Handler - creating new user */
exports.createNewUser = async (request, h) => {
    console.log('Came inside create New User')
    const data = JSON.parse(JSON.stringify(request.payload))
    const userExistenceStatus = await User.checkUserExistence(data.email)
    console.log(userExistenceStatus)
    if(userExistenceStatus === false)
    {
        const result = await User.addUser(data)
        if (result) {
            console.log(result)
            let redisData = {}
            redisData.email = data.email
            redisData.password = data.password
            redisData.token = result.accessToken
            const a = await require('../../database/Redis_Connection').setRedis(redisData)
            console.log("*************************",a)
            return sendResponse(true, 200, 'success', 'New user added', result)
        } else {
            return sendResponse(true, 500, 'database_server_error', 'Database Server Error', null)
        }
   
    }else
    {
        return sendResponse(false,400,'user_alreday_exists',"User Already exists",null)
    }

}

/** Handler - for getting logged in and access token */
exports.login = async (request,h)=>
{
    const data = JSON.parse(JSON.stringify(request.payload))
    const userAndPasswordCheck = await User.checkForUserAndPasswordExistence(data.email,data.password)
    if(userAndPasswordCheck.result === true)
    {
        const updateStatus = await User.updateAccessToken(data.email,userAndPasswordCheck.accessToken)
        if(updateStatus.result === true)
        {
            let redisData = {}
            redisData.email = data.email
            redisData.password = data.password
            redisData.token = userAndPasswordCheck.accessToken
            await require('../../database/Redis_Connection').setRedis(redisData)
            return sendResponse(true,200,'success','Login in success',{data : {accessToken:userAndPasswordCheck.accessToken}})
        }else
        {
            return sendResponse(false,400,'failed','Error occurred while updating token',null)
        }
    }else
    {
        return sendResponse(false,400,'wrong_credentials','Login credentials invalid',null)
    }
}

/** Controller - to get all users data */
exports.getAllUsers = async(request,h)=>{
    const result = await User.getAllUsers()
    if(result)
    {
        return sendResponse(200,'success','User fetched successfully',result)
    }else
    {
        return sendResponse(400,'failed','User data cannot be fetched - failed !!!',null)
    }
}