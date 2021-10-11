require('dotenv').config()
const db = require('../models/index')
const Pet = db.Pet

// Get all pets
exports.getAllPets = async (req, res) => {
  try {
    const pets = await Pet.findAll()
    // Limit of incoming data turned into integer; queried from the url.
    const limit = Number(req.query.limit)
    // Current page of the data turned into integer; queried from the url.
    const page = Number(req.query.page)
    // Sums 1 to page queried by the user.
    const nextPage = (+page + 1)
    // Validation to max limit requested by the url, being 100.
    if (limit > 100) {
      return res.status(400).send({
        status: 400,
        message: 'Max limit is 100!'
      })
    }
    const url = `${process.env.SERVER_URL}?page=${nextPage}&limit=${limit}`
    // Start of pagination of data
    const startIndex = (page - 1) * limit
    // End of pagination of data
    const endIndex = page * limit
    // Displays the information according to current page
    const result = pets.slice(startIndex, endIndex)
    // Validation to stop displaying a URL
    // if length of data is close to the end
    if (page === Math.ceil(pets.length / limit)) {
      return res.status(200).json({
        result,
        description: 'That\'s all the data!'
      })
    }
    return res.status(200).json({
      result,
      description: `${url}`
    })
  } catch (e) {
    return res.status(500).send({
      status: 500,
      message: `${e}`
    })
  }
}

// Get one pet by pk
exports.getOnePet = async (req, res) => {
  const { id } = req.params

  try {
    const pet = await Pet.findOne({ where: { id } })
    return res.status(200).json(pet)
  } catch (e) {
    return res.status(500).send({
      status: 500,
      message: `${e}`
    })
  }
}

// Create a pet
exports.createPet = async (req, res) => {
  const { name, tag } = req.body

  // Validation to see if different from name,
  // Example: empty string: ''
  if (!name) {
    return res.status(400).send({
      status: 400,
      message: 'You need to type a Name'
    })
  }
  try {
    // Sets values for new pet object
    // and creates it in the database
    const newPet = await Pet.create({
      name,
      tag
    })
    return res.status(201).send(newPet)
  } catch (e) {
    return res.status(500).send({
      status: 500,
      message: `${e}`
    })
  }
}

// Update a pet
exports.updatePet = async (req, res) => {
  const { name, tag } = req.body
  const { id } = req.params

  // Looks for a pet with the id provided
  const petExists = await Pet.findOne({
    where: {
      id
    }
  })
  // Validation to see if pet exists
  if (!petExists) {
    return res.status(400).send({
      status: 400,
      message: `No pet exists with the id ${id}`
    })
  }
  try {
    // Changes old values for new values for the
    // existing pet in the database
    if (name) {
      petExists.name = name
    }
    if (tag) {
      petExists.tag = tag
    }
    petExists.save()
    return res.status(200).send({
      message: `Pet ${id} has been updated!`,
      petExists: {
        id: id,
        name: 'Merry',
        tag: 'This is my dog'
      }
    })
  } catch (e) {
    return res.status(500).send({
      status: 500,
      message: `${e}`
    })
  }
}

// Delete a pet
exports.deletePet = async (req, res) => {
  const { id } = req.params

  // Looks for a pet with the id provided
  const petExists = await Pet.findOne({
    where: {
      id
    }
  })
  // Validation to see if pet exists
  if (!petExists) {
    return res.status(400).send({
      status: 400,
      message: `No pet exists with the id ${id}`
    })
  }
  try {
    // Deletes pet from database
    petExists.destroy()
    return res.status(200).send({
      message: `Pet ${id} has been deleted!`
    })
  } catch (e) {
    return res.status(500).send({
      status: 500,
      message: `${e}`
    })
  }
}
