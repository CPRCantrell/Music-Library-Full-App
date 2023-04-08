import React, { useState } from 'react';
import DragDropInput from '../DragDropInput/DragDropInput';
import InputSelection from '../InputSelection/InputSelection';
import './NewSongForm.css'

const NewSongForm = (props) => {

    const today = new Date()

    const [title, setTitle] = useState('');
    const [runTime, setRunTime] = useState('');
    const [artistName, setArtistName] = useState('');
    const [album, setAlbum] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');

    function verifyTitle(value){
        value = value.trimLeft().replace(/ +/g," ")
        setTitle(value)
    }
    function verifyRunTime(value){
        value = value.trim().replace(/ +/g," ")
        setRunTime(value)
    }
    function changeAlbum(value){
        value = value.trimLeft().replace(/ +/g," ")
        setAlbum(value)
    }
    function changeName(value){
        value = value.trimLeft().replace(/ +/g," ")
        setArtistName(value)
    }
    function changeGenre(value){
        value = value.trimLeft().replace(/ +/g," ")
        setGenre(value)
    }

    function handleSubmit(event){
        event.preventDefault()
        let songPackage = {title:title,runTime:runTime}
        let albumPackage = {album:album, genre:genre, year:year, cover:selectedFile}
        let artistPackage = {name:artistName}
        let update = {song: songPackage, album: albumPackage, artist: artistPackage}
        props.addSong(update)
    }

    return (
        <form onSubmit={(e)=>handleSubmit(e)}>

            <h2>Add New Song</h2>

            <div className='song-info'>
                <div className='group song-grid-A'>
                    <label>Title</label>
                    <input type='text' placeholder='Song Name' value={title} onChange={(e)=>verifyTitle(e.target.value)} required/>
                </div>
                <div className='group song-grid-B'>
                    <label>Run time</label>
                    <input type='text' placeholder='m:ss (2:13)' pattern={/^[1-9]?[0-9]\:\d{1,2}/} value={runTime} onChange={(e)=>verifyRunTime(e.target.value)} required/>
                </div>
                <div className='group song-grid-C'>
                    <label>Artist</label>
                    <InputSelection name={"artist"} inputData={artistName} compare={props.artists} task={changeName} placeholder={'Person (first & Last) or Band'}/>
                </div>
            </div>

            <div className='album-info'>
                <div className='group solo'>
                    <label>Album</label>
                    <InputSelection name={"album"} inputData={album} compare={props.albums} task={changeAlbum} placeholder={'Album Name'}/>
                </div>
                <div className='group'>
                    <label>Genre</label>
                    <InputSelection name={"genre"} inputData={genre} compare={props.genres} task={changeGenre} placeholder={'Album Genre'}/>
                </div>
                <div className='group'>
                    <label>Year</label>
                    <input type='number' placeholder='YYYY' min={1880} max={today.getFullYear()} value={year} onChange={(e)=>setYear(e.target.value)} required/>
                </div>
            </div>
            <div className='center-box'>
                <DragDropInput selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
                {/* {props.albums.inludes(album) ?
                <img src={URL.createObjectURL(props.selectedFile)} alt='Album Cover'/>
                :
                <DragDropInput selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
                } */}
            </div>
            <div className='group btns'>
                <button type='submit'>Submit</button>
                <button onClick={()=>props.setAddSongModal(false)}>Cancel</button>
            </div>
        </form>
    );
}

export default NewSongForm;