const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
const HapiSwagger = require('hapi-swagger')
const _plugins = require("./src/plugins/index")
const Boom = require('boom')
require("app-module-path").addPath(__dirname);
const init = async (database) =>
{
    const server = new Hapi.Server({
        host:"localhost",
        port : "4000"
        // ,
        // routes: {
        //     cors: true,
        //     timeout: {
        //         server: 1200000, // 1,200,000 or 20 minutes
        //         socket: 1300000
        //     },
        //     validate: {
        //         failAction: (request, h, error) => {
        //             return sendResponse(false, 403, 'unauthorized', 'Authorization failed');
        //         }
        //     }

        // }
    })
    const swaggerOption = {
        info :{
            title : 'CRUD app',
            version : require('./package.json').version
        }
    }
    await server.register([
        Inert,
        Vision,
        {
            plugin : HapiSwagger,
            options : swaggerOption
        }
    ])
    // const pluginOptions = { database };

	// 	let pluginPromises = [];

	// 	_plugins().forEach(pluginName => {
	// 		var plugin = require("./src/plugins/" + pluginName);
    //         console.log(plugin)
	// 		console.log(`Register Plugin ${plugin.info.name} - ${plugin.info.version}`);
	// 		pluginPromises.push(plugin.register(server, pluginOptions));
	// 	});

	// 	await Promise.all(pluginPromises);
    //     console.log('All plugins registered successfully')

    const scheme = require('./src/plugins/auth/index')
    server.auth.scheme('auth', scheme);
    server.auth.strategy('jwt', 'auth') 
    // server.auth.default('default') 
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    })
    server.route(require('./src/route/Routes'))
    server.start((err,doc)=>{
        console.log("Server started")
    })
}
module.exports = init