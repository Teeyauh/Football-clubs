/* eslint-disable radix */
import { Op } from 'sequelize'
import models from '../models/index'

const clubsModel = models.Clubs
class Clubs {
  static welcome(req, res) {
    res.status(200).send({ message: 'Welcome to football clubs Api' })
  }

  static getAllClubs(req, res) {
    // eslint-disable-next-line no-unused-vars
    clubsModel.findAll().then((clubs) => {
      res.status(200).send({ message: 'Clubs retrieved successfully', clubs })
    })
  }

  static addClubs(req, res) {
    clubsModel
      .create({
        name: req.body.name,
        stadium: req.body.stadium,
        capacity: req.body.capacity,
        manager: req.body.manager,
        captain: req.body.captain,
        country: req.body.country
      })
      .then((newClub) =>
        res.status(201).send({ message: 'Club added successfully', newClub }))
  }

  static updateClub(req, res) {
    const id = parseInt(req.params.id)
    clubsModel.findByPk(id).then((club) => {
      if (!club) {
        return res.status(404).send({ message: 'Club not found' })
      }
      return club
        .update({
          name: req.body.name || club.name,
          stadium: req.body.stadium || club.stadium,
          capacity: req.body.capacity || club.capacity,
          manager: req.body.manager || club.manager,
          captain: req.body.captain,
          country: req.body.country || club.country
        })
        .then((clubsupdate) => {
          res
            .status(200)
            .send({ message: 'Club updated successfully', clubsupdate })
        })
    })
  }

  static deleteClub(req, res) {
    const id = parseInt(req.params.id)
    clubsModel.findByPk(id).then((club) => {
      if (!club) {
        return res.status(404).send({
          message: 'club cannot be found'
        })
      }
      return club.destroy().then(() =>
        res.status(204).send({
          message: 'Club deleted successfully'
        }))
    })
  }

  static getSingleClub(req, res) {
    const id = parseInt(req.params.id)
    clubsModel
      .findOne({
        where: {
          id
        }
      })
      .then((club) => {
        if (!club) {
          return res.status(404).send({
            message: 'Club cannot be found'
          })
        }
        return res
          .status(201)
          .send({ message: 'Club found successfully', club })
      })
  }

  static searchClubByName(req, res) {
    clubsModel
      .findAll({
        where: {
          name: {
            [Op.substring]: `%${req.query.name}%`
          }
        }
      })
      .then((name) => {
        res.status(200).send({ data: name })
      })
  }

  static searchClubByStadium(req, res) {
    clubsModel
      .findAll({
        where: {
          stadium: {
            [Op.substring]: `%${req.query.stadium}%`
          }
        }
      })
      .then((stadium) => {
        res.status(200).send({ stadium })
      })
  }

  static searchClubByCapacity(req, res) {
    clubsModel
      .findAll({
        where: {
          capacity: {
            [Op.substring]: `%${req.query.capacity}%`
          }
        }
      })
      .then((capacity) => {
        res.status(200).send({ capacity })
      })
  }

  static searchClubByManager(req, res) {
    clubsModel
      .findAll({
        where: {
          manager: {
            [Op.substring]: `%${req.query.manager}%`
          }
        }
      })
      .then((manager) => {
        res.status(200).send({ manager })
      })
  }

  static searchClubByCaptain(req, res) {
    clubsModel
      .findAll({
        where: {
          captain: {
            [Op.substring]: `%${req.query.captain}%`
          }
        }
      })
      .then((captain) => {
        res.status(200).send({ captain })
      })
  }

  static searchClubByCountry(req, res) {
    clubsModel
      .findAll({
        where: {
          country: {
            [Op.substring]: `%${req.query.country}%`
          }
        }
      })
      .then((country) => {
        res.status(200).send({ country })
      })
  }
}

export default Clubs
