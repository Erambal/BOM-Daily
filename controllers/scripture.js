const client = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// const getScriptures = async (req, res) => {
//     // #swagger.tags = ['Scripture']
//     // #swagger.description = 'Gets scriptures listed in an array of scripture IDs.'

//     // code goes here
// };

const getScripture = async (req, res) => {
    // #swagger.tags = ['Scripture']
    // #swagger.description = 'Gets a single scripture by id.'

    // code goes here
};

const createScripture = async(req, res) => {
    // #swagger.tags = ['Scripture']
    // #swagger.description = 'Creates a scripture. Accessible only by admin user.'

    // code goes here
}

const updateScripture = async (req, res) => {
    // #swagger.tags = ['Scripture']
    // #swagger.description = 'Updates a scripture.  Accessible only by admin user.'

    // code goes here
};

// const deleteScriptures = async (req, res) => {
//     // #swagger.tags = ['Scripture']
//     // #swagger.description = 'Deletes scriptures listed in an array of scripture IDs.  Accessible only by admin user.'

//     // code goes here
// };
 
const deleteScripture = async (req, res) => {
    // #swagger.tags = ['Scripture']
    // #swagger.description = 'Deletes a single scripture by id.  Accessible only by admin user.'

    // code goes here
};

// module.exports = { getScriptures, getScripture, createScripture, updateScripture, deleteScriptures, deleteScripture };
module.exports = { getScripture, createScripture, updateScripture, deleteScripture };