import React, { createContext, useContext, useEffect, useState } from 'react'
import { db } from '../../firebase-config';
import {collection, getDoc, getDocs, setDoc} from "firebase/firestore";

const MainData = createContext();

const DataContext = ({children}) => {

  const [data, setData] = useState([]);
  const userCollectionRef = collection(db, "clothingData");
  const getData = async () => {
    const data = await getDocs(userCollectionRef);
    const arr = (data.docs.map((doc, idx) => {
      // console.log(({...doc.data(), id:doc.id}), idx);
      return ({...doc.data(), id:doc.id})
    }))
    setData([...arr]);

  }

  useEffect(() => {getData()}, []);

    const elements = {data};
  return (
    <MainData.Provider value={elements}>{children}</MainData.Provider>
  )
}

export const UseData = () =>{
    return useContext(MainData);
}

export default DataContext