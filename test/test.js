var assert = require('assert');
var Pet = require ('../app/controllers/petcontroller.js');

describe('PetShop' , function(){
    describe('Module Methods' , function(){
    it('should have a getAllPets Method', function(){
        assert.equal(typeof Pet, 'object');
        assert.equal(typeof Pet.getAllPets, 'function');
        describe('getAllPets Method' , function(){

        })
    });
    it('should have a getOnePet Method', function(){
        assert.equal(typeof Pet, 'object');
        assert.equal(typeof Pet.getOnePet, 'function');
        describe('getOnePet Method' , function(){

        })
    });
    it('should have a createPet Method', function(){
        assert.equal(typeof Pet, 'object');
        assert.equal(typeof Pet.createPet, 'function');
        describe('createPet Method' , function(){

        })
    });
    it('should have a updatePet Method', function(){
        assert.equal(typeof Pet, 'object');
        assert.equal(typeof Pet.updatePet, 'function');
        describe('updatePet Method' , function(){

        })
    });
    it('should have a deletePet Method', function(){
        assert.equal(typeof Pet, 'object');
        assert.equal(typeof Pet.deletePet, 'function');
        describe('deletePet Method' , function(){

        })
    });
    })
})