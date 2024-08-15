const express = require('express');
const router = express.Router();
const questionPapers = require('../models/papersModel');
const mongoose= require('mongoose')

router.get('/:paper_id', async (req, res, next) => {
    try {
        const paper_id = req.params.paper_id;
        if (!mongoose.Types.ObjectId.isValid(paper_id)) {
            const err = new Error('Invalid ID format');
            res.status(400)
            throw err;
        }
        const paper = await questionPapers.findById(paper_id);
        if (!paper) {
            const err = new Error('Paper was not found in the db');
            res.status = 404;
            throw err;
        }
        res.json(paper);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
