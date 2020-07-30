import isNumeric from 'validator/lib/isNumeric'

// eslint-disable-next-line consistent-return
const validateAddClub = (req, res, next) => {
  if (!req.body.name.trim()) {
    return res.status(400).send({ message: 'Name cannot be empty' })
  }
  if (!req.body.country.trim()) {
    return res.status(400).send({ message: 'Country cannot be empty' })
  }
  if (!isNumeric(req.body.capacity)) {
    return res.status(400).send({ message: 'Capacity must be a number' })
  }
  next()
}

export default validateAddClub
