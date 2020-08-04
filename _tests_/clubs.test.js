/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { expect } from 'chai'
import supertest from 'supertest'
import server from '../app'
import models from '../models'

const chai = require('chai')

const should = chai.should()

const request = supertest.agent(server)
const ClubsModel = models.Clubs

describe('Football Clubs Api', () => {
  describe('Index route', () => {
    it('should return welcome message when /clubs route is matched', (done) => {
      request.get('/').end((err, res) => {
        res.status.should.be.equal(200)
        expect(res.body.message).be.equal('Welcome to football clubs Api')
        done()
      })
    })
  })
})
