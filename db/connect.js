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
