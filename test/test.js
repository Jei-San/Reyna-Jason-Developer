/* eslint-disable no-undef */
const assert = require('assert')
const expect = require('chai').expect
const request = require('supertest')('http://localhost:3000/api/pet')
const Pet = require('../app/controllers/petcontroller.js')

describe('PetShop', function () {
  describe('Module Methods', function () {
    // Check that API works
    it('API status OK', async function () {
      const response = await request.get('/')
      expect(response.status).to.eql(200)
    })
    // Check that getAllPets method works
    it('should have a getAllPets Method', function () {
      assert.equal(typeof Pet, 'object')
      assert.equal(typeof Pet.getAllPets, 'function')
    })
    // Check that limits data length to 4
    it('should return all pets, limited to 4 and next page in description', async function () {
      const response = await request.get('?page=1&limit=4')
      expect(response.body.result.length).to.eql(4)
      expect(response.body.description).to.eql('http://localhost:3000/api/pet?page=2&limit=4')
    })
    // Check that getOnePet method works
    it('should have a getOnePet Method', function () {
      assert.equal(typeof Pet, 'object')
      assert.equal(typeof Pet.getOnePet, 'function')
    })
    // Check that a pet can be retrieved
    it('should return a pet', async function () {
      const response = await request.post('/')
        .send({
          name: 'Qerry',
          tag: ''
        })
      const petId = response.body.id

      expect(response.status).to.eql(201)
      const attributes = response.body
      expect(attributes).to.eql({
        id: petId,
        name: 'Qerry',
        tag: ''
      })
      // Here
      const Getresponse = await request.get(`/${petId}`)
      expect(Getresponse.body).to.eql({
        id: petId,
        name: 'Qerry',
        tag: ''
      })

      await request.delete(`/${petId}`)
    })
    // Check that createPet method works
    it('should have a createPet Method', function () {
      assert.equal(typeof Pet, 'object')
      assert.equal(typeof Pet.createPet, 'function')
    })
    // Check that user has to complete name field
    it('should send a validation error', async function () {
      const response = await request.post('/')
        .send({
          name: '',
          tag: ''
        })
      expect(response.status).to.eql(400)
      const attributes = response.body
      expect(attributes).to.eql({
        status: 400,
        message: 'You need to type a Name'
      })
    })
    // Check that user can create a pet
    it('should create the pet', async function () {
      const response = await request.post('/')
        .send({
          name: 'Qerry',
          tag: ''
        })
      const petId = response.body.id

      expect(response.status).to.eql(201)
      const attributes = response.body
      expect(attributes).to.eql({
        id: petId,
        name: 'Qerry',
        tag: ''
      })
      await request.delete(`/${petId}`)
    })
    // Check that updatePet method works
    it('should have a updatePet Method', function () {
      assert.equal(typeof Pet, 'object')
      assert.equal(typeof Pet.updatePet, 'function')
    })
    // Check that deletePet method works
    it('should have a deletePet Method', function () {
      assert.equal(typeof Pet, 'object')
      assert.equal(typeof Pet.deletePet, 'function')
    })
    it('should allow a user to save and delete their pet', async function () {
      // Check that a user can create a pet.
      const postResponse = await request
        .post('/')
        .send({
          name: 'Qerry',
          tag: ''
        })

      expect(postResponse.status).to.eql(201)
      expect(postResponse.body.name).to.eql('Qerry')
      expect(postResponse.body.tag).to.eql('')

      const petId = postResponse.body.id

      // Check that a user can update the tag of the created pet.
      const putResponse = await request
        .put(`/${petId}`)
        .send({
          name: 'Merry',
          tag: 'This is my dog'
        })

      expect(putResponse.status).to.eql(200)
      expect(putResponse.body).to.eql({
        message: `Pet ${petId} has been updated!`,
        petExists: {
          id: `${petId}`,
          name: 'Merry',
          tag: 'This is my dog'
        }
      })

      // Check that a user can delete the created pet.
      const deleteResponse = await request
        .delete(`/${petId}`)

      expect(deleteResponse.status).to.eql(200)
      expect(deleteResponse.body.message).to.eql(`Pet ${petId} has been deleted!`)

      // Verify that the record was deleted.
      const getResponse = await request
        .get(`/${petId}`)

      expect(getResponse.status).to.eql(200)
    })
  })
})
