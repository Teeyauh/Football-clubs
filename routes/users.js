/* eslint-disable import/extensions */
import express from 'express'
import User from '../controllers/users'
// import validateSignup from '../validators/validateSignup.js'

const router = express.Router()

router.post('/signup', User.signUp)

module.exports = router
