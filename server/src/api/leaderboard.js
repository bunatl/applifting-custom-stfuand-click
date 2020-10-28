const express = require('express');
const router = express.Router();

// == import DB connection == 
const db = require('../db/db');
// get or create a collection
const clicks = db.get('clicks');

router.get('/', async (req, res, next) => {
    try {
        // get entries from DB
        const doc = await clicks.aggregate([
            { $sort: { clicks: -1 } },
            { $limit: 10 }
        ]);
        res.json({
            msg: "Your request has been processed.",
            response: doc
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
