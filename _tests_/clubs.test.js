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

describe('Football Clubs Api', () => {
  before(async () => {
    // create database tables
    await models.sequelize.sync()

    await clubsModel.create({
      Name: 'Teeyauh FC.',
      Stadium: 'Lokogoma',
      Capacity: 70360,
      Manager: 'Tayo',
      Captain: 'Pierre',
      country: 'Nigeria'
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
})
