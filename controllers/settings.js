const client = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getCollection = () => client.getDb().db("cse341").collection('settings');

const getAll = async (req, res, next) => {
    // #swagger.tags = ['Settings']
    // #swagger.description = 'Gets settings listed in an array of settings.'
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
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    } catch (err) {
        next(err);
    }
};

const getSingle = async (req, res, next) => {
    // #swagger.tags = ['Settings']
    // #swagger.description = 'Gets a single Setting by id.'

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
        next(err);
    }
};

const createSetting = async (req, res, next) => {
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
        next(err);
    }
};

const updateSetting = async (req, res, next) => {
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
        next(err);
    }
};

const deleteSetting = async (req, res, next) => {
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
        next(err);
    }
};

module.exports = {
    getAll,
    getSingle,
    createSetting,
    updateSetting,
    deleteSetting
};