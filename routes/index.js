const express = require('express')

const router = express.Router()

/* GET home page. */
router.get('/', (req, res) => {
  res.send({ message: 'Welcome to football clubs Api' })
})

module.exports = router
