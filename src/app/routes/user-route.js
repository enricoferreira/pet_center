const UserController = require('../controller/user-controller');
const userController = new UserController();

module.exports = app => {
    app.route(userController.route().getPost)
        .get(userController.show())
        .post(userController.register());

    app.route(userController.route().deletePutSelectOne)
        .get(userController.selectOne())
        .delete(userController.remove())
        .put(userController.update());
}

