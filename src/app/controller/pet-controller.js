const mongoose = require('../database/database');
require('../model/pet');
const Pet = mongoose.model('pet');
require('../model/user');
const User = mongoose.model('user');
mongoose.set('useCreateIndex', true);

class PetController {
    route(){
        return{
            getPostRoute: '/pet',
            deletePutSelectOne: '/pet/:id'
        }
    }

    show(){
        return ((req, res)=>{
            try{
                Pet.find().lean().populate(['user']).then(result=>{
                    console.log(result);                    
                    res.json(result);
                })
            }catch(err){
                res.send(err);
            }
        })
    }

    register(){
        return (async (req, res)=>{
            try{
                const { name, type, breed , user} = req.body;                                
                const pet = await Pet.create({name, type, breed , user});
                pet.save();
                const owner = await User.findOne({'_id': user});
                owner.pets.push(pet);                
                owner.save();
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
                Pet.deleteOne({'_id': id}).then(()=>{
                    res.json({ok: 'Removido com sucesso'})
                }).catch(err=>{
                    res.json(err);
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
                Pet.updateOne({'_id': id}).then((user)=>{
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
                Pet.findOne({'_id': id}).lean().populate(['user']).then(result =>{
                    res.json(result)
                })
            }catch(err){
                res.json(err);
            }
        })
    }
}
module.exports = PetController;