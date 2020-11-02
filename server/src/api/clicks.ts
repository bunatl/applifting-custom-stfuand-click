import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

// == import DB connection == 
const db = require('../db/db');
// get or create a collection
const clicks = db.get('clicks');
// import model
const Click = require('../model/Click');

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        // validate input
        const validationResult = await Click.validateAsync(req.body);
        // get entries from DB
        const updatedDoc = await clicks.findOneAndUpdate(
            { team: req.body.team },
            {
                $inc:
                    { clicks: 1 }
            }
        );
        // if null, add
        const firstEntry = updatedDoc
            ? null
            : await clicks.insert({
                team: req.body.team,
                clicks: 1
            },
                { upsert: true }
            );

        res.status(200);
        // depending return either newly create doc or the updated one
        res.json({
            msg: "OK",
            data: !updatedDoc ? firstEntry : updatedDoc
        });

    }
    catch (err) {
        res.status(422);
        res.json({
            msg: "An Error has occcured. For more info see err property.",
            err: err.message
        });
    }
});

module.exports = router;
