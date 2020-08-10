/* eslint-disable import/extensions */
import express from 'express'
import User from '../controllers/users'
import validateUserSignUp from '../validators/validateUserSignUp'
import validateSignIn from '../validators/validateSignIn'

const router = express.Router()

router.post('/signup', validateUserSignUp, User.signUp)
router.post('/signin', validateSignIn, User.signIn)

module.exports = router
