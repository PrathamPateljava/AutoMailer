import logo from './logo.svg';
import googleSignIn from './Components/googleSignIn';
import './App.css';

function App() {
  return (
    <div className="App">
      <a href={googleSignIn}>
        login
      </a>
    </div>
  );
}

export default App;
