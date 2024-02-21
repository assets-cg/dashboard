// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import { Auth, Hub} from 'aws-amplify';
import React, { useState } from 'react';

function SignOutButton() {
  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      console.log('signed out');
      // localStorage.removeItem("token")
      // localStorage.removeItem("projectName")
      // localStorage.removeItem("boardId")
      localStorage.clear();
      sessionStorage.clear();
      
      // window.history.replaceState({}, document.title, "/");
      window.location = "/";
      onclick();
    } catch (error) {
      console.error(error);
    }
  };

  return <button type="signOut" className="btn bg-green-500 hover:bg-green-700 text-white" onClick={handleSignOut}>Sign Out </button>;
}

export default SignOutButton;