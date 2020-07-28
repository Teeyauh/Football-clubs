import express from 'express'

import Clubs from '../controllers/clubs'

const router = express.Router()

router.get('/clubs', Clubs.getAllClubs)

module.exports = router
