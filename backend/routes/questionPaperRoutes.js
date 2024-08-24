const express = require('express');
const router = express.Router();
const controller = require('../controllers/questionPaperRoutesController')

router.get('/:paper_id',controller.getPaperController)
      .post("/generate-paper",controller.generatePaperController)


module.exports = router;
