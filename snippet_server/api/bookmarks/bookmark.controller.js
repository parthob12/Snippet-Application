const Bookmark = require('./bookmark.model')
const util = require('../util')



const createBookmark = async (req, res) => {
    const { body } = req;

    try {
        const bookmark = await Bookmark.create(body);
        res.json(bookmark);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}


const deleteBookmark = async (req, res) => {
    const {params} = req
    const id = params.id 

    try{
        const deleted = await Bookmark.findOneAndDelete({_id:id})
        if (deleted){
            res.json({message: 'success', bookmark: deleted._id})
        }else{
            res.status(404).json({error : `No bookmark found by id : ${id}`})
        }

    }catch{
        res.status(500).json({error: error.toString()});
    }
}

module.exports = {
    createBookmark,
    deleteBookmark
}