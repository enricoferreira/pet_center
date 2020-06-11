const petRoute = require('./pet-route');
const userRoute = require('./user-route');
const employeeRoute = require('./employee-route');
const attendanceRoute = require('./attendance-route');

module.exports = app => {
    petRoute(app);
    userRoute(app);
    employeeRoute(app);
    attendanceRoute(app);
}