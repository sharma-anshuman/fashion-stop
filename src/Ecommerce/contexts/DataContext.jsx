import React, { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../../firebase-config';
import {collection, getDoc, getDocs} from "firebase/firestore";

const MainData = createContext();

const DataContext = ({children}) => {

  const [users, setUsers] = useState([]);
  const userCollectionRef = collection(db, "clothesData");
  const getData = async () => {
    const data = await getDocs(userCollectionRef);
    setUsers(data.docs.map((doc, idx) => {
      console.log(({...doc.data(), id:doc.id}), idx);
      return ({...doc.data(), id:doc.id})
    }))
  }

  useEffect(() => {getData()}, []);

    const elements = {};
  return (
    <MainData.Provider value={elements}>{children}</MainData.Provider>
  )
}

export const UseData = () =>{
    return useContext(MainData);
}

export default DataContext