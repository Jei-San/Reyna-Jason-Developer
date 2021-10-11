module.exports = (app) => {
    //Call to controller
    const pet = require("../controllers/petcontroller.js");

    //Express router
    var router = require("express").Router();
  
    //Get all pets route
    router.get("/", pet.getAllPets);

    //Get one pet by id route
    router.get("/:id", pet.getOnePet);

    //Create a pet route
    router.post("/", pet.createPet);

    //Update a pet
    router.put("/:id", pet.updatePet);

    //Delete a pet
    router.delete("/:id", pet.deletePet);
  
    //Pet request route
    app.use("/api/pet", router);
  };
  