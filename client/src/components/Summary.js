import React from 'react'
import { formatCurrency } from '../helpers/numberHelpers';
import css from './summary.module.css';

const Summary = ({ totalTransactions, totalIncomes, totalExpenses, balance }) => {
    return (
        <div className="row">
            <div className="col s3">
                <span className={css['font-weight-bold']}>Lançamentos: </span>
                <span>{totalTransactions}</span>
            </div>
            <div className="col s3">
                <span className={css['font-weight-bold']}>Receitas: </span>
                <span className="green-text">{formatCurrency(totalIncomes)}</span>
            </div>
            <div className="col s3">
                <span className={css['font-weight-bold']}>Despesas: </span>
                <span className="red-text">{formatCurrency(totalExpenses)}</span>
            </div>
            <div className="col s3">
                <span className={css['font-weight-bold']}>Saldo: </span>
                <span>{formatCurrency(balance)}</span>
            </div>
        </div>
    )
}

export default Summary
