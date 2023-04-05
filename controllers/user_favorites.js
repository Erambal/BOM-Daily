const client = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getCollection = () => client.getDb().db("cse341").collection('user_favorites');

//functions
//----------------------------------- user_settings
// -------------------------------------------getAllFavorites - Return all Favorites Collection
const getAllFavorites = async (req, res, next) => {
     // #swagger.tags = ['User Favorites']
     // #swagger.description = 'Gets users listed in an array of user IDs. Accessible only by admin user'
     try{
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
        
         result.toArray((err, favorites) => {
             if(err) {
                next(err);
             }
             res.setHeader('Content-Type', 'application/json');
             res.status(200).json(favorites);
         });
     }
     catch(err){
        next(err);
     }
}

const getFavoriteById = async (req, res, next) => {
    // #swagger.tags = ['Favorites']
    // #swagger.description = 'Gets a single favorite by id.'
    try {
        const favoriteId = new ObjectId(req.params.id);
        const result = await getCollection().findOne({
            _id: favoriteId
        });
        
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
        
    } catch (err) {
        next(err);
    }
};

const createFavorite = async(req, res, next) => {
    // #swagger.tags = ['Favoritee']
    // #swagger.description = 'Creates a favoritee. Accessible only by admin user.'
    try {
        const favoritee = {
            user_id: new ObjectId(req.body.user_id),
            scripture_id: new ObjectId(req.body.scripture_id),
        };
        const response = await getCollection().insertOne(favoritee);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            next(response.error || 'An error occurred while creating the favoritee.');
        }
    } catch (err) {
        next(err);
    }
}


const updateFavorite = async (req, res, next) => {
    // #swagger.tags = ['Favorites']
    // #swagger.description = 'Updates a favorite.  Accessible only by admin user.'
    try {
        const favoriteId = new ObjectId(req.params.id);
        // be aware of updateOne if you only want to update specific fields
        const favorite = {
            user_id: new ObjectId(req.body.user_id),
            scripture_id: new ObjectId(req.body.scripture_id),
        };
        const response = await getCollection()
            .replaceOne({
                _id: favoriteId
            }, setting);
        console.log(response);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            next(response.error || new Error('An error occurred while updating the favorite.'));
        }
    } catch (err) {
        next(err);
    }
};

const deleteFavorite = async (req, res,next) => {
    // #swagger.tags = ['Favorites']
    // #swagger.description = 'Deletes a single favorite by id.  Accessible only by admin user.'
    try {
        const favorite = new ObjectId(req.params.id);
        const response = await getCollection()
            .deleteOne({
                _id: favorite
            }, true);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            next(response.error || new Error('An error occurred while deleting the scripture.'));
        }
    } catch (err) {
        next(err);
    }
};


module.exports = { getAllFavorites, getFavoriteById, createFavorite, updateFavorite, deleteFavorite };