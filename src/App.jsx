import './App.css';
import {useState, useEffect} from 'react';

function App() {
  const [allCurrenciesNames, setAllCurrenciesNames] = useState(null);
  const [currencyNamesProposals, setCurrencyNamesProposals] = useState(null);

  useEffect(() => {
    getCurrenciesNames();
  }, [])

  useEffect(() => {
    renderCurrencyNameProposals();
  }, [currencyNamesProposals])

  const getCurrenciesNames = () => {
    fetch("https://api.coingecko.com/api/v3/coins/list")
    .then((res) => res.json()
    .then((res) => {
      setAllCurrenciesNames(res);
    }))
  }

  const showCurrencyNameProposals = (e) => {
    const currencyNameInput = e.target.value;
    const proposals = allCurrenciesNames.filter(proposal => currencyNameInput.toLowerCase() === proposal.name.substring(0, currencyNameInput.length).toLowerCase());
    if (!proposals.length) return;
    setCurrencyNamesProposals(proposals);
    renderCurrencyNameProposals();
  }

  const renderCurrencyNameProposals = () => {
    if (!currencyNamesProposals) return;
    let divs = [];
    for (let i=0; i<currencyNamesProposals.length; i++) {
      if (i>15) break;
      divs.push(<div key={i}>{currencyNamesProposals[i].name}</div>);
    }
    return divs;
  }

  return (
    <div className="App">
      <form>
        <label htmlFor='currency-name'>Cryptocurrency name</label>
        <div className='autocomplete'>
          <input id='currency-name' type='text' onChange={showCurrencyNameProposals}></input>
          {currencyNamesProposals ? renderCurrencyNameProposals() : null}
        </div>
      </form>
    </div>
  );
}

export default App;
