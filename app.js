const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./db/connect');
const { handleError } = require('./middleware/error-handling')

const swaggerAutogen = require('swagger-autogen')();

const app = express();
dotenv.config();
const port = process.env.PORT || 3001;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app
    .use(express.json())
    .use(cors())
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
    // Router
    .use('/', require('./routes'))
    // Handling Errors
    .use(handleError);


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