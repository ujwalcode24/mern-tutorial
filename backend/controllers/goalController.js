const expressAsyncHandler = require('express-async-handler')
const asynHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

const getGoals = asynHandler(async(req, res) => {
    const goals = await Goal.find({ user: req.user.id })
    res.status(200).json(goals)
})

const addGoals = asynHandler( async(req, res)=>{
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        user: req.user.id,
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

    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('unauthorized user')
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
    
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }

    if(goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('unauthorized user')
    }

    await Goal.deleteOne({id: req.params.id})
    res.status(200).json(req.params.id)
}
)
module.exports = { getGoals, addGoals, updateGoals, deleteGoals }