const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Attendance = new Schema({    
    type:{
        type: String,
        required: true        
    },    
    extra_detail:{
        type: String        
    },
    register_date:{
        type: Date,
        default: Date.now(),
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    employee:{
        type: Schema.Types.ObjectId,
        ref: 'employee'
    }
})
mongoose.model('attendance', Attendance);