// context/ItemContext.js
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';

const DataContext = createContext();
export const DataProvider = ({ children }) => {
     const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");

    if (token) {
      const decoded = jwtDecode(token);
    //   console.log(decoded);
      
      setUserRole(decoded.role); // only runs after the first render
    } else {
      setUserRole("");
    }
  }, []);
    return (
        <DataContext.Provider value={{ userRole }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext; 
