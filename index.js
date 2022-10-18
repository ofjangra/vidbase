import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path'
import router from './routes/routes.js'

const app = express()
app.use(express.json())

dotenv.config({
    path:"./config.env"
})

const DBURI = process.env.DBURI


const connecteDB = (uri) =>{
    mongoose.connect(uri)
    .then(() =>{
        console.log("connected to DB")
    })
    .catch((err) =>{
        console.log(err)
    })
}

app.use(router)

app.listen(8080, () =>{
    connecteDB(DBURI)
    console.log("server statretd")
})