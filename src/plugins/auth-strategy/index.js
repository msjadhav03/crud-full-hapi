const { mapValuesSeries } = require('async');
const { decode } = require('jsonwebtoken');
const 
    config = require('../../../config/env_local_var.json'),
    jwt2 = require('hapi-auth-jwt2');

const sendResponse = require('../../utils/Response');
// const Constants = require('../../utils/constants');

const register = async server => {
    try {
        const validate = async (decoded, request, h) => {
            console.log('in validate... .');
            try {
                console.log(decoded);
                const data = await require('../../../database/Redis_Connection').getRedis()
                console.log(data)
                if (decoded.email === data.email && decoded.password === data.password) {
                    let redisData = {}
                    redisData.email = decoded.email
                    redisData.password = decode.password
                    console.log(redisData)
                    await require('../../../database/Redis_Connection').setRedis(redisData)
                    return {isValid: true, credentials: {name: decoded.email}};
                } else {
                    return ({response: sendResponse(false, 403, 'invalid_user', 'Authorization failed',null)});
                }
            } catch (error) {
                return ({response: sendResponse(false, 403, 'invalid_user', 'Authorization failed',null)});
            }
       }

		let registered = server.register(jwt2);
        server.auth.strategy('jwt', 'jwt',
			{
				validate,
				key: config.jwt.key
			});
		server.auth.default('jwt');
        return registered;
    } catch (err) {
        console.log('Error while registering',err)
    }
};

module.exports = {
    register,
	info: { name: "hapi-auth-jwt2", version: "^10.2.0" },
};
