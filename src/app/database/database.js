const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/pet_center', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Conectado ao Banco pet_center com sucesso!');
}).catch(err =>{
    console.log(err);
})

module.exports = mongoose;