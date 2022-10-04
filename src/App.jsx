import './App.css';
import {useState} from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AddTransactionForm from './components/AddTransactionForm';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState(null);

  return (
    <div className="App">
      <h1>Simple Crypto Portfolio</h1>
      {isLoggedIn ?
        <main>
          <h2>Hello {username}</h2> 
          <AddTransactionForm />
        </main>
      :
      <>
        <LoginForm setIsLoggedIn={setIsLoggedIn} setUsername={setUsername}/>
        <RegisterForm />
      </>
      }
    </div>
  );
}

export default App;
