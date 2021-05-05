import React from 'react'
import { formatCurrency, padLeftTwoDigits } from '../helpers/numberHelpers';

const DESPESA = '-';
const VERMELHO = 'red';
const VERDE = 'green';

const Transaction = ({ transaction }) => {
    const { day, category, description, value, type } = transaction;

    const transactionColorClass = () => type === DESPESA ? VERMELHO : VERDE;

    return (
        <div className={`collection-item ${transactionColorClass()}`}>
            <div className="row valing-wrapper" style={{ display: "flex", alignItems: "center" }}>
                <div className="col s1" style={{ fontWeight: "bold", fontSize: "2em" }}>{padLeftTwoDigits(day)}</div>
                <div className="col s6" style={{ display: "flex", flexDirection: "column" }} >
                    <span style={{ fontWeight: "bold" }}>{category}</span>
                    <span>{description}</span>
                </div>
                <div className="col s3" style={{ fontSize: "2em", textAlign: 'right' }}>{formatCurrency(value)}</div>
                <div className="col s2 right-align">
                    <a href="#!">
                        <i className="material-icons" style={{ color: "black" }}>edit</i>
                    </a>
                    <a href="#!">
                        <i className="material-icons" style={{ color: "black" }}>delete</i>
                    </a></div>
            </div>
        </div>
    )
}

export default Transaction
