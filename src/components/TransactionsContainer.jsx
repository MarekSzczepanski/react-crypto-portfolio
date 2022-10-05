import {useState} from 'react';
import {useEffect} from 'react';

const TransactionsContainer = ({userId}) => {
    const [transactions, setTransactions] = useState(null);
    useEffect(() => { getTransactions() }, []);

    const getTransactions = () => {
        fetch(`http://localhost:5000/transactions/fetch?id=${userId}` , {
          method: 'GET',
          headers: { 'Content-type': 'application/json'}
        }).then((res) => res.json().then((res) => { setTransactions(res.transactions) }));
    };

    const renderTransactions = () => {
        if (!transactions.length) return false;

        const transaction_divs = [];
        for (let i=0; i<transactions.length; i++) {
            transaction_divs.push(
                <div className='transaction' key={i}>
                    <div className='transaction-field'>{transactions[i].name}</div>
                    <div className='transaction-field'>{transactions[i].ammount}</div>
                    <div className='transaction-field'>{transactions[i].price}</div>
                    <div className='transaction-field'></div>
                </div>
            );
        }
        return transaction_divs;
    };

    return (
        <div className='transactions-container'>
            <div className='transaction-column-tittles'>
                <div className='transaction-column-tittle'>Currency Name</div>
                <div className='transaction-column-tittle'>Currency Ammount</div>
                <div className='transaction-column-tittle'>Currency Price</div>
                <div className='transaction-column-tittle'>Profit (PLN)</div>
            </div>
            {transactions ? renderTransactions() : null}
        </div>
    )
}

export default TransactionsContainer;