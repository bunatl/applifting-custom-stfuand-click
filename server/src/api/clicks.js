const express = require('express');
const router = express.Router();

// == import DB connection == 
const db = require('../db/db');
// get or create a collection
const clicks = db.get('clicks');
// import model
const Click = require('../model/Click');

router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        // validate input
        const validationResult = await Click.validateAsync(req.body);
        // get entries from DB
        clicks
            .findOneAndUpdate(
                { team: req.body.team },
                {
                    $inc:
                        { clicks: 1 }
                }
            )
            .then(async updatedDoc => {
                let firstEntry;
                // if null, add
                if (!updatedDoc)
                    firstEntry = await clicks.insert({
                        team: req.body.team,
                        clicks: 1
                    },
                        { upsert: true }
                    );

                // depending return either newly create doc or the updated one
                res.json({
                    msg: "OK",
                    data: !updatedDoc ? firstEntry : updatedDoc
                });
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
