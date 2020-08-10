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
let clubToDelete = {}

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
      name: 'Leicester City F.C.',
      stadium: 'King Power Stadium',
      capacity: 32312,
      manager: 'Brendan Rodgers',
      captain: 'Wes Morgan',
      country: 'England'
    })
    await clubsModel.create({
      name: 'Chelsea F.C.',
      stadium: 'Stamford Bridge',
      capacity: 41837,
      manager: 'Frank Lampard',
      captain: 'César Azpilicueta',
      country: 'England'
    })

    clubToDelete = await clubsModel.create({
      name: 'Real Madrid F.C.',
      stadium: 'Santiago Bernabeu',
      capacity: '81044',
      manager: 'Zinedine Zidane',
      captain: 'Sergio Ramos',
      country: 'Spain'
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
          name: 'Man City F.C.',
          stadium: 'King Power Stadium',
          capacity: '32312',
          manager: 'Brendan Rodgers',
          captain: 'Silva',
          country: 'England'
        })
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.message).be.equal('Club updated successfully')
          done()
        })
    })
    it('should return club with this id does not exist', (done) => {
      request
        .put('/clubs/23456')
        .send({
          name: 'cardiff City F.C.',
          stadium: 'King Power Stadium',
          capacity: '32312',
          manager: 'Brendan Rodgers',
          captain: 'Morgan',
          country: 'England'
        })
        .end((err, res) => {
          res.status.should.be.equal(404)
          expect(res.body.message).be.equal('Club not found')
          done()
        })
    })
    it('should return name cannot be empty if user doesnt put a name', (done) => {
      request
        .put(`/clubs/${newClub.id}`)
        .send({
          name: '',
          stadium: 'somewhere',
          capacity: 57000,
          manager: 'Paul',
          captain: 'CR',
          country: 'Nigeria'
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Name cannot be empty')
          done()
        })
    })
    it('should return capacity must be a number if the capacity entered isnt a number', (done) => {
      request
        .put(`/clubs/${newClub.id}`)
        .send({
          name: 'test club',
          stadium: 'somewhere',
          capacity: '',
          manager: 'Paul',
          captain: 'CR',
          country: 'Nigeria'
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Capacity must be a number')
          done()
        })
    })
    it('should return stadium cannot be empty if user doesnt put a stadium', (done) => {
      request
        .put(`/clubs/${newClub.id}`)
        .send({
          name: 'test club',
          stadium: '',
          capacity: '57000',
          manager: 'Paul',
          captain: 'CR',
          country: 'Nigeria'
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Stadium cannot be empty')
          done()
        })
    })
  })
  describe('Add a new club', () => {
    it('should add club', (done) => {
      request
        .post('/clubs')
        .send({
          name: 'Barcelona F.C.',
          stadium: 'Camp Nou',
          capacity: '99354',
          manager: 'Quique Setién',
          captain: 'Messi',
          country: 'Spain'
        })
        .end((err, res) => {
          expect(res.status).to.equal(201)
          expect(res.body.message).be.equal('Club added successfully')
          done()
        })
    })
    it('should Add Club when id does not exist', (done) => {
      request
        .post('/clubs/5555')
        .send({
          name: 'Barcelona F.C.',
          stadium: 'Camp Nou',
          capacity: '99354',
          manager: 'Quique Setién',
          captain: 'Messi',
          country: 'Spain'
        })
        .end((err, res) => {
          res.status.should.be.equal(404)
          expect(res.body.message).be.equal(undefined)
          done()
        })
    })
    it('should return name cannot be empty if user doesnt put a name', (done) => {
      request
        .post('/clubs')
        .send({
          name: '',
          stadium: 'Camp Nou',
          capacity: '99354',
          manager: 'Quique Setién',
          captain: 'Messi',
          country: 'Spain'
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Name cannot be empty')
          done()
        })
    })
    it('should return capacity must be a number if the capacity entered isnt a number', (done) => {
      request
        .post('/clubs')
        .send({
          name: 'Barcelona F.C.',
          stadium: 'Camp Nou',
          capacity: '',
          manager: 'Quique Setién',
          captain: 'Messi',
          country: 'Spain'
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Capacity must be a number')
          done()
        })
    })
    it('should return stadium cannot be empty if user doesnt put a stadium', (done) => {
      request
        .post('/clubs')
        .send({
          name: 'Barcelona F.C.',
          stadium: '',
          capacity: '99354',
          manager: 'Quique Setién',
          captain: 'Messi',
          country: 'Spain'
        })
        .end((err, res) => {
          res.status.should.be.equal(400)
          expect(res.body.message).be.equal('Stadium cannot be empty')
          done()
        })
    })
  })
  describe('Delete club', () => {
    it('should delete a Club given the id', (done) => {
      request.delete(`/club/${clubToDelete.id}`).end((err, res) => {
        res.status.should.be.equal(204)
        done()
      })
    })
    it('should return Club does not exist', (done) => {
      request.delete('/club/508020').end((err, res) => {
        res.status.should.be.equal(404)
        expect(res.body.message).be.equal('club cannot be found')
        done()
      })
    })
  })
  describe('Get a single club', () => {
    it('it should get a club by id', (done) => {
      request.get(`/club/${newClub.id}`).end((err, res) => {
        res.status.should.be.equal(201)
        res.body.should.be.a('object')
        expect(res.body.club).to.have.property('name')
        expect(res.body.club).to.have.property('stadium')
        expect(res.body.club).to.have.property('country')
        done()
      })
    })
    it('it should get a club by id', (done) => {
      request.get('/club/1478').end((err, res) => {
        res.status.should.be.equal(404)
        expect(res.body.message).to.equal('Club cannot be found')
        done()
      })
    })
  })
  describe('Search club by name', () => {
    it('should get club by name', (done) => {
      request
        .get('/clubs/name')
        .query({ name: 'Teeyauh FC.' })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })
  describe('Search club by stadium', () => {
    it('should get club by stadium', (done) => {
      request
        .get('/clubs/stadium')
        .query({ name: 'Lokogoma' })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })
  describe('Search club by Manager', () => {
    it('should get club by manager', (done) => {
      request
        .get('/clubs/manager')
        .query({ manager: 'Tayo' })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })
  describe('Search club by Captain', () => {
    it('should get club by captain', (done) => {
      request
        .get('/clubs/captain')
        .query({ captain: 'Pierre' })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })
  describe('Search club by Country', () => {
    it('should get club by country', (done) => {
      request
        .get('/clubs/country')
        .query({ country: 'Nigeria' })
        .end((err, res) => {
          res.status.should.be.equal(200)
          expect(res.body.data).to.be.an('array')
          done()
        })
    })
  })
})
