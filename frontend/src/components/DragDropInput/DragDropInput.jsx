import React, { useRef } from 'react';
import uploadIcon from '../../Assests/upload.svg'
import './DragDropInput.css'

const DragDropInput = (props) => {

    const wrapperRef = useRef(null);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover')
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover')
    const onDrop = () => wrapperRef.current.classList.remove('dragover')

    function handleChange(event){
        let file = event.target.files[0]
        if(file.type.slice(0,6) !== 'image/')
            alert('not an acceptable file')
        else
            props.setSelectedFile(file)
    }

    return (
        <div className={'drop-area'+ (props.selectedFile ? ' no-background':'')} ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onChange={(e)=>handleChange(e)}
        >
        {props.selectedFile ?
        (
            <div className='img-preview'>
                <img src={URL.createObjectURL(props.selectedFile)} alt='preview of file'/>
            </div>
        ):(
            <div className='drop-label'>
                <img src={uploadIcon} alt='upload Icon'/>
                <p>Drag & Drop File</p>
            </div>
        )
        }
            <input formEncType='multioart/form-data' type='file' name='album_art' accept='image/*' required/>
        </div>
    );
}

export default DragDropInput;