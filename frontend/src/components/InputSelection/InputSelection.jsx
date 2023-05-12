import React, { useState } from 'react';
import './InputSelection.css'

const InputSelection = (props) => {

    const [matches, setmatches] = useState([]);

    const name = props.name
    const placeholder = props.placeholder
    const comparison = props.compare
    const data = props.inputData
    const exist = props.exist

    function existingData(matchObject){
        props.existBtnAction(matchObject)
        setmatches([])
    }

    function task(matchObject){
        let value = matchObject.name
        if(!value){
            value = matchObject.title
        }
        props.task(value)
        setmatches([])
    }

    function findMatches(value){
        let numberOfChar = value.length
        if(numberOfChar > 0){
            let checkForMatches = comparison.filter(a=>{
                let wordsInName
                try{
                    if(a.name.slice(0,numberOfChar).toLowerCase() === value.toLowerCase()){
                        return true
                    }
                    wordsInName = a.name.toLowerCase().split(' ')
                } catch{
                    if(a.title.slice(0,numberOfChar).toLowerCase() === value.toLowerCase()){
                        return true
                    }
                    wordsInName = a.title.toLowerCase().split(' ')
                }

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
        if(exist && value !== ''){
            let match = matches.filter(item => item.name.toLowerCase() === value.toLowerCase())[0]
            if(match){existingData(match)}
        }
    }

    return (
        <div className={name+'-selection relative'}>
            <input data-cy={name} className={name+'-selection-input'} onInput={(e)=>findMatches(e.target.value)} id={name+'s'} name={name} value={data} onChange={(e)=>props.task(e.target.value)} autoComplete='off' placeholder={placeholder} required/>
            {matches.length > 0 ? (
                <div className={name+'-selection-box absolute'}>
                    {matches.map((match,index)=>{
                        return(
                            <button key={index} onClick={exist ?  (()=>existingData(match)):(()=>task(match))} className={name+'-selection-option'}>{match.name ? match.name : match.title}</button>
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
    placeholder:'',
    exist: false,
    existBtnAction: function doNothing(){}
}
export default InputSelection;

