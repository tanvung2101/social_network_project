import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const routesAuth = require('./routes/auth')
const routesPost = require('./routes/post')


const morgan = require('morgan')
require('dotenv').config()

const app = express()

// db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR => ", err));

// middlewares
app.use(express.json({limit:'5mb'}))
app.use(express.urlencoded({extended: true}))
app.use(
    cors({
        origin: ['http://localhost:3000']
    })
)

app.use('/api', routesAuth)
app.use('/api', routesPost)

const port = process.env.POST || 8000
app.listen(port, () => console.log(`Server running on port ${port}`))

// 69