import NameProposal from './NameProposal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';

const AddTransactionForm = ({userId, setTransactionAdded, manageMessage}) => {
    const [allNames, setAllNames] = useState(null);
    const [namesProposals, setNamesProposals] = useState(null);
    const [currencyName, setCurrencyName] = useState('');
    const [ammount, setAmmount] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => { getCurrenciesNames() }, []);

    const handleNameInputChange = (e) => {
        checkCurrencyNameProposals(e);
        setCurrencyName(e.target.value); 
    };

    const handleProposalClick = (e) => {
        setCurrencyName(e.target.textContent);
        setNamesProposals(null);
    }

    const getCurrenciesNames = () => {
        fetch('https://api.coingecko.com/api/v3/coins/list').then(res => res.json().then(res => setAllNames(res)));
    };

    const checkCurrencyNameProposals = (e) => {
        const currencyNameInput = e.target.value || e.target.textContent;
        const proposals = allNames.filter(proposal => currencyNameInput.toLowerCase() === proposal.name.substring(0, currencyNameInput.length).toLowerCase());

        if (!proposals.length) return setNamesProposals(null);

        setNamesProposals(proposals);
    };

    const addTransaction = (e) => {
        e.preventDefault();

        const findInputedName = allNames.find(name => name.name.toLowerCase() === currencyName.toLowerCase());
        if (!findInputedName) return manageMessage('error', 'This currency doesn\'t exist.');
        
        const nameToSend = findInputedName.name;
        if (nameToSend) setCurrencyName(nameToSend);
        else return manageMessage('error', 'Something went wrong...');

        if (isNaN(Number(ammount)) || Number(ammount) < 0 || isNaN(Number(price)) || Number(price) < 0) return manageMessage('error', 'Ammount and price must be valid numbers.');
        
        fetch(`https://crypto.vyost.usermd.net:60332/transactions/add` , {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: nameToSend,
                ammount,
                price,
                userId,
                currencyId: findInputedName.id
            })
        }).then(res => res.json().then(res => { if (res) setTransactionAdded(true) }));
    };

    return (
        <form className='add-currency' onSubmit={addTransaction}>
            <div className='input-container'>
                <div className='autocomplete'>
                    <TextField id='currency-name' label='Crypto name' variant='standard' type='text' value={currencyName} autoComplete="off" onChange={(e) => handleNameInputChange(e)} onBlur={(e) => e.relatedTarget ? setNamesProposals(null) : null}/>
                    {namesProposals ? namesProposals.map((proposal, i) => {
                        return i < 10 ? <NameProposal currencyId={proposal.id} name={proposal.name} handleProposalClick={(e) => handleProposalClick(e)} key={i} /> : null
                    }) : null}
                </div>
            </div>
            <div className='input-container'>
                <TextField id='currency-ammount' label='Ammount' variant='standard' type='text' value={ammount} autoComplete="off" onChange={(e) => setAmmount(e.target.value)}/>
            </div>
            <div className='input-container'>
                <TextField id='currency-price' label='Price' variant='standard' type='text' value={price} autoComplete="off" onChange={(e) => setPrice(e.target.value)}/>
            </div>
            <Button className='add-transaction' variant='contained' type='submit'>Add transaction</Button>
        </form>
    )
}

export default AddTransactionForm;