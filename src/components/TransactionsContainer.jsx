import {useState, useEffect} from 'react';

const TransactionsContainer = ({userId, transactionAdded, setTransactionAdded}) => {
    const [transactions, setTransactions] = useState(null);
    const [currentPricesFetched, setCurrentPricesFetched] = useState(null);
    const [transactionsWithCurrentPrices, setTransactionsWithCurrentPrices] = useState(null);

    useEffect(() => { getTransactions() }, []);
    useEffect(() => { 
        if (transactions) return getCurrentPrices(); 
        if (transactionAdded) getTransactions();
    }, [transactions]);
    useEffect(() => { if (currentPricesFetched) setCurrentPricesForTransactions(currentPricesFetched) }, [currentPricesFetched]);
    useEffect(() => { if (transactionAdded) setTransactions(null)}, [transactionAdded]);

    const getTransactions = () => {
        if (transactions) return;
        if (transactionAdded) setTransactionAdded(false);

        fetch(`http://localhost:5000/transactions/fetch?id=${userId}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json'}
        }).then(res => res.json().then(res => setTransactions(res.transactions)));
    }

    const getCurrentPrices = () => {
        const currenciesIds = transactions.map(transaction => transaction.currency_id);
        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${currenciesIds}&vs_currencies=pln`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json'}
        }).then(res => res.json().then((res) => setCurrentPricesFetched(res)));
    }

    const setCurrentPricesForTransactions = (prices) => {
        const currencyNames = Object.keys(prices);
        const currentPrices = Object.values(prices).map(value => value.pln);
        const updatedTransactions = [];
        
        for (let i=0; i<transactions.length; i++) {
            const indexOfCurrentPrice = currencyNames.findIndex(name => name === transactions[i].currency_id);
            updatedTransactions.push(transactions[i]);
            updatedTransactions[i].currentPrice = currentPrices[indexOfCurrentPrice];
        }

        setTransactionsWithCurrentPrices(updatedTransactions);
    }

    const renderTransactions = () => {
        if (!transactions) return;
        
        const transaction_divs = [];
        for (let i=0; i<transactions.length; i++) {
            const transaction = transactions[i];
            const ammount = Number(transaction.ammount);
            const boughtFor = Number(transaction.price);

            transaction_divs.push(
                <div className='transaction' key={i} data-currency_id={transaction.currency_id}>
                    <div className='transaction-field'>{transaction.name}</div>
                    <div className='transaction-field' data-currency_ammount={''}>{ammount}</div>
                    <div className='transaction-field' data-currency_price={''}>{boughtFor}</div>
                    <div className='transaction-field'>{ammount * transaction.currentPrice - ammount * boughtFor}</div>
                </div>
            );
        }
        return transaction_divs;
    }

    return (
        <div className='transactions-container'>
            <div className='transaction-column-tittles'>
                <div className='transaction-column-tittle'>Currency Name</div>
                <div className='transaction-column-tittle'>Currency Ammount</div>
                <div className='transaction-column-tittle'>Currency Price</div>
                <div className='transaction-column-tittle'>Profit (PLN)</div>
            </div>
            {transactionsWithCurrentPrices ? renderTransactions() : null}
        </div>
    )
}

export default TransactionsContainer;