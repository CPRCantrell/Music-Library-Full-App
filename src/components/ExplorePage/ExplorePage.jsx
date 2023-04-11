import React, { useState, useEffect } from 'react';
import RecentlyAddedDisplay from "../RecentlyAddedDisplay/RecentlyAddedDisplay";
import axios from 'axios';
import './ExplorePage.css'

const ExplorePage = (props) => {

    const [genreFilter, setGenreFilter] = useState('');
    const [artistFilter, setArtistFilter] = useState('');
    const [songsToFilter, setSongsToFilter] = useState([]);

    useEffect(() => {
        getSongWithMoreInfo()
    }, []);


    async function getSongWithMoreInfo(){
        let response = await axios.get('http://127.0.0.1:5000/api/songs/detail')
        setSongsToFilter(response.data)
    }

    function gfilter(value){
        setGenreFilter(value)
    }

    function afilter(value){
        setArtistFilter(value)
    }

    function songlist(){
        let filterProcess = [...songsToFilter]
        if(genreFilter){
            filterProcess = filterProcess.filter((song)=> song.album.genre === genreFilter)
        }
        if(artistFilter){
            filterProcess = filterProcess.filter((song)=> song.artist === artistFilter)
        }
        return(
            filterProcess.map((song, index)=>{
                return(
                    <div key={index} className='item'>
                        <div className='name-album'>
                            <img src={'http://127.0.0.1:5000/api/album_cover/'+song.album.album_cover} alt={`${song.title} album cover`}/>
                            <p>{song.title}</p>
                        </div>
                        <p>{song.artist}</p>
                        <p>{String((song.run_time/60).toFixed(2)).replace('.',':')}</p>
                    </div>
                )
            })
        )
    }

    return (
        <>
            <section className="recents">
                <RecentlyAddedDisplay songs={props.songs}/>
            </section>
            <section className="full-song-list">
                <h2>All Songs</h2>
                <div className="filters">
                    <div className="filter-group">
                        <label>Genre</label>
                        <select className="options" name="genre" onChange={(e)=>gfilter(e.target.value)}>
                            <option value=''></option>
                            {props.genres.map((genre,index)=><option key={index} value={genre.name}>{genre.name}</option>)}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Artist</label>
                        <select className="options" name="artist" onChange={(e)=>afilter(e.target.value)}>
                        <option value=''></option>
                            {props.artists.map((artist, index)=><option key={index} value={artist.name}>{artist.name}</option>)}
                        </select>
                    </div>
                </div>
                <div className='song-list'>
                    {songsToFilter.length > 0 ? songlist():null}
                </div>
            </section>
        </>
    );
}

export default ExplorePage;