// import React, { useState } from 'react';
// import { Auth } from 'aws-amplify';
// import SignUp from '../pages/SignUp'

// function MyComponent() {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [isSignedIn, setIsSignedIn] = useState(false);

//   async function handleSignUp() {
//     await Auth.signUp({
//       username,
//       password,
//       attributes: {
//           email,          // optional
//           // phone_number,   // optional - E.164 number convention
//           // other custom attributes 
//       },
//       autoSignIn: { // optional - enables auto sign in after user is confirmed
//           enabled: true,
//       }
//     });
//     alert("Done")
//     console.log("Done")
//   }

//   async function handleSignIn() {
//     const user = await signIn( email, password);
//     setIsSignedIn(!!user);
//   }

//   async function handleSignOut() {
//     await signOut();
//     setIsSignedIn(false);
//   }
// console.log(email, password)
//   return (
//     <div>
//       {!isSignedIn && (
//         <form>
//           <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
//           <input type="text" placeholder="email" value={email} onChange={e => setEmail(e.target.value)} />
//           <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />   
//           <button onClick={handleSignUp}>Sign Up</button>
//           <button onClick={handleSignIn}>Sign In</button>
//         </form>
//      )}
//             {isSignedIn && (
//            <div>
            
//                <button onClick={handleSignOut}>Sign Out</button>
        
//            </div>
//      )}
//      </div>
//     );
//   }

// export default MyComponent;