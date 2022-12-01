import React, { useState, createContext, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Signup from './Screens/SignUp/Signup';
import Login from './Screens/Login/Login';
import Forgotpass from './Screens/Forgotpass/Forgotpass';
import Course from './Screens/Course/Course';
import Feedback from './Screens/Feedback/Feedback';
import Activity from './Screens/Activity/Activity';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Card from './Screens/Card';
import Home from './Screens/MainPage';
import ActivityQuestions from './Screens/Activity/ActivityQuestions';
export const ContextData = React.createContext();
function App() {
  const [userUid, setUserUid] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  useEffect(() => {
    getAutherUserDetails();
  }, []);
  async function getAutherUserDetails(userValue) {
    const auth = getAuth();
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email
        setUserUid(uid);
        setUserEmail(email)
      } else {
        console.log("User Not Authenticated")
        setUserUid(userValue);
      }
    });
  }
  return (
    <>
      {
        !userUid ?
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/sign" element={<Signup />} />
            <Route path="/ForgotPassword" element={<Forgotpass />} />
          </Routes> :
          <div className="App">
            {
              userUid &&
              <ContextData.Provider value={{
                userUid: userUid,
                setUserUid: setUserUid,
                userEmail: userEmail,
                setUserEmail: setUserEmail

              }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="Course" element={<Course />} />
                  <Route path="FeedBack" element={<Feedback />} />
                  <Route path="Activity" element={<Activity />} />
                </Routes>
              </ContextData.Provider>
            }
          </div>
      }

    </>
  );
}

export default App;
