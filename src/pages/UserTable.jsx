// ## Capgemini Technology Services India Proprietary and Confidential ##
// ## Copyright Capgemini 2022-2023 - All Rights Reserved ##

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { API_URL } from '../config';

const UserTable = ({onClose}) => {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  // const [showPopup2, setShowPopup2] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [cognitoGroups, setCognitoGroups] = useState([]);
  const [showPopup2, setShowPopup2] = useState(false);

  // const handleEdit = () => {
  //   setShowPopup(true);
  // };

  // const handleClosePopup = () => {
  //   setShowPopup(false);
  // };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  
  };

  useEffect(() => {
    
    fetchUsers();
  }, []);
console.log(users)
const fetchUsers = async () => {
  try {
      const response = await fetch(`${API_URL}cognitousers`,{
          headers: {
           'Authorization':  `Bearer ${localStorage.getItem("token")}`,
        }
       
       });
    const usersData = await response.json();
    console.log(usersData)

  //   const users = usersData.map((user) => {
  //     return {
  //       username: user.username,
  //       groups: user.groups.join(', '),
  //     };
  //   });

    setUsers(usersData);
  } catch (error) {
    console.log('Error fetching users:', error);
  }
};

  const handleDeleteUser = async (username) => {
    try {
      const response = await fetch(`${API_URL}deletedashboarduser?username=${username}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization':  `Bearer ${localStorage.getItem("token")}`,
          // Add any other required headers
        },
      });
  
      if (response.ok) {
        // Remove the deleted user from the local state
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.username !== username)
        );
        console.log('User deleted successfully');
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.log('Error deleting user:', error);
    }
  };
  const handleCancel = () => {
    onClose(); // Call the onClose function passed as a prop
  };

  const handleEdit = (username) => {
    setSelectedUser(username);
    setShowPopup(true);

  };

  const handleClosePopup= () => {
    setSelectedUser(null);
    setShowPopup(false);
  };
 
  
useEffect(() => {
  fetchCognitoGroups();
}, []);

const fetchCognitoGroups = async () => {
  try {
    const response = await fetch(`${API_URL}cognitogroups`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const groupsData = await response.json();
    setCognitoGroups(groupsData);
  } catch (error) {
    console.log('Error fetching Cognito groups:', error);
  }
};

const handleSubmit =async (groupName) => {
  // Perform the necessary logic to update the user group
  // You can access the selected user and group using the selectedUser and selectedGroup state variables
  // After updating the user group, you can close the popup
  try {
    const response =await fetch(`${API_URL}updateusergroup?username=${selectedUser}&group=${groupName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization':  `Bearer ${localStorage.getItem("token")}`,
        // Add any other required headers
      },
    });
      console.log('User Group Updated successfully');
   
  } catch (error) {
    console.log('Error Updating user-group:', error);
  }
  await fetchUsers();
  handleClosePopup();
};

  return (
      <div className="flex flex-col col-span-full sm:col-span-12 xl:col-span-12 border-solid border-2 border-green-600 p-4  h-80 bg-custom2 shadow-2xl rounded-3xl mb-40">
      <table className="table-auto w-full">
      <thead className="text-xs text-black bg-slate-50 rounded-sm">
        <tr>
          <th className="p-2">
           <div className="font-semibold text-center">Username</div> 
          </th>
          <th className="p-2">
          <div className="font-semibold text-center">Group Name</div>
          </th>
          <th className="p-2">
          <div className="font-semibold text-center">Update Group</div>
          </th>
          <th className="p-2">
          <div className="font-semibold text-center">Delete User</div>
          </th>
        </tr>
      </thead>
      <tbody className="text-sm font-medium ">
        {users.map((user) => (
          <tr key={user.username}>
            <td className="p-1 text-white">
            <div className="text-center">{user.username}</div>
              </td>
            <td className="p-1 text-white">
            <div className="text-center">{user.groups}</div>
              </td>
            <td className="p-1 text-center text-white">
              <button
                className="px-1 py-1 text-sm font-small text-white bg-yellow-500 rounded-md hover:bg-yellow-600"
                onClick={() => handleEdit(user.username)}
              >
                Update
              </button>
            </td>
            <td className=" py-1 text-center whitespace-nowrap">
              <button
                className="px-1 py-1 text-sm font-small text-white bg-red-500 rounded-md hover:bg-red-600"
                onClick={() => handleDeleteUser(user.username)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {showPopup && (
  <div className="fixed inset-0 z-50 flex items-center justify-center">
    <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
    <div className="bg-white w-96 rounded-lg p-6 relative">
      <h2 className="text-lg font-medium mb-4">Update User Group</h2>
      <div className="flex flex-col mb-4">
        <label className="text-sm font-medium mb-2">Group Name:</label>
        <select
          className="bg-gray-100 rounded-lg p-2"
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
        >
          {cognitoGroups.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-end">
        <button
          className="btn bg-green-500 hover:bg-green-700 text-white rounded-lg p-1.5 mr-2"
          onClick={() => handleSubmit(selectedGroup)}
        >
          Submit
        </button>
        <button
          className="btn bg-red-500 hover:bg-red-700 text-white rounded-lg p-1.5"
          onClick={handleClosePopup}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
<Link to={'/admin'} className="flex w-20 btn bg-green-500 hover:bg-green-700 text-white rounded-lg py-1 mt-1">Cancel</Link>
</div>
  );
};

export default UserTable;