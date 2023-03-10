const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDb().db().collection('settings').find();
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().db().collection('settings').find({
            _id: userId
        });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (err) {
        res.status(500).json(err);
    }
};

const createSetting = async (req, res) => {
    try {
        const setting = {
            color: req.body.color,
            fontSize: req.body.fontSize,
            timeZone: req.body.timeZone,
            topics: req.body.topics,
            userId: req.body.userId
        };
        const response = await mongodb.getDb().db().collection('settings').insertOne(setting);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'An error occurred while creating the setting.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateSetting = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        // be aware of updateOne if you only want to update specific fields
        const setting = {
            color: req.body.color,
            fontSize: req.body.fontSize,
            timeZone: req.body.timeZone,
            topics: req.body.topics,
            userId: req.body.userId
        };
        const response = await mongodb
            .getDb()
            .db()
            .collection('settings')
            .replaceOne({
                _id: userId
            }, setting);
        console.log(response);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'An error occurred while updating the setting.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteSetting = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDb()
            .db()
            .collection('settings')
            .remove({
                _id: userId
            }, true);
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'An error occurred while deleting the setting.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    getAll,
    getSingle,
    createSetting,
    updateSetting,
    deleteSetting
};