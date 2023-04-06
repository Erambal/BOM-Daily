const client = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getCollection = () => client.getDb().db("cse341").collection('scriptures');

const getScriptures = async (req, res, next) => {
    // #swagger.tags = ['Scripture']
    // #swagger.description = 'Gets scriptures listed in an array of scripture IDs.'
    try {
        let filters= {};
        const params = req.query;
        for(let prop in params){
            if (Object.hasOwnProperty.call(params, prop)) {
                const value = params[prop];
                //console.log(Array.isArray(value));
                if(Array.isArray(value))
                    filters[prop] = { "$all": value} ;
                else
                    filters[prop] = value;
            }
        }
        console.log(filters);
        const result = await getCollection().find(filters);
        result.toArray().then((list) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list);
        });
    } catch (err) {
       next(err);
    }
};

const getScriptureById = async (req, res, next) => {
    // #swagger.tags = ['Scripture']
    // #swagger.description = 'Gets a single scripture by id.'
    try {
        const scriptureId = new ObjectId(req.params.id);
        const result = await getCollection().findOne({
            _id: scriptureId
        });
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
        
    } catch (err) {
        next(err);
    }
};

const createScripture = async(req, res, next) => {
    // #swagger.tags = ['Scripture']
    // #swagger.description = 'Creates a scripture. Accessible only by admin user.'
    try {
        const scripture = {
            volume: req.body.volume,
            book: req.body.book,
            chapter: req.body.chapter,
            verse: req.body.verse,
            verse_title: req.body.verse_title,
            link: req.body.link,
            text: req.body.text,
            topic: req.body.topic
        };
        const response = await getCollection().insertOne(scripture);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            next(response.error || 'An error occurred while creating the scripture.');
        }
    } catch (err) {
        next(err);
    }
}

const updateScripture = async (req, res, next) => {
    // #swagger.tags = ['Scripture']
    // #swagger.description = 'Updates a scripture.  Accessible only by admin user.'

    //Aaron ts conversion edit:
                // "setting" on line 100 was not defined so I defined it here. We'll
                // need to make sure that it's something we pass in the params.
    const setting = new ObjectId(req.params.setting);
    
    try {
        const scriptureId = new ObjectId(req.params.id);
        // be aware of updateOne if you only want to update specific fields
        const scripture = {
            volume: req.body.volume,
            book: req.body.book,
            chapter: req.body.chapter,
            verse: req.body.verse,
            verse_title: req.body.verse_title,
            link: req.body.link,
            text: req.body.text,
            topic: req.body.topic
        };
        const response = await getCollection()
            .replaceOne({
                _id: scriptureId
            }, setting);
        console.log(response);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            next(response.error || new Error('An error occurred while updating the scripture.'));
        }
    } catch (err) {
        next(err);
    }
};

// const deleteScriptures = async (req, res) => {
//     // #swagger.tags = ['Scripture']
//     // #swagger.description = 'Deletes scriptures listed in an array of scripture IDs.  Accessible only by admin user.'

//     // code goes here
// };
 
const deleteScripture = async (req, res,next) => {
    // #swagger.tags = ['Scripture']
    // #swagger.description = 'Deletes a single scripture by id.  Accessible only by admin user.'
    try {
        const scripture = new ObjectId(req.params.id);
        const response = await getCollection()
            .remove({
                _id: scripture
            }, true);
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            next(response.error || new Error('An error occurred while deleting the scripture.'));
        }
    } catch (err) {
        next(err);
    }
};

// module.exports = { getScriptures, getScripture, createScripture, updateScripture, deleteScriptures, deleteScripture };
module.exports = { getScriptures, getScriptureById, createScripture, updateScripture, deleteScripture };