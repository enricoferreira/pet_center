const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Pet = new Schema({
    name:{
        type: String,
        required: true
    },
    birthday:{
        type: Date,
        // required: true
    },
    weight:{
        type: Number,
        // required: true
    },        
    type:{
        type: String,
        required: true        
    },
    height:{
        type: Number,
        // required: true
    },
    breed:{
        type: String,
        required: true,
        default: 'Mixed'
    },
    tags: [{
        type: String
    }],
    user:[{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }],
    attendance:{
        type: Schema.Types.ObjectId,
        ref: 'attendance'
    },
    register_date:{
        type: Date,
        default: Date.now(),
        required: true
    }
})
mongoose.model('pet', Pet);