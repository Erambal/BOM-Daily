const clientSettings = require('../db/connect');
const settingsId = require('mongodb').ObjectId;

const getSettings = () => clientSettings.getDb().db("cse341").collection('settings');

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
        const result = await getSettings().find(filters);
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
        const settingId = new settingsId(req.params.id);
        const result = await getSettings().find({
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
    // #swagger.tags = ['Settings']
    // #swagger.description = 'Create a new Setting.'

    try {
        const setting = {
            name: req.body.name,
            code: req.body.code,
            options: req.body.options
        };
        const response = await getSettings().insertOne(setting);
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
    // #swagger.tags = ['Settings']
    // #swagger.description = 'Updates existing Setting.'

    try {
        const settingId = new settingsId(req.params.id);
        // be aware of updateOne if you only want to update specific fields
        const setting = {
            name: req.body.name,
            code: req.body.code,
            options: req.body.options
        };
        const response = await getSettings()
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
    // #swagger.tags = ['Settings']
    // #swagger.description = 'Deletes existing Setting.'

    try {
        const settingId = new settingsId(req.params.id);
        const response = await getSettings()
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