import React, { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkIfAdmin = async () => {
      const user = await Auth.currentAuthenticatedUser();
      const groups = user.signInUserSession.accessToken.payload["cognito:groups"];

      if (groups && groups.includes("admin")) {
        setIsAdmin(true);
      }
    };

    Hub.listen("auth", ({ payload: { event, data } }) => {
      if (event === "signIn") {
        checkIfAdmin();
      }
    });

    checkIfAdmin();
  }, []);

  if (!isAdmin) {
    return <div>No Access</div>;
  }

  return (
    <div>
      <h1>Welcome to the Admin Page!</h1>
    </div>
  );
};

export default AdminPage;
