const client = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getCollection = () => client.getDb().db().collection('scriptures');

const getScriptures = async (req, res) => {
    // #swagger.tags = ['Scripture']
    // #swagger.description = 'Gets scriptures listed in an array of scripture IDs.'
    try {
        const result = await getCollection().find();
        result.toArray().then((list) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(list);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
};

const getScriptureById = async (req, res) => {
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
        console.log(err);
        res.status(500).json(err);
    }
};

const createScripture = async(req, res) => {
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
            res.status(500).json(response.error || 'An error occurred while creating the scripture.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const updateScripture = async (req, res) => {
    // #swagger.tags = ['Scripture']
    // #swagger.description = 'Updates a scripture.  Accessible only by admin user.'
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
            res.status(500).json(response.error || 'An error occurred while updating the scripture.');
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
};

// const deleteScriptures = async (req, res) => {
//     // #swagger.tags = ['Scripture']
//     // #swagger.description = 'Deletes scriptures listed in an array of scripture IDs.  Accessible only by admin user.'

//     // code goes here
// };
 
const deleteScripture = async (req, res) => {
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
            res.status(500).json(response.error || 'An error occurred while deleting the scripture.');
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

// module.exports = { getScriptures, getScripture, createScripture, updateScripture, deleteScriptures, deleteScripture };
module.exports = { getScriptures, getScriptureById, createScripture, updateScripture, deleteScripture };