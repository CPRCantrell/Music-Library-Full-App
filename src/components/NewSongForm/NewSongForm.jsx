import React, { useState } from 'react';
import DragDropInput from '../DragDropInput/DragDropInput';
import InputSelection from '../InputSelection/InputSelection';
import ResponseModal from '../ResponseModal/ResponseModal';
import axios from 'axios';
import './NewSongForm.css'

const NewSongForm = (props) => {

    const today = new Date()

    const [confirmation, setConfirmation] = useState(false);

    const [title, setTitle] = useState('');
    const [runTime, setRunTime] = useState('');
    const [artistName, setArtistName] = useState('');
    const [album, setAlbum] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');

    const [albumExists, setAlbumExists] = useState(true);
    const [existingAlbum, setExistingAlbum] = useState(null);

    const [artistExists, setArtistExists] = useState(true);
    const [existingArtist, setExistingArtist] = useState(null);

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

    function captureAlbumObject(albumObject){
        setAlbum(albumObject.name)
        setExistingAlbum(albumObject)
    }

    function captureArtistObject(albumObject){
        setArtistName(albumObject.name)
        setExistingArtist(albumObject)
    }

    function refresh(){
        window.location.reload(true)
    }

    function renderAlbumInfo(){
        if(albumExists){
            return(
                existingAlbum ? (
                    <div className='info-box'>
                        <input type='text' name='album_id' value={existingAlbum.id} readOnly/>
                        <img src={'http://127.0.0.1:5000/api/album_cover/'+existingAlbum.album_cover} alt={`${existingAlbum.name} album cover`}/>
                        <span><label>Year:</label><p>{existingAlbum.release_date}</p></span>
                        <span><label>Genre:</label><p>{existingAlbum.genre}</p></span>
                    </div>
                ):(
                    <div className='info-box'></div>
                )
            )
        }else{
            return(
            <>
                <div className='album-info'>
                    <div className='group'>
                        <label>Genre</label>
                        <InputSelection name={"genre"} inputData={genre} compare={props.genres} task={changeGenre} placeholder={'Album Genre'} exist={albumExists}/>
                    </div>
                    <div className='group'>
                        <label>Year</label>
                        <input autoComplete='off' type='number' name='year' placeholder='YYYY' min={1880} max={today.getFullYear()} value={year} onChange={(e)=>setYear(e.target.value)} required/>
                    </div>
                </div>
                <div className='center-box'>
                    <DragDropInput selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
                </div>
            </>
            )
        }
    }

    async function handleSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.target, event.target.submitBtn)
        let response = await axios.post('http://127.0.0.1:5000/api/song/form/add/new_song', formData)
        setConfirmation([true,response])
    }

    return (
        <div className='form'>
            <form encType='multipart/form-data' onSubmit={(e)=>handleSubmit(e)}>

                <h2>Add New Song</h2>

                <div className='song-info'>
                    <div className='group song-grid-A'>
                        <label>Title</label>
                        <input data-cy='title' autoComplete='off' type='text' name='song_name' placeholder='Song Name' value={title} onChange={(e)=>verifyTitle(e.target.value)} required/>
                    </div>
                    <div className='group song-grid-B'>
                        <label>Run time</label>
                        <input data-cy='run_time' autoComplete='off' type='text' name='run_time' placeholder='m:ss (2:13)' pattern={/^[1-9]?[0-9]\:\d{1,2}/} value={runTime} onChange={(e)=>verifyRunTime(e.target.value)} required/>
                    </div>
                    <div className='group song-grid-C'>
                        <div className='optional'>
                            <label>Artist</label>
                            <div className='exist-check'>
                                <label>New:</label>
                                <input type='checkbox' name='new_album' checked={!artistExists} onChange={(e) => setArtistExists(!e.target.checked)}/>
                            </div>
                        </div>
                        {artistExists && existingArtist ? <input type='text' name='artist_id' value={existingArtist.id} className='no-interact' readOnly/>:null}
                        <InputSelection name={"artist"} inputData={artistName} compare={props.artists} task={changeName}  placeholder={'Person (first & Last) or Band'} existBtnAction={captureArtistObject} exist={artistExists}/>
                    </div>
                    <div className='group song-grid-D'>
                        <div className='optional'>
                            <label>Album</label>
                            <div className='exist-check'>
                                <label>New:</label>
                                <input type='checkbox' name='new_album' checked={!albumExists} onChange={(e) => setAlbumExists(!e.target.checked)}/>
                            </div>
                        </div>
                        <InputSelection  name={"album"} inputData={album} compare={props.albums} task={changeAlbum} placeholder={'Album Name'} existBtnAction={captureAlbumObject} exist={albumExists}/>
                    </div>
                </div>
                {renderAlbumInfo()}
                <div className='group btns'>
                    <button data-cy='submit-btn' type='submit' name='submitBtn'>Submit</button>
                    <button type='' onClick={()=>props.setAddSongModal(false)}>Cancel</button>
                </div>
            </form>
            {confirmation[0] ? <ResponseModal goodCodes={[200]} response={confirmation[1]} buttons={[{message:'OK',func: refresh}]}/>:null}
        </div>
    );
}

export default NewSongForm;