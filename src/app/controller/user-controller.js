const mongoose = require('../database/database');
require('../model/user');
const User = mongoose.model('user');
require('../model/pet');
const Pet = mongoose.model('pet');
mongoose.set('useCreateIndex', true);

class UserController{
    route(){
        return{
            getPost: '/user',
            deletePutSelectOne: '/user/:id'
        }
    }

    show(){
        return ((req, res)=>{
            try{
                User.find().populate(['pets']).lean().then(result=>{
                    res.send(result);
                })
            }catch(err){
                res.send(err);
            }
        })
    }

    register(){
        return (async (req, res)=>{
            try{
                const { name, birthday, cpf , pets} = req.body;                                
                const user = await User.create({name, birthday, cpf, pets});
                user.save();
                console.log(user);                
                res.json({ok: 'Cadastrado com sucesso'});
            }catch(err){
                res.status(400).json(err)
            }
        })
    }

    remove(){
        return (async(req, res)=>{
            try{
                const id = req.params.id;
                await Pet.deleteMany({'user': {$in: id}}).then(async result=>{   
                    await User.deleteOne({'_id': id}).then((errUser, rej)=>{
                        res.json({ok: 'Exclusão de cliente e pet com sucesso'});
                    }).catch(err=>{
                        console.log(err);
                        res.json({err: 'Erro na deleção de cliente'});
                    })                    
                }).catch(err=>{
                    console.log(err);
                    res.json({err: 'Erro na deleção de Pet'});
                })
            }catch(err){
                res.status(400).json({err: 'Erro na remoção'})
            }
        })
    }

    update(){
        return (async (req, res)=>{
            try{
                const id = req.params.id;
                User.updateOne({'_id': id}).then((user)=>{
                    res.json()
                }).catch(err => {
                    res.json(err)
                })
            }catch(err){
                res.json(err);
            }
        })
    }

    selectOne(){
        return (async (req, res)=>{
            try{
                const id = req.params.id;
                User.findOne({'_id': id}).lean().populate(['pets']).then(result =>{
                    res.json(result)
                })
            }catch(err){
                res.json(err);
            }
        })
    }
    
}
module.exports = UserController;