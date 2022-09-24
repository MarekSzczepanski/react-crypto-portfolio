import './App.css';
import {useEffect} from 'react';

function App() {
  const all_currencies_names = [];

  useEffect(() => {
    getCurrenciesNames();
  }, [])

  const getCurrenciesNames = () => {
    fetch("https://api.coingecko.com/api/v3/coins/list")
    .then((res) => res.json()
    .then((res) => {
      for (let i=0; i<res.length; i++) {
        all_currencies_names.push(res[i])
      }
      console.log(all_currencies_names)
    }))
  }

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
