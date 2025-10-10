// context/ItemContext.js
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useRef, useState } from 'react';
import ApiService from './ApiService';

const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [permission, setPermission] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");

    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded);
      // console.log(decoded);
      
    }
  }, []);


  return (
    <DataContext.Provider value={{ userRole, permission }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext; 
