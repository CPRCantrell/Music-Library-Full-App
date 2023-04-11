import React, { useState, useEffect } from 'react';
import './RecentlyAddedDisplay.css'

const RecentlyAddedDisplay = (props) => {

    const [tenMostRecent, setTenMostRecent] = useState([]);
    const length = 10

    useEffect(() => {
        let lastTen = props.songs.reverse().slice(0,length)
        setTenMostRecent(lastTen)
    }, []);

    return (
        <div className='recent-display snap-inline'>
            <h2>Recently Added</h2>
            <div className={'media-scroller snap-inline'}>
                {tenMostRecent.map((song, index)=>{
                    return(
                        <div key={index} className='song-card'>
                            <img src={'http://127.0.0.1:5000/api/album_cover/album/'+song.album} alt={`${song.title} album cover`}/>
                            <p>{song.title}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default RecentlyAddedDisplay;