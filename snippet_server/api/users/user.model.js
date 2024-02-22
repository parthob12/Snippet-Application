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
})
UserSchema.virtual('snippets',{
    ref: 'Snippet',
    localField: '_id',
    foreignField: 'user_id'

})

UserSchema.virtual('bookmarks',{
    ref: 'Bookmark',
    localField: '_id',
    foreignField: 'user_id'

})
module.exports = mongoose.model('User', UserSchema)