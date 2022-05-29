const expressAsyncHandler = require('express-async-handler')
const asynHandler = require('express-async-handler')
const Goal = require('../models/goalModel')

const getGoals = asynHandler(async(req, res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
})

const addGoals = asynHandler( async(req, res)=>{
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
})

const updateGoals = asynHandler(async(req, res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('Goal not Found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json({ message: `update goal ${req.params.id}` })
}
)
const deleteGoals =  asynHandler(async(req, res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal) {
        res.status(400)
        throw new Error('Goal not Found')
    }
    await Goal.deleteOne({id: req.params.id})
    res.status(200).json(req.params.id)
}
)
module.exports = { getGoals, addGoals, updateGoals, deleteGoals }