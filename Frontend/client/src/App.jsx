import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, useLocation } from "react-router-dom";


function App() {
  const isOwnerPath = useLocation().pathname.includes("/owner");

  return (
    <>
      {!isOwnerPath && <Navbar />}

      <Routes>
        <Route path="/" />
      </Routes>
    </>
  );
}

export default App;