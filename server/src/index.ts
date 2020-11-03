import express from "express";
import cors from "cors";
import helmet from 'helmet';

require('dotenv').config();
const morgan = require('morgan');
const app = express();

const Leaderboard = require('./api/leaderboard');
const Clicks = require('./api/clicks');

/* 
    For security reasons
    Removes X-Powered-by: Express header
    Add/mask other header properties 
*/
app.use(helmet());
app.use(morgan('dev'));

// CORS policy
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

// recognize the incoming Request Object as a JSON Object
app.use(express.json());

/* == Routing, middlewares == */
app.use('/api/leaderboard', Leaderboard);
app.use('/api/click', Clicks);

const errorHandler = require('./errorHandler');
//if no previous route corresponds
app.use(errorHandler.notFound);
// handle all erros
app.use(errorHandler.errors);

/* == Listen == */
const port: number = parseInt(process.env.PORT!) || 4444;
app.listen(port, '127.0.0.1', () => {
    console.log(`listening on port: ${port}`);
});