class Clubs {
  static welcome(req, res, next) {
    res.send({ message: 'Welcome to Football Clubs Api' })
  }
}

export default Clubs
