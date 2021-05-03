const express = require('express');
const controller = require('../controllers/transactionController');

const transactionRouter = express.Router();

transactionRouter.get('/', controller.findAll);
transactionRouter.get('/balance', controller.getBalance);
transactionRouter.get('/totalExpenses', controller.getTotalExpenses);
transactionRouter.post('/income', controller.createIncome);
transactionRouter.post('/expense', controller.createExpense);

module.exports = transactionRouter;
