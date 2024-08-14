const mongoose = require('mongoose')
const connectDB= async () =>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("DB CONNECTED ", connect.connection.host)
    }
    catch(err){
        console.log(err)
    }
}

module.exports = connectDB