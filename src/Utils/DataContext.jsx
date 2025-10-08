// context/ItemContext.js
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useRef, useState } from 'react';
import ApiService from './ApiService';

const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("");
  const [permission, setpermission] = useState({})
  const [userrolewisepermisson,setuserrolewisepermisson]=useState({})
    const didMountRef = useRef(true)

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");

    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded); // only runs after the first render
      
    } 
    ApiService.fetchData("role-permission/permission/all-permission").then((res) => {
      if (res?.status === 200) {
        setpermission(res?.data)



      
      }
    })

  }, []);
  
  return (
    <DataContext.Provider value={{ userRole, permission }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext; 
