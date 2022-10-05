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

  return (
    <div className="App">
      <h1>Simple Crypto Portfolio</h1>
      {isLoggedIn ?
        <main>
          <h2>Hello {username}</h2> 
          <AddTransactionForm userId={userId}/>
          <TransactionsContainer userId={userId} />
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
