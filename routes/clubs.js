/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import express from 'express'
import Clubs from '../controllers/clubs'
import validateAddClub from '../validators/validateAddClub'

const router = express.Router()

router.get('/clubs', Clubs.getAllClubs)
router.post('/clubs', validateAddClub, Clubs.addClubs)
router.put('/clubs/:id', validateAddClub, Clubs.updateClub)
router.delete('/club/:id', Clubs.deleteClub)
router.get('/club/:id', Clubs.getSingleClub)
router.get('/clubs/name', Clubs.searchClubByName)
router.get('/clubs/stadium', Clubs.searchClubByStadium)
router.get('/clubs/capacity', Clubs.searchClubByCapacity)
router.get('/clubs/manager', Clubs.searchClubByManager)
router.get('/clubs/captain', Clubs.searchClubByCaptain)
router.get('/clubs/country', Clubs.searchClubByCountry)

module.exports = router
