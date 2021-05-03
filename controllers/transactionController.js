const transactionModel = require('../models/TransactionModel');

const findAll = async (req, res) => {
    try {
        const { period } = req.query;
        if (!period) {
            return res.status(400).send({ error: 'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm' });
        }

        const filter = { yearMonth: period };
        const retrievedTransactions = await transactionModel.find(filter);

        res.send({
            length: retrievedTransactions.length,
            transactions: retrievedTransactions
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

const getBalance = async (req, res) => {
    try {
        const { period } = req.query;
        if (!period) {
            return res.status(400).send({ error: 'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm' });
        }

        const filter = { yearMonth: period };
        const retrievedTransactions = await transactionModel.find(filter);

        if (retrievedTransactions) {
            const totalIncomes = retrievedTransactions
                .filter(transaction => transaction.type === "+")
                .reduce((sum, transaction) => sum + transaction.value, 0);

            const totalExpenses = retrievedTransactions
                .filter(transaction => transaction.type === "-")
                .reduce((sum, transaction) => sum + transaction.value, 0);

            const balance = totalIncomes - totalExpenses;

            res.send({
                yearMonth: period,
                balance
            });
        } else {
            res.status(404).send({ message: 'Nenhum registro encontrado' });
        }
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

module.exports = { findAll, getBalance };