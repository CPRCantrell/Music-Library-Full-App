import React, { useState, useEffect} from 'react';
import NavBar from './components/NavBar/NavBar';
import HeadBar from './components/HeadBar/HeadBar';
import NewSongForm from './components/NewSongForm/NewSongForm';
import ExplorePage from './components/ExplorePage/ExplorePage';
import SearchPage from './components/SearchPage/SearchPage';
import axios from 'axios';
import './App.css';

function App() {

  const [currentPage, setCurrentPage] = useState('Explore');
  const [addSongModal, setAddSongModal] = useState(false);
  const [initialSearch, setInitialSearch] = useState('')
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [genres, setGenres] = useState([]);


  useEffect(() => {
    getData()
  }, []);

  useEffect(() => {
    let all_genre = albums.map((album)=>album.genre).filter((genre,index,mappedArray)=>mappedArray.indexOf(genre)===index).map((item)=>({name:item}))
    setGenres(all_genre)
  }, [albums]);

  async function getData(){
    let response = await axios.get('http://127.0.0.1:5000/api/songs/all')
    setSongs(response.data.songs)
    setArtists(response.data.artists)
    setAlbums(response.data.albums)
    return true
  }

  return (
    <div className='App'>
      {genres.length ? (
      <>
        <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} addSongModal={addSongModal} setAddSongModal={setAddSongModal}/>
        <HeadBar currentPage={currentPage} setCurrentPage={setCurrentPage} setInitialSearch={setInitialSearch} initialSearch={initialSearch}/>
        {addSongModal ?  <NewSongForm setAddSongModal={setAddSongModal} albums={albums} artists={artists} genres={genres}/>:null}
        <main>
          {currentPage === 'Explore' ? <ExplorePage songs={songs} genres={genres} artists={artists}/>:null}
          {currentPage === 'Search' ? <SearchPage setInitialSearch={setInitialSearch} initialSearch={initialSearch} songs={songs} albums={albums} artists={artists} genres={genres}/>: null}
        </main>
      </>
      ):null}
    </div>
  );
}

export default App;