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
const clubsModel = models.Clubs
let newClub = {}

describe('Football Clubs Api', () => {
  before(async () => {
    // create database tables
    await models.sequelize.sync()

    await clubsModel.create({
      name: 'Teeyauh FC.',
      stadium: 'Lokogoma',
      capacity: 70360,
      manager: 'Tayo',
      captain: 'Pierre',
      country: 'Nigeria'
    })
    // eslint-disable-next-line no-const-assign
    newClub = await clubsModel.create({
      Name: 'Leicester City F.C.',
      Stadium: 'King Power Stadium',
      Capacity: 32312,
      Manager: 'Brendan Rodgers',
      Captain: 'Wes Morgan',
      country: 'England'
    })
    await clubsModel.create({
      Name: 'Chelsea F.C.',
      Stadium: 'Stamford Bridge',
      Capacity: 41837,
      Manager: 'Frank Lampard',
      Captain: 'César Azpilicueta',
      country: 'England'
    })
  })
  after(async () => {
    // empty the database
    await clubsModel.destroy({ where: {} })
  })
  describe('Index route', () => {
    it('should return welcome message when /clubs route is matched', (done) => {
      request.get('/').end((err, res) => {
        res.status.should.be.equal(200)
        expect(res.body.message).be.equal('Welcome to football clubs Api')
        done()
      })
    })
  })
  describe('Get all Clubs', () => {
    it('it should GET all clubs', (done) => {
      request.get('/clubs').end((err, res) => {
        res.status.should.be.equal(200)
        expect(res.body.clubs).to.be.an('array')
        expect(res.body.message).be.equal('Clubs retrieved successfully')
        done()
      })
    })
  })
  describe('Update club route', () => {
    it('should UPDATE a club by the id', (done) => {
      request
        .put(`/clubs/${newClub.id}`)
        .send({
          name: 'Fashola FC.',
          stadium: 'somewhere',
          capacity: 13360,
          manager: 'Fash',
          captain: 'Niyo',
          country: 'Nigeria'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.message).be.equal('Club updated successfully')
          done()
        })
    })
  })
})
