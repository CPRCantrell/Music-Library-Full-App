import React, { useState, useEffect } from 'react';
import './SearchPage.css'

const SearchPage = (props) => {

    const [search, setsearch] = useState(props.initialSearch);
    const [matchingSongs, setMatchingSongs] = useState([]);
    const [matchingArtists, setMatchingArtists] = useState([]);
    const [matchingAlbums, setMatchingAlbums] = useState([]);
    const [genreFilter, setGenreFilters] = useState('');
    const [yearFilter, setYearFilters] = useState({min: '', max: ''});


    useEffect(() => {
        findMatches(props.songs,'title',setMatchingSongs)
        findMatches(props.artists,'name',setMatchingArtists)
        findMatches(props.albums,'name',setMatchingAlbums)
        props.setInitialSearch('')
    }, []);

    useEffect(() => {look()}, [search]);
    useEffect(() => {look()}, [yearFilter]);
    useEffect(() => {look()}, [genreFilter]);

    function look(){
        let filteredSongs = [...props.songs]
        let filteredAlbums = [...props.albums]
        let filteredArtists = [...props.artists]
        if(genreFilter){
            filteredSongs = props.songs.filter((song) =>{
                for(let album in props.albums){
                    if(props.albums[album].id === song.album && props.albums[album].genre === genreFilter){
                        return true
                    }
                }
                return false
            })
            filteredAlbums = props.albums.filter((album)=>{
                if(album.genre === genreFilter){
                    return true
                }
                return false
            })
            filteredArtists = props.artists.filter((artist)=>{
                for(let album in props.albums){
                    if(props.albums[album].artist_id === artist.id && props.albums[album].genre === genreFilter){
                        return true
                    }
                }
                return false
            })
        }
        if(yearFilter.max === 4 || yearFilter.min === 4){
            let min = yearFilter.min
            let max = yearFilter.max
            filteredAlbums = filteredAlbums.filter((albums)=>min<albums.year<max)
            filteredSongs = filteredSongs.filter((song) => {
                for(let album in props.albums){
                    if(props.albums[album].id === song.albums){
                        return true
                    }
                }
                return false
            })
            filteredArtists = filteredArtists.filter((artist) => {
                for(let album in props.albums){
                    if(props.albums[album].artist_id === artist.id){
                        return true
                    }
                }
                return false
            })
        }
        findMatches(filteredSongs,'title',setMatchingSongs)
        findMatches(filteredArtists,'name',setMatchingArtists)
        findMatches(filteredAlbums,'name',setMatchingAlbums)
    }

    function findMatches(objects, matchKey, setFunc){

        let numberOfChar = search.length
        if(numberOfChar > 0){
            let checkForMatches = objects.filter(a=>{
                if(a[matchKey].slice(0,numberOfChar).toLowerCase() === search.toLowerCase()){
                    return true
                }

                let wordsInName = a[matchKey].toLowerCase().split(' ')
                for(let word in wordsInName){
                    word = wordsInName[word]
                    if(word.slice(0,numberOfChar) === search.toLowerCase()){
                        return true
                    }
                }
                return false
            })
            setFunc(checkForMatches)
        }else{
            setFunc([])
        }
    }

    function handleClear(){
        setGenreFilters('')
        setYearFilters({min: '', max: ''})
        if(genreFilter)
            document.querySelector('input[name="genre"]:checked').checked = false;
    }

    function handleMaxYear(value){
        let temp = {...yearFilter}
        temp.max = value
        setYearFilters(temp)
    }

    function handleMinYear(value){
        let temp = {...yearFilter}
        temp.min = value
        setYearFilters(temp)
    }
    return (
        <div className='search-page-display'>
            <div className='filter-area'>
                <div className='filter-group'>
                    <p className='filter-header'><span>Genre</span></p>
                    <div className={'filter-options check-label'}>
                        {props.genres.map((genre,index)=>{
                            return(
                                <div key={index}>
                                    <input type='radio' name='genre' value={genre.name} onInput={(e)=>setGenreFilters(e.target.value)}/>
                                    <label>{genre.name}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='filter-group'>
                    <p className='filter-header'><span>Year</span></p>
                    <div className='filter-options'>
                        <div>
                            <label>Min Year</label>
                            <input type='text' name='year' value={yearFilter.min} placeholder='YYYY' onInput={(e)=>handleMinYear(e.target.value)} autoComplete='off' onEmptied={()=>handleMinYear('')}/>
                        </div>
                        <div>
                            <label>Max Year</label>
                            <input type='text' name='year' value={yearFilter.max} placeholder='YYYY' onInput={(e)=>handleMaxYear(e.target.value)} autoComplete='off' onEmptied={()=>handleMinYear('')}/>
                        </div>
                    </div>
                </div>
                <button className='clear' onClick={()=>handleClear()}>clear</button>
            </div>
            <div className='search-area'>
                <input type='text' value={search} onChange={(e)=>setsearch(e.target.value)}/>
            </div>
            <div className='search-results'>
                <h2>Songs</h2>
                <div className='songs'>
                    <div className='making-space'>
                    {matchingSongs.length > 0 ? (
                        matchingSongs.map((song, index)=>{
                            return(
                            <div key={index} className='song'>
                                <div className='name-album'>
                                    <img src={'http://127.0.0.1:5000/api/album_cover/album/'+song.album} alt={`${song.title} album cover`}/>
                                    <p>{song.title}</p>
                                </div>
                                <p>{String((song.run_time/60).toFixed(2)).replace('.',':')}</p>
                            </div>
                        )})
                    ):null}
                    </div>
                </div>
                <h2>Albums</h2>
                <div className='albums'>
                    {matchingAlbums.length > 0 ? (
                        matchingAlbums.map((album, index)=>{
                            return(
                            <div key={index} className='album'>
                                <img src={'http://127.0.0.1:5000/api/album_cover/'+album.album_cover} alt={`${album.name} album cover`}/>
                                <div className='album-info'>
                                    <p className='album-name'><span>{album.name}</span></p>
                                    <div>
                                        <p>{album.genre}</p>
                                        <p>{album.release_date}</p>
                                    </div>
                                    <p className='song-count'>number of songs: {props.songs.filter((song)=> song.album === album.id).length}</p>
                                </div>
                            </div>
                            )
                        }
                    )):null}
                </div>
                <h2>Artists</h2>
                <div className='artists'>
                    {matchingArtists.length > 0 ? (
                        matchingArtists.map((artist, index)=>{
                            return(
                            <div key={index} className='artist'>
                                <p className='artist-name'><span>{artist.name}</span></p>
                                <div className='albums-artist'>
                                    {props.albums.filter((album)=>album.artist_id === artist.id).map((album)=>{
                                        return(
                                        <img src={'http://127.0.0.1:5000/api/album_cover/'+album.album_cover} alt={`${album.name} album cover`}/>
                                        )
                                })}
                                </div>
                            </div>
                            )
                        }
                    )):null}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;