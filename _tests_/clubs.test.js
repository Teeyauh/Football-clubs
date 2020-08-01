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

let newClub = {}
let clubToDelete = {}
describe('Football clubs Api', () => {
  before(async () => {
    // create database tables
    await models.sequelize.sync()

    await ClubsModel.create({
      Name: 'test club',
      Stadium: 'teeyauh',
      Capacity: 90000,
      Manager: 'Tayo',
      Captain: 'Tee',
      country: 'Nigeria'
    })
    // eslint-disable-next-line no-const-assign
    newClub = await ClubsModel.create({
      Name: 'Leicester City F.C.',
      Stadium: 'King Power Stadium',
      Capacity: 32312,
      Manager: 'Brendan Rodgers',
      Captain: 'Wes Morgan',
      country: 'England'
    })
    await ClubsModel.create({
      Name: 'Chelsea F.C.',
      Stadium: 'Stamford Bridge',
      Capacity: 41837,
      Manager: 'Frank Lampard',
      Captain: 'César Azpilicueta',
      country: 'England'
    })
    clubToDelete = await ClubsModel.create({
      Name: 'Liverpool F.C.',
      Stadium: ' Anfield',
      Capacity: 54074,
      Manager: ' Jürgen Klopp',
      Captain: 'Jordan Henderson.',
      Country: 'England'
    })
  })

  after(async () => {
    // empty the database
    await ClubsModel.destroy({ where: {} })
  })

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
})
