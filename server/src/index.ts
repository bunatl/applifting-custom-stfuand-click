import express, { Request, Response } from "express";
import cors from "cors";
const morgan = require('morgan');
const helmet = require('helmet');
require('dotenv').config();

const Leaderboard = require('./api/leaderboard');
const Clicks = require('./api/clicks');

const app = express();

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