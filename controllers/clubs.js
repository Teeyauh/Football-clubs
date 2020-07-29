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
    clubsModel.create({
      name: req.body.name,
      stadium: req.body.stadium,
      capacity: req.body.capacity,
      manager: req.body.manager,
      captain: req.body.captain,
      location: req.body.location
    }).then((newClub) => res
      .status(201)
      .send({ message: 'Club added successfully', newClub }))
  }
}

export default Clubs
