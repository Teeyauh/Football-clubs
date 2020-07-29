/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import express from 'express'

import Clubs from '../controllers/clubs'

const router = express.Router()

router.get('/clubs', Clubs.getAllClubs)
router.post('/clubs', Clubs.addClubs)
module.exports = router
