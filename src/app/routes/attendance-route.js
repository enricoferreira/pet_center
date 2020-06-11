const Attendance = require('../controller/attendance-controller');
const attendance = new Attendance();
module.exports = app =>{
    app.route(attendance.route().getPostRoute)
        .get(attendance.show())
        .post(attendance.register());
    
    app.route(attendance.route().deletePutSelectOne)
        .get(attendance.selectOne())
        .delete(attendance.remove())
        .put(attendance.update());
}