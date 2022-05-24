const mongoose = require('mongoose')

const connect = () =>
{
    mongoose.connect("mongodb://localhost:27017/crud-mysql-hapi")
    mongoose.connection.on('error',(err)=>
    {
        console.log("error occurred while connecting to the database",err)
    })
    mongoose.connection.on('connected',(err)=>
    {
        console.log('Datbase connection established...')
    })
}

module.exports = connect