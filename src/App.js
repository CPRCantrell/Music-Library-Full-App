import React, { useState, useEffect} from 'react';
import NavBar from './components/NavBar/NavBar';
import HeadBar from './components/HeadBar/HeadBar';
import NewSongForm from './components/NewSongForm/NewSongForm';
import './App.css';

function App() {

  const [currentPage, setCurrentPage] = useState('Explore');
  const [addSongModal, setAddSongModal] = useState(false);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);


  useEffect(() => {
  }, []);

  function addSong(update){
    console.log(update)
    setAddSongModal(false)
  }

  return (
    <div className='App'>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} addSongModal={addSongModal} setAddSongModal={setAddSongModal}/>
      <HeadBar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
      {addSongModal ?  <NewSongForm setAddSongModal={setAddSongModal} addSong={addSong}/>:null}
    </div>
  );
}

export default App;