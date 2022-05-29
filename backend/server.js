const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors')
const goalRoutes = require('./routes/goalRoutes.js')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 3000;

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', goalRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})