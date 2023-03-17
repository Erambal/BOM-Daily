const client = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// const getUsers = async (req, res) => {
//     // #swagger.tags = ['User']
//     // #swagger.description = 'Gets users listed in an array of user IDs. Accessible only by admin user'

//     const result = await dbConnect.getDb().db('cse341').collection('user').find();
 
//     result.toArray((err, users) => {
//         if(err) {
//             res.status(400).json({message: err})
//         }
//         res.setHeader('Content-Type', 'application/json');
//         res.status(200).json(users);
//     });

// }

const getUser = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Gets a single user by id. Admin user can get any user.'

    const userId = new ObjectId(req.params.id);
    
    const db = await client.getDb().db('cse341');
    const collection = db.collection('user');
    const cursor = collection.find({ _id: userId });
    const document = await cursor.toArray(); 
    
  res.status(200).json(document);

}
    // if (document.acknowledged) {
    //     res.status(202).json(document);
    // } else {
    //     res.status(502).json(document.error || 'WHATISHAPPENING!')
    // };
// }

const createUser = async(req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Creates a user. Admin user can create any user.'

    // code goes here
}

const updateUser = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Updates a user. Admin user can update any user.'

    // code goes here
};

// const deleteUsers = async (req, res) => {
//     // #swagger.tags = ['User']
//     // #swagger.description = 'Deletes users listed in an array of user IDs. Accessible only by admin user.'

//     // code goes here
// };
 
const deleteUser = async (req, res) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Deletes a single user by id. Admin user can delete any user.'

    // code goes here
};

// module.exports = { getUsers, getUser, createUser, updateUser, deleteUsers, deleteUser };
module.exports = { getUser, createUser, updateUser, deleteUser };