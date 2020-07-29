/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import express from 'express'

import Clubs from '../controllers/clubs'

const router = express.Router()

router.get('/clubs', Clubs.getAllClubs)
router.post('/clubs', Clubs.addClubs)
router.put('/clubs/:id', Clubs.updateClub)
router.delete('/club/:id', Clubs.deleteClub)
router.get('/club/:id', Clubs.getSingleClub)
module.exports = router
