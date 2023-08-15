
const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    User_ID: {
        type: Number,
        required: true,
        unique: true,
        maxlength: 200
    },
    Gender:{
        type: String,
        required: true,
        unique: true,
        maxlength: 10
    },
    Age: {
        type: Number,
        required: true,
    },
    EstimatedSalary: {
        type: Number , 
        required: true
    }  
})

module.exports = mongoose.model("users", UserSchema);