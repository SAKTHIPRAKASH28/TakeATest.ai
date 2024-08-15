const express =require('express')

require('dotenv').config()
require('./config/dbConnection')()


const app=express()
const PORT = process.env.PORT || 8080


app.use(require('cors')())
.use(require('./middlewares/authHandler'))
.use(express.json())
.use("/papers",require("./routes/questionPaperRoutes"))
.get("/",(req,res)=>{
    res.status(500).json({
        "Hello":"World"
    })
})
.use(require('./middlewares/errorHandler'))
    .listen(PORT,()=>{
    console.log(`Server is live on http://localhost:${PORT}`)
})