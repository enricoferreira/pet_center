const mongoose = require('../database/database');
require('../model/employee');
const Employee = mongoose.model('employee');
require('../model/attendance');
const attendance = mongoose.model('attendance');
const moment = require('moment');

class EmployeeController{
    route(){
        return {
            getPostRoute: '/employee',
            deletePutSelectOne: '/employee/:id'
        }
    }

    show(){
        return ((req, res)=>{
            try{
                Employee.find().populate(['attendance']).lean().then(results =>{
                    results.forEach(register => {
                        register.birthday = moment(register.birthday).format('DD/MM/YYYY');
                    })
                    res.render('lists/employee', {
                        results,
                        layout: 'list',
                        title: 'Lista de Funcionários'
                    })
                })
            }catch(err){
                res.json(err)
            }
        })
    }

    register(){
        return (async (req, res)=>{
            try{
                const { name, birthday, gender, type } = req.body;
                const employee = await Employee.create({name, birthday, gender, type});
                await employee.save();
                res.json({ok: "Funcionario cadastrado com sucesso"});
            }catch(err){
                res.status(400).json(err);
            }
        })
    }

    remove(){
        return (async (req, res)=>{
            try{
                const id = req.params.id;
                await Employee.deleteOne({'_id': id}).then(()=>{
                    res.json({ok: 'Funcionario Excluido com sucesso'});
                })
            }catch(err){
                res.status(400).json(err);
            }
        })
    }

    selectOne(){
        return (async (req, res)=>{
            try{
                const id = req.params.id;
                await Employee.findOne({'_id': id}).then(result =>{
                    res.json(result);
                })
            }catch(err){
                res.json(err);
            }
        })
    }

    update(){
        return((req, res)=>{
            res.json('Ok')
        })
    }
}
module.exports = EmployeeController;