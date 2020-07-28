import models from '../models/index'

const clubsModel = models.Clubs
class Clubs {
  static welcome(req, res) {
    res.status(200).send({ message: 'Welcome to football clubs Api' })
  }

  static getAllClubs(req, res) {
    // eslint-disable-next-line no-unused-vars
    clubsModel.findAll().then((clubs) => {
      res.status(200).send({ message: 'Clubs retrieved successfully', Clubs })
    })
  }
}

export default Clubs
