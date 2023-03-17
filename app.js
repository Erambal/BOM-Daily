// const express = require('express');
// const bodyParser = require('body-parser');
// const mongodb = require('./db/connect');

// const port = process.env.PORT || 8080;
// const app = express();

// app
//     .use(bodyParser.json())
//     .use((req, res, next) => {
//         res.setHeader('Access-Control-Allow-Origin', '*');
//         // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key');
//         // res.setHeader('Content-Type', 'application/json');
//         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//         next();
//     })
//     .use('/', require('./routes'));

// mongodb.initDb((err) => {
//     if (err) {
//         console.log(err);
//     } else {
//          app.listen(port);
//          console.log(`Connected to DB and listening on ${port}`);
//     }
// });

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db/connect');

const swaggerAutogen = require('swagger-autogen')();

const app = express();
dotenv.config();
const port = process.env.PORT || 3001;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app
    .use(express.json())
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Content-Type','application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use(cors())
    .use('/', require('./routes'));


const start = async () => {
    const connected = await db.connect();    
    app.listen(port, () => {
        if (connected) {
            console.log(`Running on port ${port}`);
        } else {
            console.log(`error - not connected`);
        }
    })
}
start();