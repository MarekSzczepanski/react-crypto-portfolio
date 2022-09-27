import {useState, useEffect} from 'react';

function CurrencyNameInput() {
    const [allNames, setAllNames] = useState(null);
    const [namesProposals, setNamesProposals] = useState(null);
    const [currencyName, setCurrencyName] = useState(null);

    useEffect(() => {
        getCurrenciesNames();
    }, [])

    useEffect(() => {
        renderCurrencyNameProposals();
    }, [namesProposals])

    const handleCurrencyNameChange = (e) => {
        setCurrencyName(e.target.value || e.target.textContent);
        checkCurrencyNameProposals(e);
    }

    const getCurrenciesNames = () => {
        fetch("https://api.coingecko.com/api/v3/coins/list")
        .then((res) => res.json()
        .then((res) => {
          setAllNames(res);
        }))
    }

    const checkCurrencyNameProposals = (e) => {
        const currencyNameInput = e.target.value || e.target.textContent;
        const proposals = allNames.filter(proposal => currencyNameInput.toLowerCase() === proposal.name.substring(0, currencyNameInput.length).toLowerCase());
        if (!proposals.length) return;
        setNamesProposals(proposals);
        renderCurrencyNameProposals();
    }

    const renderCurrencyNameProposals = () => {
        if (!namesProposals) return false;
        let proposals = [];
        for (let i=0; i<namesProposals.length; i++) {
          if (i>15) break;
          if (currencyName !== namesProposals[i].name) {
            proposals.push(<div className='proposal' key={i} onClick={(e) => handleCurrencyNameChange(e)}>{namesProposals[i].name}</div>);
          } 
        }
        return proposals;
    }

    return (
        <div className='autocomplete'>
            <input id='currency-name' type='text' onChange={handleCurrencyNameChange} value={currencyName ? currencyName : ''} />
            {namesProposals ? renderCurrencyNameProposals() : null}
          </div>
    )
}

export default CurrencyNameInput;