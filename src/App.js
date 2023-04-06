import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import './App.css';

function App() {

  const [currentPage, setCurrentPage] = useState('Explore');

  return (
    <div className='App'>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      <HeadBar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
    </div>
  );
}

export default App;