import {useState} from 'react';
import {useEffect} from 'react';

const AddTransactionForm = ({userId}) => {
    const [allNames, setAllNames] = useState(null);
    const [namesProposals, setNamesProposals] = useState(null);
    const [currencyName, setCurrencyName] = useState('');
    const [ammount, setAmmount] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        getCurrenciesNames();
    }, []);

    useEffect(() => {
        renderCurrencyNameProposals();
    }, [namesProposals]);

    const handleTransactionDataChange = (e) => {
        const nameOrProposal = e.target.parentNode.classList.contains('autocomplete');
        const ammount = document.getElementById('currency-ammount');
        const price = document.getElementById('currency-price');

        if (nameOrProposal) {
            checkCurrencyNameProposals(e);
            return setCurrencyName(e.target.value || e.target.textContent);
        } 
        if (e.target === ammount) return setAmmount(ammount.value);
        if (e.target === price) return setPrice(price.value);
    };

    const getCurrenciesNames = () => {
        fetch("https://api.coingecko.com/api/v3/coins/list")
        .then((res) => res.json()
        .then((res) => {
          setAllNames(res);
        }));
    };

    const checkCurrencyNameProposals = (e) => {
        const currencyNameInput = e.target.value || e.target.textContent;
        const proposals = allNames.filter(proposal => currencyNameInput.toLowerCase() === proposal.name.substring(0, currencyNameInput.length).toLowerCase());

        if (!proposals.length) return;

        setNamesProposals(proposals);
        renderCurrencyNameProposals();
    };

    const renderCurrencyNameProposals = () => {
        if (!namesProposals) return false;
        
        let proposals = [];
        for (let i=0; i<namesProposals.length; i++) {
          if (i > 10) break;
          if (currencyName !== namesProposals[i].name) {
            proposals.push(<div className='proposal' key={i} onClick={(e) => handleTransactionDataChange(e)}>{namesProposals[i].name}</div>);
          } 
        }
        return proposals;
    };

    const addTransaction = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:5000/transactions/add' , {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                currencyName,
                ammount,
                price,
                userId
            })
        })
        .then((res) => res.json()
        .then((res) => {
            if (res) {
                
            } 
        }))
    };

    return (
        <form className='add-currency' onSubmit={addTransaction}>
            <div className='input-container'>
                <label htmlFor='currency-name'>Cryptocurrency name</label>
                <div className='autocomplete'>
                    <input id='currency-name' type='text' value={currencyName} onChange={(e) => handleTransactionDataChange(e)}/>
                    {namesProposals ? renderCurrencyNameProposals() : null}
                </div>
            </div>
            <div className='input-container'>
                <label htmlFor='currency-ammount'>Cryptocurrency ammount</label>
                <input id='currency-ammount' type='text' value={ammount} onChange={(e) => handleTransactionDataChange(e)}/>
            </div>
            <div className='input-container'>
                <label htmlFor='currency-price'>Cryptocurrency price</label>
                <input id='currency-price' type='text' value={price} onChange={(e) => handleTransactionDataChange(e)}/>
            </div>
            <button className='add-transaction' type='submit'>Add transaction</button>
        </form>
    )
}

export default AddTransactionForm;