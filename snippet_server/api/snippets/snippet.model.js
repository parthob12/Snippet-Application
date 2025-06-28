const mongoose = require('mongoose')


const SnippetSchema = new mongoose.Schema({
 
    title: String,

    code_snippet: String,

    programming_language: String,

    code_snippet: String,

    created: {
        type: Date,
        default: Date.now
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    years_experience: Number,

    programming_languages: String
},   {
    toJSON:{virtuals : true},
    toObject : {virtuals: true}
})

SnippetSchema.virtual('bookmarks',{
    ref: 'Bookmark',
    localField: '_id',
    foreignField: 'snippet_id'

})

// post hook - remove bookmarks 
SnippetSchema.post('findOneAndDelete', async function (doc){
    const Bookmark = mongoose.model('Bookmark')
    try{
        await Bookmark.deleteMany({ snippet_id: doc._id })
        console.log('Bookmarks associated with snippet "deleted" ')
    }catch(error){
        console.log('Bookmarks associated with snippet "could not be deleted"')
    }

})


module.exports = mongoose.model('Snippet', SnippetSchema);