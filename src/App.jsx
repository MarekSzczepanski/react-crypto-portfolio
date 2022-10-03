import './App.css';
import {useState} from 'react';
import CurrencyNameInput from './components/CurrencyNameInput';
import RegisterForm from './components/RegisterForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      <h1>Simple Crypto Portfolio</h1>
      {isLoggedIn ? 
        <form className='add-currency'>
          <div className='input-container'>
            <label htmlFor='currency-name'>Cryptocurrency name</label>
            <CurrencyNameInput />
          </div>
          <div className='input-container'>
            <label htmlFor='currency-ammount'>Cryptocurrency ammount</label>
            <input id='currency-ammount' type='text'/>
          </div>
          <div className='input-container'>
            <label htmlFor='currency-price'>Cryptocurrency price</label>
            <input id='currency-price' type='text'/>
          </div>
        </form> 
      :
        <RegisterForm />
      }
    </div>
  );
}

export default App;
