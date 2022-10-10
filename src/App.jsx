import './App.css';
import { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AddTransactionForm from './components/AddTransactionForm';
import TransactionsContainer from './components/TransactionsContainer';
import Alert from '@mui/material/Alert';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);
  const [transactionAdded, setTransactionAdded] = useState(false);
  const [displayMessage, setDisplayMessage] = useState({
    display: false,
    severity: '',
    content: ''
  });

  const manageMessage = (severity, content) => {
    setDisplayMessage({ display: true, severity, content});
    setTimeout(() => { setDisplayMessage({ display: false, severity, content}) }, 2000);
    setTimeout(() => { setDisplayMessage({ display: false, severity: '', content: ''}) }, 4000);
  } 

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
        <LoginForm setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} setUserId={setUserId} manageMessage={manageMessage}/>
        <RegisterForm manageMessage={manageMessage} />
        <Alert className={`register-message ${displayMessage.display ? 'show-register-message' : ''}`} severity={displayMessage.severity}>
            {displayMessage.content}
        </Alert>
      </main>
      }
    </div>
  );
}

export default App;
