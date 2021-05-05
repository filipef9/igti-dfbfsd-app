import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Transaction from './components/Transaction';
import { padLeftTwoDigits } from './helpers/numberHelpers';

const App = () => {
  const API_URL = 'https://3001-tomato-badger-6bghk6od.ws-us03.gitpod.io';

  const getPeriodFrom = (aDate) => `${aDate.getFullYear()}-${padLeftTwoDigits(aDate.getMonth() + 1)}`;

  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [totalTransactions, setTotalTransactions] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const today = new Date();

        const result = await axios.get(
          `${API_URL}/api/transaction`,
          {
            params: { period: getPeriodFrom(today) }
          }
        );

        const { length, transactions } = result.data
        setSelectedTransactions(Object.assign([], transactions));
        setTotalTransactions(length);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchTransactions();
  }, [])

  return (
    <div className="container">
      <h1 className="center-align">Desafio Final do Bootcamp Full Stack</h1>
      <h2 className="center-align">Controle Financeiro Pessoal</h2>

      <ul className="collection">
        {selectedTransactions.map(transaction =>
          <Transaction key={transaction._id} transaction={transaction} />
        )}
      </ul>
    </div >
  );
}

export default App;