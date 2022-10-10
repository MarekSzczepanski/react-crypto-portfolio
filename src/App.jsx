import './App.css';
import {useState} from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionsContainer from './components/TransactionsContainer';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [transactionAdded, setTransactionAdded] = useState(false);

  return (
    <div className='App'>
      <h1>Simple Crypto Portfolio</h1>
      {isLoggedIn ?
        <main className='wrap'>
          <h2 className='hello'>Hello {username}!</h2> 
          <AddTransactionForm userId={userId} setTransactionAdded={setTransactionAdded} />
          <TransactionsContainer userId={userId} transactionAdded={transactionAdded} setTransactionAdded={setTransactionAdded} / >
        </main>
      :
      <main className='sign-forms-container'>
        <LoginForm setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setUserId={setUserId}/>
        <RegisterForm />
      </main>
      }
    </div>
  );
}

export default App;
