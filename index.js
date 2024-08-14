const express =require('express')
require('dotenv').config()
const errorHandler = require('./middlewares/errorHandler')
const connectDb= require('./config/dbConnection')

connectDb()
const app=express()


const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(errorHandler)


app.get("/",(req,res)=>{
    res.status(500).json({
        "Hello":"World"
    })
})


app.listen(PORT,()=>{
    console.log(`Server is live on http://localhost:${PORT}`)
})