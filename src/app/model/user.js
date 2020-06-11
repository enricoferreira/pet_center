const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name:{
        type: String,
        required: true
    },
    birthday:{
        type: Date,
        required: true
    },
    cpf: {
        type: String,
        minlength: 11,
        maxlength: 11,
        required: true,
        unique: true 
    },
    pets: [{
        type: Schema.Types.ObjectId,
        ref: 'pet'
    }]
})

mongoose.model('user', User);