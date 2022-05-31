const express = require('express')
const router = express.Router()
const { registerUsers, loginUsers, getMe } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUsers)
router.post('/login', loginUsers)
router.get('/me', protect, getMe)

module.exports = router