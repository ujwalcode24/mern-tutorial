const express = require('express');
const dotenv = require('dotenv').config();
const goalRoutes = require('./routes/goalRoutes.js')
const {errorHandler} = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 3000;


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/goals', goalRoutes)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is running on port: ${PORT}`)
})