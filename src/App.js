import logo from './logo.svg';
import './App.css';
import Signup from './Screens/SignUp/Signup';
import Login from './Screens/Login/Login';
import Forgotpass from './Screens/Forgotpass/Forgotpass';
function App() {
  return (
    <>
   <div className='app'>
    <Login/>
    <Signup/>
    <Forgotpass/>
    </div>
    </>
  );
}

export default App;
