/* eslint-disable import/extensions */
import express from 'express'
import User from '../controllers/users'
import validateSignup from '../validators/validateSignUp'
import validateSignIn from '../validators/validateSignIn'

const router = express.Router()

router.post('/signup', validateSignup, User.signUp)
router.post('/signin', validateSignIn, User.signIn)

module.exports = router
