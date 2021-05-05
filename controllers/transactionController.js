const TransactionModel = require('../models/TransactionModel');
const transactionModel = require('../models/TransactionModel');

const findAll = async (req, res) => {
    try {
        const { period, description, category } = req.query;
        if (!period) {
            return res.status(400).send({ error: 'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm' });
        }

        const filter = { yearMonth: period };
        
        if (description) {
            filter.description = { $regex: description, $options: 'i' };
        }

        if (category) {
            filter.category = { $regex: category, $options: 'i' };
        }

        console.log(filter);
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

const getTotalExpenses = async (req, res) => {
    try {
        const { period, description, category } = req.query;
        if (!period) {
            return res.status(400).send({ error: 'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm' });
        }

        const filter = { yearMonth: period };
        
        if (description) {
            filter.description = { $regex: description, $options: 'i' };
        }

        if (category) {
            filter.category = { $regex: category, $options: 'i' };
        }

        console.log(filter);
        const retrievedTransactions = await transactionModel.find(filter);

        const totalExpenses = retrievedTransactions
            .filter(transaction => transaction.type = '-')
            .reduce((sum, transaction) => sum + transaction.value, 0);

        res.send({
            yearMonth: period,
            totalExpenses
        });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

const createIncome = async (req, res) => {
    try {
        const { value, yearMonthDay, description } = req.body;
        const [year, month, day] = yearMonthDay.split('-');
        const yearMonth = `${year}-${month}`;
        const category = 'Receita';
        const type = '+';

        const newTransactionIncome = new TransactionModel({ value, description, category, yearMonthDay, yearMonth, year, month, day, type });
        await newTransactionIncome.save();

        res.send({ message: 'Receita inserida com sucesso.' });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

const createExpense = async (req, res) => {
    try {
        const { value, yearMonthDay, description, category } = req.body;
        const [year, month, day] = yearMonthDay.split('-');
        const yearMonth = `${year}-${month}`;
        const type = '-';

        const newTransactionIncome = new TransactionModel({ value, description, category, yearMonthDay, yearMonth, year, month, day, type });
        await newTransactionIncome.save();

        res.send({ message: 'Despesa inserida com sucesso.' });
    } catch (err) {
        res.status(400).send({ message: err.message });
    }
};

module.exports = { findAll, getBalance, getTotalExpenses, createIncome, createExpense };