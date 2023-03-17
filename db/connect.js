// const dotenv = require('dotenv');
// dotenv.config();
// const MongoClient = require('mongodb').MongoClient;

// let _db;

// const initDb = (callback) => {
//     if (_db) {
//         console.log('Db is already initialized!');
//         return callback(null, _db);
//     }
//     MongoClient.connect(process.env.MONGODB_URI)
//         .then((client) => {
//             _db = client;
//             callback(null, _db);
//         })
//         .catch((err) => {
//             callback(err);
//         });
// };

// const getDb = () => {
//     if (!_db) {
//         throw Error('Db not initialized');
//     }
//     return _db;
// };

// module.exports = {
//     initDb,
//     getDb,
// };

const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

let _db;

async function connect() {
    dotenv.config();
    const uri = process.env.DB_URI;
    const client = new MongoClient(uri);
    try {
        await client.connect();
        _db = client;
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
}


function getDb () {
    return _db;
}

module.exports = { connect, getDb };
