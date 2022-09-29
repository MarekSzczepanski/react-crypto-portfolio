import './App.css';
import {useState} from 'react';
import CurrencyNameInput from './components/CurrencyNameInput';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const registerUser = (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-password-confirm').value;

    fetch('http://localhost:5000/auth/register' , {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword
      })
    })

    .then((info) => { console.log(info); })
  }

  return (
    <div className="App">
      <h1>Simple Crypto Portfolio</h1>
      {isLoggedIn ? 
        <form className='add-currency'>
          <div className='input-container'>
            <label htmlFor='currency-name'>Cryptocurrency name</label>
            <CurrencyNameInput/>
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
        <main>
          <form onSubmit={registerUser}>
            <h2>Register</h2>
            <div className='input-container'>
              <label htmlFor='register-name'>Username:</label>
              <input id='register-name' type='text'/>
            </div>
            <div className='input-container'>
              <label htmlFor='register-email'>Email:</label>
              <input id='register-email' type='email'/>
            </div>
            <div className='input-container'>
              <label htmlFor='register-password'>Password:</label>
              <input id='register-password' type='password'/>
            </div>
            <div className='input-container'>
              <label htmlFor='register-password-confirm'>Confirm password:</label>
              <input id='register-password-confirm' type='password'/>
            </div>
            <button type='submit'>Register</button>
          </form>
        </main>
      }
    </div>
  );
}

export default App;
