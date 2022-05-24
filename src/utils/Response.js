/** To send response to the client */
function sendResponse(result, code, name, message, data)
{
    return {result,code,name,message,data}
}

module.exports = sendResponse