class Clubs {
  static welcome(req, res) {
    res.status(200).send({ message: 'Welcome to football clubs Api' })
  }
}

export default Clubs
