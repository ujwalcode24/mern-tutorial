const express = require('express')
const router = express.Router()
const {  getGoals, addGoals, updateGoals, deleteGoals } = require('../controllers/goalController')
const { protect } = require('../middleware/authMiddleware')


router.get('/', protect, getGoals)
router.post('/', protect, addGoals)
router.put('/:id', protect, updateGoals)
router.delete('/:id', protect ,deleteGoals)


module.exports = router