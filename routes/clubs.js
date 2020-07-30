/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
import express from 'express'
import Clubs from '../controllers/clubs'
import validateAddClub from '../validators/validateAddClub'

const router = express.Router()

router.get('/clubs', Clubs.getAllClubs)
router.post('/clubs', Clubs.addClubs, validateAddClub)
router.put('/clubs/:id', Clubs.updateClub)
router.delete('/club/:id', Clubs.deleteClub)
router.get('/club/:id', Clubs.getSingleClub)
router.get('/club/name', Clubs.searchClubByName)
router.get('/club/stadium', Clubs.searchClubByStadium)
router.get('/club/capacity', Clubs.searchClubByCapacity)
router.get('/club/manager', Clubs.searchClubByManager)
router.get('/club/captain', Clubs.searchClubByCaptain)
router.get('/club/country', Clubs.searchClubByCountry)

module.exports = router
