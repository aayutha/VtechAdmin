import './App.css';
import Signup from './Screens/SignUp/Signup';
import Login from './Screens/Login/Login';
import Forgotpass from './Screens/Forgotpass/Forgotpass';
import Course from './Screens/Course/Course';
import Feedback from './Screens/Feedback/Feedback';
import Activity from './Screens/Activity/Activity';
function App() {
  return (
    <>
      <div className='app'>
        {/* <Login /> */}
        {/* <Forgotpass /> */}
        {/* <Signup /> */}
        <Course />
        {/* <Feedback /> */}
        {/* <Activity /> */}
      </div>
    </>
  );
}

export default App;
