const config = require('../../../config/env_local_var.json')

async function connect() {
    const knex = require('knex')({
        client: 'mysql2',
        connection: {
            host: config.database.mysql2.options.host,
            port: config.database.mysql2.options.port,
            user: config.database.mysql2.username,
            password: config.database.mysql2.password,
            database: config.database.mysql2.name
        }
    })
    console.log('Connected')
    return knex;
}

/**
 * To create new project
 * @addProject
 * @param {object} data - project data to be inserted
 */
exports.addProject = async (data) => {
    const knex = await connect()
    return new Promise((resolve, reject) => {
        knex('Project').insert(data).then((result) => {
            resolve(true)
        }).catch((err) => {
            reject(err)
        }).finally(() => {
            knex.destroy()
        })
    })
}


/**
 * To get details of all project
 * @getAllProjects
  */
exports.getAllProjects = async () => {
    const knex = await connect();
    return new Promise((resolve, reject) => {
        knex('Project').select().then((result) => {
            console.log(result)
            resolve(result)
        }).catch(err => {
            console.log(err)
            reject(err)
        }).finally(() => {
            knex.destroy()
        })
    })
}

/**
 * To update project data 
 * @addProject
 * @param {object} data - project data to be updated
 */
exports.updateProject = async (data) => {
    const knex = await connect()
    return new Promise((resolve, reject) => {
        knex('Project').where('_id', data._id).update(data).then((result) => {
            console.log(result)
            resolve(true)
        }).catch((err) => {
            console.log(err)
            reject(err)
        }).finally(()=>
        {
            knex.destroy()
        })
    })
}

/**
 * To delete project
 * @deleteProject
 * @param {number} id - project id which you want to delete
 */
exports.deleteProject = async (id) =>
{
    const knex = await connect()
    return new Promise((resolve,reject)=>
    {
        knex('Project').where('_id',id).delete().then((result) => {
            console.log('deletion done', result)
            resolve(true)
        }).catch((err) => {
            console.log(err)
            reject(err)
        }).finally(() => {
            console.log('Finally exexuted')
            knex.destroy()
        })
    })
}
