import './App.css';
import {useState} from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AddTransactionForm from './components/AddTransactionForm';
import { useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (isLoggedIn) getTransactions();
  }, [isLoggedIn])

  const getTransactions = () => {
    fetch(`http://localhost:5000/transactions/fetch?id=${userId}` , {
            method: "GET",
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then((res) => res.json()
        .then((res) => {
            console.log(res)
        }))
  }

  return (
    <div className="App">
      <h1>Simple Crypto Portfolio</h1>
      {isLoggedIn ?
        <main>
          <h2>Hello {username}</h2> 
          <AddTransactionForm userId={userId}/>
          <div className='transactions-container'>
            
          </div>
        </main>
      :
      <>
        <LoginForm setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setUserId={setUserId}/>
        <RegisterForm />
      </>
      }
    </div>
  );
}

export default App;
