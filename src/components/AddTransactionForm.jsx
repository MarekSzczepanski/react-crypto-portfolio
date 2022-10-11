import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';

const AddTransactionForm = ({userId, setTransactionAdded}) => {
    const [allNames, setAllNames] = useState(null);
    const [namesProposals, setNamesProposals] = useState(null);
    const [currencyName, setCurrencyName] = useState('');
    const [ammount, setAmmount] = useState('');
    const [price, setPrice] = useState('');
    const [currencyId, setCurrencyId] = useState('');

    useEffect(() => { getCurrenciesNames() }, []);
    useEffect(() => { renderCurrencyNameProposals() }, [namesProposals]);

    const handleTransactionDataChange = (e) => {
        const nameOrProposal = e.target.id === 'currency-name' || e.target.classList.contains('proposal');
        const ammount = document.getElementById('currency-ammount');
        const price = document.getElementById('currency-price');

        if (nameOrProposal) {
            const proposalId = e.target.dataset.currency_id;
            if (proposalId) {
                setCurrencyId(proposalId);
                return setCurrencyName(e.target.textContent);
            }
            setCurrencyId(null);
            checkCurrencyNameProposals(e);
            return setCurrencyName(e.target.value);
        } 
        if (e.target === ammount) return setAmmount(ammount.value);
        if (e.target === price) return setPrice(price.value);
    };

    const getCurrenciesNames = () => {
        fetch('https://api.coingecko.com/api/v3/coins/list').then(res => res.json().then(res => setAllNames(res)));
    };

    const checkCurrencyNameProposals = (e) => {
        const currencyNameInput = e.target.value || e.target.textContent;
        const proposals = allNames.filter(proposal => currencyNameInput.toLowerCase() === proposal.name.substring(0, currencyNameInput.length).toLowerCase());

        if (!proposals.length) return setNamesProposals(null);

        setNamesProposals(proposals);
        renderCurrencyNameProposals();
    };

    const renderCurrencyNameProposals = () => {
        if (!namesProposals) return false;
        
        let proposals = [];
        for (let i=0; i<namesProposals.length; i++) {
          if (i > 10) break;
          if (currencyName !== namesProposals[i].name) {
            proposals.push(<div className='proposal' key={i} data-currency_id={namesProposals[i].id} onClick={(e) => handleTransactionDataChange(e)}>{namesProposals[i].name}</div>);
          } 
        }
        return proposals;
    };

    const addTransaction = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:5000/transactions/add' , {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                currencyName,
                ammount,
                price,
                userId,
                currencyId
            })
        }).then(res => res.json().then(res => { if (res) setTransactionAdded(true) }));
    };

    return (
        <form className='add-currency' onSubmit={addTransaction}>
            <div className='input-container'>
                <div className='autocomplete'>
                    <TextField id='currency-name' label='Crypto name' variant='standard' type='text' value={currencyName} autoComplete="off" onChange={(e) => handleTransactionDataChange(e)} onBlur={() => setNamesProposals(null)}/>
                    {namesProposals ? renderCurrencyNameProposals() : null}
                </div>
            </div>
            <div className='input-container'>
                <TextField id='currency-ammount' label='Ammount' variant='standard' type='text' value={ammount} autoComplete="off" onChange={(e) => handleTransactionDataChange(e)}/>
            </div>
            <div className='input-container'>
                <TextField id='currency-price' label='Price' variant='standard' type='text' value={price} autoComplete="off" onChange={(e) => handleTransactionDataChange(e)}/>
            </div>
            <Button className='add-transaction' variant='contained' type='submit'>Add transaction</Button>
        </form>
    )
}

export default AddTransactionForm;