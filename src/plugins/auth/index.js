const JWT = require('@hapi/jwt')
const config = require('../../../config/env_local_var.json')
const Boom = require('boom')
function auth(server, options) {
    return {
        authenticate: async function (request, h) {
            console.log('Came inside authetication scheme')
            const req = request.raw.req;
            const authorization = req.headers.authorization;
            if (!authorization) {
                throw Boom.unauthorized(null, 'Custom');
            }

            try {
                console.log(authorization.split(' ')[1])
                const decoded = await JWT.token.decode(authorization.split(' ')[1]);
                console.log('decoded ....', decoded)
                const data = await require('../../../database/Redis_Connection').getRedis()
                if(decoded.decoded.payload.email == data.email && decoded.decoded.payload.password == data.password && decoded.decoded.token == data.token )
                {
                    JWT.token.verify(decoded, config.jwt.key, (options = {}));
                    let redisData = {}
                    redisData.email = decoded.decoded.payload.email
                    redisData.password = decoded.decoded.payload.password
                    redisData.token = authorization.split(' ')[1]
                    await require('../../../database/Redis_Connection').setRedis(redisData)
                    return h.authenticated({ credentials: decoded.decoded.payload });
                }else
               {
                throw Boom.unauthorized(null, 'Custom');
               }
            } catch (e) {
                console.log(e);
                throw Boom.unauthorized(null, 'Custom');
            }

        }
    };
};

module.exports = auth
