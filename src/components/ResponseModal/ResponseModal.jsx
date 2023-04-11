import './ResponseModal.css'

const ResponseModal = (props) => {

    const message = props.response.data
    const status = props.response.status
    const error = !props.goodCodes.includes(status)


    return (
        <div className='modal'>
            <div className={`modal-body`+ (error ? ' error':' success')}>
                {error ? <p className='error-code'>{`Error Code : ${status} :`}</p>:null}
                <p>{message}</p>
                <div className='modal-btns'>
                    {props.buttons.map((btn,index) => <button key={index} onClick={btn.func}>{btn.message}</button>)}
                </div>
            </div>
        </div>

    );
}

export default ResponseModal;