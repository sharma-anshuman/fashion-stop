import React, { createContext, useContext } from 'react'

const MainData = createContext();

const DataContext = ({children}) => {
    const elements = {};
  return (
    <MainData.Provider value={elements}>{children}</MainData.Provider>
  )
}

export const UseData = () =>{
    return useContext(MainData);
}

export default DataContext