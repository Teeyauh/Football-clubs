/* eslint-disable import/extensions */
import express from 'express'
import User from '../controllers/users'
import validateSignup from '../validators/validateSignup'

const router = express.Router()

router.post('/signup', validateSignup, User.signUp)

module.exports = router
