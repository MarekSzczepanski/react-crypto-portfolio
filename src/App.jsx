import './App.css';
import CurrencyNameInput from './components/CurrencyNameInput';

function App() {
  return (
    <div className="App">
      <form className='add-currency'>
        <div className='input-container'>
          <label htmlFor='currency-name'>Cryptocurrency name</label>
          <CurrencyNameInput/>
        </div>
        <div className='input-container'>
          <label htmlFor='currency-ammount'>Cryptocurrency ammount</label>
          <input id='currency-ammount' type='text' />
        </div>
        <div className='input-container'>
          <label htmlFor='currency-price'>Cryptocurrency price</label>
          <input id='currency-price' type='text' />
        </div>
      </form>
    </div>
  );
}

export default App;
