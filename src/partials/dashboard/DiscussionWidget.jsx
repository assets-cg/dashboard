import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { API_URL } from '../../config';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faPaperPlane, faTrash, faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';

const DiscussionWidget = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [editedMessage, setEditedMessage] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [editingChat, setEditingChat] = useState(null);
  const [editMode, setEditMode] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setCurrentUser(user);
      } catch (error) {
        console.log('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await fetch(`${API_URL}messageslist`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const chats = await response.json();
      setChats(chats);
    } catch (error) {
      console.log('Error fetching chats:', error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [chats, currentUser]);

  const handleInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSendClick = async () => {

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

    const currentTime = currentDate.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    if (messageInput.trim() !== '') {
      try {
        await axios.post(
          `${API_URL}createmessage`,
          {
            messengername: currentUser.attributes.email,
            messagetext: messageInput,
            dateofchat: formattedDate,
            timeofchat: currentTime,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setMessageInput('');
        fetchChats();
      } catch (error) {
        console.log('Error sending chat:', error);
      }
    }
  };

  const handleDeleteClick = async (chatId) => {
    try {
      const emailParts = currentUser.attributes.email.split('@')[0].split('.' && '-');
      const firstName =
        emailParts[0].charAt(0).toUpperCase() +
        emailParts[0].slice(1).toLowerCase();
        const messengerName = `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)}`;

      await axios.delete(`${API_URL}deletemessage?messageId=${chatId}&messengerName=${currentUser.attributes.email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log("Chat Deleted");
      fetchChats();
    } catch (error) {
      console.log('Error deleting chat:', error);
    }
  };


  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = (chatId) => {
    handleDeleteClick(chatId);
  };

  const handleEdit = (chat) => {
    setEditMode(chat.id);
    setEditedMessage(chat.messagetext);
  };

  const handleEditInputChange = (event) => {
    setEditedMessage(event.target.value);
  };

  const handleSaveEdit = async (chat) => {
    if (editedMessage.trim() !== '') {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

      const currentTime = currentDate.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      try {
        await axios.put(
          `${API_URL}editmessage?messageId=${chat.id}`,
          {
            messengername: currentUser.attributes.email,
            messagetext: editedMessage,
            dateofchat: formattedDate,
            timeofchat: currentTime,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setEditMode(null);
        fetchChats();
      } catch (error) {
        console.log('Error editing chat:', error);
      }
    }
  };


  const renderChatMessages = () => {

    return (
      <div className="chat-messages-container">
        {chats.map((chat) => {
          const isCurrentUser = chat.messengername === currentUser.attributes.email;
          const messageClass = isCurrentUser ? 'outgoing' : 'incoming';

          const emailParts = chat.messengername.split('@')[0].split('.' && '-');
          const firstName =
            emailParts[0].charAt(0).toUpperCase() +
            emailParts[0].slice(1).toLowerCase();
          const messengerName = `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)}`;

          return (
            <div key={chat.id} className={`chat-message-wrapper ${messageClass}`}>
              <div className={`chat-message-box ${isCurrentUser ? 'outgoing-message' : 'incoming-message'}`}>
                <div className="chat-message">
                  <span className={`font-semibold ${isCurrentUser ? 'text-green-700' : 'text-black'}`}>
                    {messengerName}
                  </span>
                  <span className="ml-1 text-gray-500 text-xs">
                  {chat.dateofchat} 
                </span>
                  <span className="m-1 text-gray-500 text-xs">
                  {chat.timeofchat}
                </span>
                   {editMode === chat.id ? (
                    <span>
                      <span className="mr-2">
                        <FontAwesomeIcon
                          icon={faEdit}
                          size="xs"
                          onClick={() => handleSaveEdit(chat)}
                          title="Save Chat"
                          className="text-green-500 hover:text-green-600 cursor-pointer ml-2"
                        />
                      </span>
                      <span className="mr-2">
                        <FontAwesomeIcon
                          icon={faTrash}
                          size="xs"
                          onClick={() => handleDelete(chat.id)}
                          title="Delete Chat"
                          className="text-red-500 hover:text-red-600 cursor-pointer ml-2"
                        />
                      </span>
                      <input
                        type="text"
                        value={editedMessage}
                        onChange={handleEditInputChange}
                        className="border border-gray-300 w-48 rounded-lg px-2 py-0 mb-1 outline-none"
                      />
                    </span>
                  ) : (
                    <div>
                      {chat.messagetext}
                      {isCurrentUser && (
                        <div className="ml-44"> 
                          <span className="mr-2">
                            <FontAwesomeIcon
                              icon={faEdit}
                              size="xs"
                              onClick={() => handleEdit(chat)}
                              title="Edit Chat"
                              className="text-green-500 hover:text-green-600 cursor-pointer ml-2"
                            />
                          </span>
                          <span>
                            <FontAwesomeIcon
                              icon={faTrash}
                              size="xs"
                              onClick={() => handleDelete(chat.id)}
                              title="Delete Chat"
                              className="text-red-500 hover:text-red-600 cursor-pointer"
                            />
                          </span>
                        </div>
                      )}
                      
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div>
      <div
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg hover:bg-green-600"
        onClick={toggleChat}
      >
        <FontAwesomeIcon icon={faComment} size="lg" />
      </div>
      {isOpen && (
        <div className="fixed bottom-10 right-6 w-96 bg-white shadow-2xl border-solid border-2 border-green-600 rounded-xl">
          <div className="p-4 flex justify-between">
            <h2 className="text-xl font-semibold mb-2">Discussions</h2>
            <button
              onClick={toggleChat}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-300 -mt-5 focus:outline-none"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>
          </div>
          <div className="chat-messages overflow-auto max-h-60 bg-gray-200  p-2">
            {renderChatMessages()}
          </div>
          <div className="chat-input flex">
            <input
              type="text"
              value={messageInput}
              onChange={handleInputChange}
              placeholder="Type your message"
              className="flex-grow border border-gray-300 rounded-lg px-2 py-2 outline-none"
            />
            <button
              onClick={handleSendClick}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-3 m-1"
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionWidget;
