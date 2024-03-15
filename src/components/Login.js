import React, { useState } from 'react';
import login from './login3.png';
import bg from './bg.jpg';
 
  function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
 
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('https://localhost:7259/api/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email, password})
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          onLogin(data.userId ,data.role);
        } else {
          setError('Invalid email or password');
        }
      } catch (error) {
        setError('Error occurred while logging in');
      }
    };
 
    return (
      <div>
        <div style={{float:"left", width:"30%" ,marginTop:"10%"}}>
          <img src={login} alt="logo" style={{width:"650px", height:"400px"}}/>
        </div>
        <div style={{float:"right", width:"70%"}}>
        <div className="login-container" style={{backgroundImage: `url(${bg})`}}>
          <h2>Login</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
            <div className="input-field">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required />
            </div>
            <button type="submit" className="styled-button">Login</button>
          </form>
        </div>
        </div>
      </div>
    );
  }
 
export default LoginForm;
 
// import React, { useState } from 'react';
 
//   function LoginForm({ onLogin }) {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
 
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const response = await fetch('https://localhost:7021/api/authenticate', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ email, password })
//         });
//         const data = await response.json();
//         if (response.ok) {
//           onLogin(data.role);
//         } else {
//           setError('Invalid email or password');
//         }
//       } catch (error) {
//         setError('Error occurred while logging in');
//       }
//     };
 
//     return (
//       <div className="login-container">
//         <h2>Login</h2>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="input-field">
//             <label>Email:</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required />
//           </div>
//           <div className="input-field">
//             <label>Password:</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required />
//           </div>
//           <button type="submit" className="styled-button">Login</button>
//         </form>
//       </div>
//     );
//   }
 
// export default LoginForm;
 
// import React, { useState } from 'react';
 
// const LoginForm = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
 
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simulated authentication logic
//     if (username === 'student' && password === 'student') {
//       onLogin('student');
//     } else if (username === 'admin' && password === 'admin') {
//       onLogin('admin');
//     } else {
//       setError('Invalid username or password');
//     }
//   };
 
//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="input-field">
//           <label>Username:</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="input-field">
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="styled-button">Login</button>
//       </form>
//     </div>
//   );
// };
 
// export default LoginForm;