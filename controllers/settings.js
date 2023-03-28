const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getCollection = () => client.getDb().db("cse341").collection('settings');

const getAll = async (req, res) => {
    try {
        const result = await getCollection().find();
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
        const settingId = new ObjectId(req.params.id);
        const result = await getCollection().find({
            _id: settingId
        });
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);
        });
    } catch (err) {
        console.log(err);
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
            settingId: req.body.settingId
        };
        const response = await getCollection().insertOne(setting);
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
        const settingId = new ObjectId(req.params.id);
        // be aware of updateOne if you only want to update specific fields
        const setting = {
            color: req.body.color,
            fontSize: req.body.fontSize,
            timeZone: req.body.timeZone,
            topics: req.body.topics,
            settingId: req.body.settingId
        };
        const response = await getCollection()
            .replaceOne({
                _id: settingId
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
        const settingId = new ObjectId(req.params.id);
        const response = await getCollection()
            .remove({
                _id: settingId
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
    //getSingleByName,
    createSetting,
    updateSetting,
    deleteSetting
};