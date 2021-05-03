const express = require('express');
const controller = require('../controllers/transactionController');

const transactionRouter = express.Router();

transactionRouter.get('/', controller.findAll);
transactionRouter.get('/balance', controller.getBalance);

module.exports = transactionRouter;
