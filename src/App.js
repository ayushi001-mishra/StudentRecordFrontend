import React, { useState } from 'react';
import axios from "axios";
import './style.css';
import Home from './components/Home';
import LoginForm from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Student from './components/Student'
import {baseURLUser} from './configurations';
import User from './components/User';
import Role from './components/Role';
 
function App() {
 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');
  const [manageUser, setManageUser] = useState(false);
  const [manageRole, setManageRole] = useState(false);
 
  const handleLogin = (userId, role) => {
    setIsLoggedIn(true);
    setUserRole(role);
 
    axios.get(baseURLUser+`/${userId}`)
      .then((result) => {
        console.log(result);
        setUserName(result.data[0].name);
    })
    .catch((error)=>{
      console.error(error);
  })
  };
 
  return (
    <div>
      {/* <Home/> */}
      <Navbar/>
      {!isLoggedIn ?
      (
        <LoginForm onLogin={handleLogin} />
      )
      :
      (userRole === 'admin' ?
        (
          (!manageUser && !manageRole)?
          (
          <Home userName={userName} userRole={userRole} setIsLoggedIn={setIsLoggedIn}
            setManageUser={setManageUser} setManageRole={setManageRole}/>
          )
          :
          (manageUser?<User setManageUser={setManageUser} setManageRole={setManageRole}/> :<Role setManageUser={setManageUser} setManageRole={setManageRole} />)
        )
        :
        (
        <Student userName={userName} userRole={userRole} setIsLoggedIn={setIsLoggedIn}/>
        )
      )}
      <Footer/>
    </div>
  );
}
export default App;