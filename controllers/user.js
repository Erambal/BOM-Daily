// req's
const dbConnect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


//functions
//----------------------------------- User
// -------------------------------------------getAllUsers - Return all Users Collection
const getAllUsers = async (req, res, next) => {
     // #swagger.tags = ['User']
     // #swagger.description = 'Gets users listed in an array of user IDs. Accessible only by admin user'
    try {
        const result = await dbConnect.getDb().db('cse341').collection('user').find();
    
        result.toArray((err, users) => {
            if(err) {
                res.status(400).json({message: err})
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users);
        });
    } catch (error) {
        next(err)
    }
}

// -------------------------------------------postUser - Add individual user to Users collection
const postUser = async (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Creates a user. Admin user can create any user.'
    try {
        const newUser = {
            //THIS IS A PLACEHOLDER, WE NEED TO UPDATE THIS
            username: req.body.username,
            fname: req.body.fName,
            lname: req.body.lName,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            email: req.body.email,
            phone: req.body.phone,
            img: req.body.img, 
            admin: req.body.admin,
            // setting: {
            //     color: req.body.setting.color,
            //     font: req.body.setting.font,
            //     time: req.body.setting.time,
            //     topic: req.body.setting.topic,
            //     favorite_list: req.body.setting.favorite_list
            // }
        };

        const result = await dbConnect.getDb().db('cse341').collection('user').insertOne(newUser);
        if (result.acknowledged) {
            res.status(200).json(result);
        } else {
            next(response.error || new Error('We seem to have a problem with your submission.'))
        };
    } catch (error) {
        next(err)
    }
}
// -------------------------------------------putUser - Update individual user by their ID
const putUser = async (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Updates a user. Admin user can update any user.'
    try{
        const id = new ObjectId(req.params.id)
        const updateUser = {
            //THIS IS A PLACEHOLDER, WE NEED TO UPDATE THIS
            username: req.body.username,
            fname: req.body.fName,
            lname: req.body.lName,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            email: req.body.email,
            phone: req.body.phone,
            img: req.body.img,
            admin: req.body.admin,
            // setting: {
            //     color: req.body.setting.color,
            //     font: req.body.setting.font,
            //     time: req.body.setting.time,
            //     topic: req.body.setting.topic,
            //     favorite_list: req.body.setting.favorite_list
            // }
        };

        const result = await dbConnect.getDb().db('cse341').collection('user').replaceOne({_id: id}, updateUser);
        if (result.acknowledged) {
            res.status(201).json(result);
        } else {
            next(response.error || new Error('We seem to have a problem with your submission.'))
        };
    } catch (error) {
        next(err)
    }

}

// -------------------------------------------getUserId - Pull a specific user by their ID
const getUserId = async (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Gets a single user by id. Admin user can get any user.'

    try {
        const id = new ObjectId(req.params.id);
        
        const result = await dbConnect.getDb().db('cse341').collection('user').findOne(id);
        if (result.acknowledged) {
            res.status(202).json(result);
        } else {
            next(response.error || new Error('We seem to have a problem with your submission.'))
        };
    } catch (error) {
        next(err)
    }
}

// -------------------------------------------deleteUserId - Delete individual user by ID
const deleteUserId = async (req, res, next) => {
    // #swagger.tags = ['User']
    // #swagger.description = 'Deletes users listed in an array of user IDs. Accessible only by admin user.'
    try{
        const id = new ObjectId(req.params.id);
        const result = await dbConnect.getDb().db('cse341').collection('user').deleteOne(id);

        if (result.acknowledged) {
            res.status(203).json(result);
        } else {
            next(response.error || new Error('We seem to have a problem with your submission.'))
        };
    } catch (error) {
        next(err)
    }
}

// -------------------------------------------getUsername
const getUsername = async (req, res, next) => {
    // #swagger.tags = ['Username']
    // #swagger.description = 'Gets usernames listed in an array of user profiles.'
    try{
        const username = new ObjectId(req.params.username);
    
        const result = await dbConnect.getDb.db('cse341').collection('user').findOne(username);
        console.log(result);
    
        if (result.acknowledged) {
            res.status(204).json(result);
        } else {
            next(response.error || new Error('We seem to have a problem with your submission.'))
        };
    } catch (error) {
        next(err)
    }
    
}

// putUsername
const putUsername = async (req, res, next) => {
    // #swagger.tags = ['Username']
    // #swagger.description = 'Update a users Username.'
    try{
        const id = new ObjectId(req.params.id);
        const updateUsername = new ObjectId(req.params.username);
        const updateUser = {
            //THIS IS A PLACEHOLDER, WE NEED TO UPDATE THIS
            username: updateUsername,
            fname: req.body.fName,
            lname: req.body.lName,
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            email: req.body.email,
            phone: req.body.phone,
            img: req.body.img,  
            admin: req.body.admin,
            // setting: {
            //     color: req.body.setting.color,
            //     font: req.body.setting.font,
            //     time: req.body.setting.time,
            //     topic: req.body.setting.topic,
            //     favorite_list: req.body.setting.favorite_list
            // } 
        };

        const result = await dbConnect.getDb().db('cse341').collection('user').replaceOne({_id: id}, {username: username}, updateUser);
        
        if (result.acknowledged) {
            res.status(205).json(result);
        } else {
            next(response.error || new Error('We seem to have a problem with your submission.'))
        };
    } catch (error) {
        next(err)
    }
}

// deleteUsername
const deleteUsername = async (req, res, next) => {
    // #swagger.tags = ['Username']
    // #swagger.description = 'Deletes users based on username'
    try{
        const username = new ObjectId(req.params.username);

        const result = await dbConnect.getDb().db('cse341').collection('user').replaceOne(username);
        
        if (result.acknowledged) {
            res.status(206).json(result);
        } else {
            next(response.error || new Error('We seem to have a problem with your submission.'))
        };
    } catch (error) {
        next(err)
    }
}

//exports
module.exports = {
    getAllUsers,
    postUser,
    putUser,
    getUserId,
    deleteUserId,
    getUsername,
    putUsername,
    deleteUsername
}
