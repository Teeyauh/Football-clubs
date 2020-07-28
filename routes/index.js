import Clubs from '../controllers/clubs'

const express = require('express')

const router = express.Router()

/* GET home page. */
router.get('/', Clubs.welcome)
module.exports = router
