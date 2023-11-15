const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required:true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true 
    },

    years_experience: Number,

    programming_languages: [String]
}, {
    toJSON:{virtuals : true},
    toObject : {virtuals: true}
