const express = require('express')
const router = express.Router()
const {  getGoals, addGoals, updateGoals, deleteGoals } = require('../controllers/goalController')


router.get('/', getGoals)
router.post('/', addGoals)
router.put('/:id', updateGoals)
router.delete('/:id', deleteGoals)


module.exports = router