const mongoose = require('../database/database');
require('../model/attendance');
const Attendance = mongoose.model('attendance');
require('../model/employee');
const Employee = mongoose.model('employee');
class AttendanceController{

    route(){
        return{
            getPostRoute: '/attendance',
            deletePutSelectOne: '/attendance/:id'
        }
    }

    show(){
        return ((req, res)=>{
            try{
                Attendance.find().lean().populate(['employee']).then(result =>{
                    res.json(result);
                }).catch(err =>{
                    res.json(err);
                })
            }catch(err){
                res.status(400).json(err);
            }
        })
    }

    register(){
        return (async (req, res)=>{
            try{
                const { type, price, employee } = req.body;
                const attendance = await Attendance.create({type, price, employee});
                await attendance.save();
                const employeeModel = await Employee.findOne({'_id': employee});
                employeeModel.attendance.push(attendance);
                employeeModel.save();
                res.json({ok: 'Atendimento cadastrado com sucesso'})
            }catch(err){
                res.status(400).json(err);
            }
        })
    }

    remove(){
        return ((req, res)=>{
            try{
                const id = req.params.id;
                Attendance.deleteOne({'_id': id}).then(()=>{
                    res.json({ok: 'Atendimento removido com sucesso'});
                }).catch(err =>{
                    res.status(400).json(err);
                })
            }catch(err){
                res.status(400).json(err);
            }
        })
    }

    selectOne(){
        return ((req, res)=>{
            try{
                const id = req.params.id;
                Attendance.find({'_id': id}).populate(['employee']).lean().then(result =>{
                    res.json(result);
                }).catch(err=>{
                    res.json(err);
                })
            }catch(err){
                res.status(400).json(err);
            }
        })
    }

    update(){
        return ((req, res)=>{
            res.json({ok: 'Atualizado'})
        })
    }
}
module.exports = AttendanceController;