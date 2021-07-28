import React, {useEffect, useState} from 'react';
import {UserContext, userSession} from './context';
import EncryptedStorage from 'react-native-encrypted-storage';

const UserContextProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<userSession>(null);

  useEffect(() => {
    (async () => {
      try {
        if (user) {
          await EncryptedStorage.setItem('user_session', JSON.stringify(user));
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user]);

  useEffect(() => {
    (async () => {
      try {
        const data = await EncryptedStorage.getItem('user_session');
        if (data) {
          const userData = JSON.parse(data);
          setUser(userData);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleLogin = async (userData: userSession) => {
    if (userData) {
      setUser({
        username: userData.username,
        id: userData.id,
        apiKey: userData.apiKey,
      });
    }
  };

  const handleLogout = async () => {
    try {
      await EncryptedStorage.removeItem('user_session');
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{user, handleLogout, handleLogin}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
