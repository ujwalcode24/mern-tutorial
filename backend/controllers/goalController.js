const expressAsyncHandler = require('express-async-handler')
const asynHandler = require('express-async-handler')

const getGoals = asynHandler(async(req, res) => {
    res.status(200).json({ message: "get goals" })
})

const addGoals = asynHandler( async(req, res)=>{
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    res.status(200).json({ message: "set goal" })
})

const updateGoals = asynHandler(async(req, res)=>{
    res.status(200).json({ message: `update goal ${req.params.id}` })
}
)
const deleteGoals =  asynHandler(async(req, res)=>{
    res.status(200).json({ message: `delete goal ${req.params.id}` })
}
)
module.exports = { getGoals, addGoals, updateGoals, deleteGoals }