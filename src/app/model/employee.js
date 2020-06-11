const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee = new Schema({
    name:{
        type: String,
        required: true
    },
    birthday:{
        type: Date,
        required: true
    },    
    gender:{
        type: String,
        default: 'Undefined'        
    },
    type:{
        type: String,
        required: true        
    },    
    register_date:{
        type: Date,
        default: Date.now(),
        required: true
    },
    attendance:[{
        type: Schema.Types.ObjectId,
        ref: 'attendance'
    }]
})
mongoose.model('employee', Employee);