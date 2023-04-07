import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import HeadBar from './components/HeadBar/HeadBar';
import './App.css';

function App() {

  const [currentPage, setCurrentPage] = useState('Explore');

  return (
    <div className='App'>
      <div className='gradient'></div>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <HeadBar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );
}

export default App;