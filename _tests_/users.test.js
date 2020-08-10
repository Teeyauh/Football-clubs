/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
import chai from 'chai'
import supertest from 'supertest'
import bcrypt from 'bcryptjs'
import server from '../app'
import models from '../models'

const request = supertest.agent(server)
const UserModel = models.User

// eslint-disable-next-line no-unused-vars
const should = chai.should()
const { expect } = chai

describe('User test', () => {
  before(async () => {
    // add a user to the database
    await UserModel.create({
      firstName: 'Joel',
      lastName: 'Oguns',
      email: 'joe@ymail.com',
      hash: bcrypt.hashSync('password', 8),
    })
  })
  after(async () => {
    // empty the database
    await UserModel.destroy({ where: {} })
  })

  describe('User Sign up tests', () => {
    // Test Sign up - first name not provided
    it('should return first name is required', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: '',
          lastName: 'Ogunsi',
          email: 'joe@ymail.com',
          password: 'Somepass7?',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal('First name is required')
          done()
        })
    })

    // Test Sign up - non letters characters provided as first name
    it('should return Only alphabets allowed in first name', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'Joel43',
          lastName: 'Oguns',
          email: 'joe@ymail.com',
          password: 'Somepass7?',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal(
            'Only alphabets allowed in first name'
          )
          done()
        })
    })

    // Test Sign up - last name not provided
    it('should return last name is required', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'Joel',
          lastName: '',
          email: 'joe@ymail.com',
          password: 'Somepass7?',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal('Last name is required')
          done()
        })
    })

    // Test Sign up - non letters characters provided as last name
    it('should return Only alphabets allowed in last name', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'Joel',
          lastName: 'Oguns007',
          email: 'joe@ymail.com',
          password: 'Somepass7?',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal(
            'Only alphabets allowed in last name'
          )
          done()
        })
    })

    // Test Sign up - email not provided
    it('should return email is required if no email is provided', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'Joel',
          lastName: 'Oguns',
          email: '',
          password: 'Somepass7?',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal('Email is required')
          done()
        })
    })

    // Test Sign up - email not valid
    it('should return email invalid if invalid email is provided', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'Joel',
          lastName: 'Oguns',
          email: 'joe.c',
          password: 'Somepass7?',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal('Email Invalid')
          done()
        })
    })

    // Test Sign up - password not provided
    it('should return password is required', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'Jeol',
          lastName: 'Oguns',
          email: 'joe@ymail.com',
          password: '',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal('Password is required')
          done()
        })
    })
    // Test Sign up - password provided not long enough
    it('should return Password must be at least 8 characters long', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'Joel',
          lastName: 'Oguns',
          email: 'joe@ymail.com',
          password: 'some?',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal(
            'Password must be at least 8 characters long'
          )
          done()
        })
    })

    // Test Sign up - password with uppercase not provided
    it('should return error if password does not match criteria', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'Joel',
          lastName: 'Oguns',
          email: 'joe@ymail.com',
          password: 'somepassword',
        })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal(
            'password must contain at least one uppercase letter, one special character and one number'
          )
          done()
        })
    })

    // Test Sign up - user trying to register with an exisiting email
    it('should return User Already Exists', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'Marl',
          lastName: 'Oguns',
          email: 'joe@ymail.com',
          password: 'someP@ss8,',
        })
        .end((err, res) => {
          expect(res.status).to.equal(409)
          expect(res.body.message).to.equal('User Already Exists')
          done()
        })
    })

    // Test Sign up - user created
    it('should return Sign Up Successful', (done) => {
      request
        .post('/users/signup')
        .send({
          firstName: 'Tayo',
          lastName: 'Oguna',
          email: 'teeyauh@gmail.com',
          password: 'Somep@ssw4ordd',
        })
        .end((err, res) => {
          expect(res.status).to.equal(201)
          expect(res.body.message).to.equal('Sign Up Successful')
          done()
        })
    })
  })

  // Test Sign in
  describe('Sign In', () => {
    // Test Sign in - Login Successful
    it('should sign in a user', (done) => {
      request
        .post('/users/signin')
        .send({
          email: 'teeyauh@gmail.com',
          password: 'Somep@ssw4ordd',
        })
        // eslint-disable-next-line no-shadow
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.message).to.equal('Login Successful')
          expect(res.body).to.have.property('token')
          done()
        })
    })

    // Test Sign in - user does not exist
    it('should return user not found if email does not exist', (done) => {
      request
        .post('/users/signin')
        .send({
          email: 'email@gmail.com',
          password: 'no_password' })
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.message).to.equal('User Not Found')
          done()
        })
    })

    // Test Sign in - email not valid
    it('should return email invalid if email entered is invalid', (done) => {
      request
        .post('/users/signin')
        .send({
          email: 'email@noUser',
          password: 'no_password' })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal('Email Invalid')
          done()
        })
    })

    // Test Sign in - password dont match
    it('should return invalid password if password does not match', (done) => {
      request
        .post('/users/signin')
        .send({
          email: 'joe@ymail.com',
          password: 'no_password' })
        .end((err, res) => {
          expect(res.status).to.equal(401)
          expect(res.body.message).to.equal('Invalid Password')
          done()
        })
    })

    // Test Sign in - password not provided
    it('should return password is required', (done) => {
      request
        .post('/users/signin')
        .send({
          email: 'joe@gmail.com',
          password: '' })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal('Password is required')
          done()
        })
    })

    // Test Sign in - email not provided
    it('should return email is required if no email is provided', (done) => {
      request
        .post('/users/signin')
        .send({
          email: '',
          password: 'passwW4!ord' })
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.message).to.equal('Email is required')
          done()
        })
    })
  })
})
