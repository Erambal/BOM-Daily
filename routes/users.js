// req's
const exp = require('express');
const dbConnect = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;


//functions
//----------------------------------- User
// -------------------------------------------getAllUsers - Return all Users Collection
const getAllUsers = async (req, res, next) => {
    const result = await dbConnect.getDb().db().collection('users').find();

    result.toArray((err, users) => {
        if(err) {
            res.status(400).json({message: err})
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
}

// -------------------------------------------postUser - Add individual user to Users collection
const postUser = async (req, res, next) => {
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
        img: req.body.img
    };

    const result = await dbConnect.getDb().db().collection('users').insterOne(newUser);
    if (result.acknowledged) {
        res.status(200).json(result);
    } else {
        res.status(500).json(response.error || 'We seem to have a problem with your submission.')
    };

}
// -------------------------------------------putUser - Update individual user by their ID
const putUser = async (req, res, next) => {
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
        img: req.body.img
    };

    const result = await dbConnect.getDb().db().collection('users').replaceOne({_id: id}, updateUser);
    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(501).json(response.error || 'We seem to have a problem with your submission.')
    };

}

// -------------------------------------------getUserId - Pull a specific user by their ID
const getUserId = async (req, res, next) => {
    const id = new ObjectId(req.params.id);
    
    const result = await dbConnect.getDb().db().collection('users').findOne(id);
    if (result.acknowledged) {
        res.status(202).json(result);
    } else {
        res.status(502).json(response.error || 'We seem to have a problem with your submission.')
    };

}

// deleteUserId - Delete individual user by ID
const deleteUserId = async (req, res, next) => {
    const id = new ObjectId(req.params.id);
    const result = await dbConnect.getDb().db().collection('users').deleteOne(id);

    if (result.acknowledged) {
        res.status(203).json(result);
    } else {
        res.status(503).json(response.error || 'We seem to have a problem with your submission.')
    };
    
}

// getUsername
const getUsername = async (req, res, next) => {
    const username = new ObjectId(req.params.username);

    const result = await dbConnect.getDb.db().collection('users').findOne(username);

    if (result.acknowledged) {
        res.status(204).json(result);
    } else {
        res.status(504).json(response.error || 'We seem to have a problem with your submission.')
    };
    
}

// putUsername
const putUsername = async (req, res, next) => {
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
        img: req.body.img
    };

    const result = await dbConnect.getDb().db().collection('users').replaceOne({_id: id}, {username: username}, updateUser);
    
    if (result.acknowledged) {
        res.status(205).json(result);
    } else {
        res.status(505).json(response.error || 'We seem to have a problem with your submission.')
    };

}

// deleteUsername
const deleteUsername = async (req, res, next) => {
    const username = new ObjectId(req.params.username);

    const result = await dbConnect.getDb().db().collection('users').replaceOne(username);
     
    if (result.acknowledged) {
        res.status(206).json(result);
    } else {
        res.status(506).json(response.error || 'We seem to have a problem with your submission.')
    };
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