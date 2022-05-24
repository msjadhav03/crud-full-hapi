const createClient = require('redis').createClient


const redisConnect = async () => {
    const client = createClient();

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();
    return client
}

exports.setRedis = async (data) => {
    const client = await redisConnect()
    return new Promise((resolve, reject) => {
        try {
            const expirationTime = 250

            // client.SET('email', data.email,{Ex : expirationTime})
            // client.SET('password', data.password, {Ex: expirationTime})
            client.setEx('email',250,data.email)
            client.setEx('password',250,data.password)
            client.setEx('token',250,data.token)
            console.log('Redis set done....')
            resolve(true)
        } catch (e) {
            reject(e)
        }

    })

}
exports.getRedis = async() => {
    try {
        const client = await redisConnect()
        const obj = {}
        obj.email = await client.GET('email')
        obj.password = await client.GET('password')
        return new Promise((resolve, reject) => {
            resolve(obj)

        })
    } catch (e) {
        reject(e)
    }

}