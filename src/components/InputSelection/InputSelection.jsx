import React, { useState } from 'react';
import './InputSelection.css'

const InputSelection = (props) => {

    const [matches, setmatches] = useState([]);

    const name = props.name
    const placeholder = props.placeholder
    const comparison = props.compare
    const data = props.inputData
    const func = props.task ? props.task :(
    function setData(value){
        data = value
    })

    function findMatches(value){
        let numberOfChar = value.length
        if(numberOfChar > 0){
            let checkForMatches = comparison.filter(a=>{
                if(a.slice(0,numberOfChar).toLowerCase() === value.toLowerCase()){
                    return true
                }

                let wordsInName = a.toLowerCase().split(' ')
                for(let word in wordsInName){
                    word = wordsInName[word]
                    if(word.slice(0,numberOfChar) === value.toLowerCase()){
                        return true
                    }
                }
                return false
            })
            setmatches(checkForMatches)
        }else{
            setmatches([])
        }
    }

    return (
        <div className={name+'-selection relative'}>
            <input className={name+'-selection-input'} onInput={(e)=>findMatches(e.target.value)} id={name+'s'} name={name} value={data} onChange={(e)=>func(e.target.value)} autoComplete='off' placeholder={placeholder} required/>
            {matches.length > 0 ? (
                <div className={name+'-selection-box absolute'}>
                    {matches.map((match,index)=>{
                        return(
                            <button key={index} onClick={(e)=>func(e.target.value)} className={name+'-selection-option'}>{match}</button>
                        );
                    })}
                </div>
            ):null}
        </div>
    );
}

InputSelection.defaultProps ={
    name: 'input',
    compare: [],
    data: '',
    placeholder:''
}
export default InputSelection;

