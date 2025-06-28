const Snippet = require('./snippet.model')
const util = require('../util')


// get all users 
const getSnippets = async (req, res) => {
    const { query } = req;
    const language = query.language;
    const includeBookmarks = util.queryToBoolean(query.bookmarks)

    let filter = {};
    if (language) {
        filter = { programming_language: { $regex: language, $options: 'i' } };
    }

    try {
        const snippets = await Snippet.find(filter);
        res.json(snippets);
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
};



// get snippet by id 
const getSnippetsById = async (req, res)=> { 
    const {params,query} = req;
    const id = params.id;
    const includeBookmarks = util.queryToBoolean(query.bookamrks)

    let snippet = null
  
        // Inculde bookmarks
        try {
            if (includeBookmarks) {
                snippet = await Snippet.findById({_id: id}).populate('bookamarks')
            } else {
                snippet = await Snippet.findById({ _id: id})
                
            }

            if (snippet) {
                res.json(snippet)
            } else {
                res.status(404).json({error: `No bookmark found for id: ${id}` })
            }

        } catch (error) {
            res.status(500).json({error: error.toString()});
        }

}

// add snippet 
const createSnippet = async (req, res) => {
    const { body } = req;
  
    try {
      const snippetDoc = new Snippet({...body, created: new Date().toISOString() });
      await snippetDoc.save();
      res.json(snippetDoc);
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  }


// delete snippet 

const deleteSnippet = async (req,res) =>{
    const {params} = req
    const id = params.id 

    try{
        const deleted = await Snippet.findOneAndDelete({_id:id}).populate(['bookmarks'])

        if (deleted){
            res.json({message: 'success', snippet: deleted._id})
        }else{
            res.status(404).json({error : `No snippet found by id : ${id}`})
        }

    }catch{
        res.status(500).json({error: error.toString()});
    }
    
}

module.exports = {
    getSnippets,
    getSnippetsById,
    createSnippet,
    deleteSnippet
}
