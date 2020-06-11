const PetController = require('../controller/pet-controller');
const petController = new PetController();

module.exports = app =>{
    app.route(petController.route().getPostRoute)
        .get(petController.show())
        .post(petController.register());
    
    app.route(petController.route().deletePutSelectOne)
        .get(petController.selectOne())
        .delete(petController.remove())
        .put(petController.update())

}