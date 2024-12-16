import { useState } from 'react';

const SignupForm = ({ onSignup, switchToLogin }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://127.0.0.1:5000/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, email, password }),
//       });

//       const data = await response.json();
      
//       if (response.status === 201) {
//         // If signup is successful, automatically log in
//         const loginResponse = await fetch('http://127.0.0.1:5000/login', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ username, password }),
//         });

//         const loginData = await loginResponse.json();

//         if (loginResponse.status === 200) {
//           onSignup(loginData.user, loginData.access_token);
//         }
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error('Signup error', error);
//     }
//   };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      
      if (response.status === 201) {
        // Show success message and switch to login
        alert('Signup successful! Please log in.');
        switchToLogin();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Signup error', error);
      alert('An error occurred during signup');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div>
        <label>Username:</label>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Sign Up</button>
      <p>
        Already have an account? 
        <button type="button" onClick={switchToLogin}>Login</button>
      </p>
    </form>
  );
};

export default SignupForm;