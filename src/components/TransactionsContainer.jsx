import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {useState, useEffect} from 'react';

const TransactionsContainer = ({userId, transactionAdded, setTransactionAdded}) => {
    const [transactions, setTransactions] = useState(null);
    const [currentPricesFetched, setCurrentPricesFetched] = useState(null);
    const [transactionsWithCurrentPrices, setTransactionsWithCurrentPrices] = useState(null);
    const [totalProfit, setTotalProfit] = useState(null);

    useEffect(() => { getTransactions() }, []);
    useEffect(() => { 
        if (transactions) return getCurrentPrices(); 
        if (transactionAdded) getTransactions();
    }, [transactions]);
    useEffect(() => { if (currentPricesFetched) setCurrentPricesForTransactions(currentPricesFetched) }, [currentPricesFetched]);
    useEffect(() => { if (transactionAdded) setTransactions(null)}, [transactionAdded]);
    useEffect(() => { if (transactionsWithCurrentPrices) countTotalProfit()}, [transactionsWithCurrentPrices]);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const getTransactions = () => {
        if (transactions) return;
        if (transactionAdded) setTransactionAdded(false);

        fetch(`http://localhost:5000/transactions/fetch?id=${userId}`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json'}
        }).then(res => res.json().then(res => setTransactions(res.transactions)));
    };

    const getCurrentPrices = () => {
        const currenciesIds = transactions.map(transaction => transaction.currency_id);
        fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${currenciesIds}&vs_currencies=pln`, {
            method: 'GET',
            headers: { 'Content-type': 'application/json'}
        }).then(res => res.json().then((res) => setCurrentPricesFetched(res)));
    };

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
    };

    const countTotalProfit = () => {
        const profits = document.querySelectorAll('[data-profit]');
        let total = 0;
        
        for (let i=0; i<profits.length; i++) {
            if (!isNaN(Number(profits[i].textContent))) total += Number(profits[i].textContent);
        }

        setTotalProfit(total.toFixed(2));
    };

    const renderTransactions = () => {
        if (!transactions) return;
        
        const transaction_divs = [];
        for (let i=0; i<transactions.length; i++) {
            const transaction = transactions[i];
            const ammount = Number(transaction.ammount);
            const boughtFor = Number(transaction.price);
            const calcProfit = ammount * transaction.currentPrice - ammount * boughtFor;

            transaction_divs.push(
                <StyledTableRow className='transaction' key={i} data-currency_id={transaction.currency_id}>
                    <StyledTableCell className='transaction-field' component="th" scope="row">{transaction.name}</StyledTableCell>
                    <StyledTableCell className='transaction-field' data-currency_ammount='' component="th" scope="row">{ammount}</StyledTableCell>
                    <StyledTableCell className='transaction-field' data-currency_price='' component="th" scope="row">{boughtFor}</StyledTableCell>
                    <StyledTableCell className={`transaction-field profit ${calcProfit > 0 ? 'profit-plus' : 'profit-minus'}`} data-profit='' component="th" scope="row" align="right">{isNaN(calcProfit) ? '?' : calcProfit.toFixed(2)}</StyledTableCell>
                </StyledTableRow>
            );
        }
        return transaction_divs;
    };

    return (
        <>
        <Table aria-label="customized table">
            <TableHead>
                <TableRow>
                    <StyledTableCell className='transaction-column-tittle' align="left">Currency Name</StyledTableCell>
                    <StyledTableCell className='transaction-column-tittle' align="left">Currency Ammount</StyledTableCell>
                    <StyledTableCell className='transaction-column-tittle' align="left">Currency Price</StyledTableCell>
                    <StyledTableCell className='transaction-column-tittle' align="right">Profit (PLN)</StyledTableCell>
                 </TableRow>
            </TableHead>
            <TableBody>
                {transactionsWithCurrentPrices ? renderTransactions() : null}
                <tr className='total-profit-row'>
                    <StyledTableCell className={`total-profit ${totalProfit > 0 ? 'profit-plus' : 'profit-minus'}`} component="th" colspan="4" align="right">{totalProfit}</StyledTableCell>
                </tr>
            </TableBody>
        </Table>
        </>
    );
}

export default TransactionsContainer;