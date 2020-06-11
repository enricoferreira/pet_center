const EmployeeController = require('../controller/employee-controller');
const employeeController = new EmployeeController();
module.exports = app => {
    app.route(employeeController.route().getPostRoute)
        .get(employeeController.show())
        .post(employeeController.register());
    
    app.route(employeeController.route().deletePutSelectOne)
        .get(employeeController.selectOne())
        .delete(employeeController.remove())
        .put(employeeController.update());
}