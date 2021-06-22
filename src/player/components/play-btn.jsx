// here will be imports

const PlayBtn = ({isPlaying, onClick, className = ''}) => {

    return (
        <button
            className={'controls__btn controls-btn ' + className}
            onClick={onClick}
        >
            {
                isPlaying ?
                    <svg x="0px" y="0px" width="22px" height="22px" viewBox="0 0 519.479 519.479" fill="#FFEFAF"><g><g><path d="M193.441,0h-75.484c-16.897,0-30.6,13.703-30.6,30.6v458.277c0,16.898,13.703,30.602,30.6,30.602h75.484c16.897,0,30.6-13.703,30.6-30.602V30.6C224.042,13.703,210.339,0,193.441,0z"/><path d="M401.521,0h-75.484c-16.896,0-30.6,13.703-30.6,30.6v458.277c0,16.898,13.703,30.602,30.6,30.602h75.484c16.896,0,30.6-13.703,30.6-30.602V30.6C432.121,13.703,418.418,0,401.521,0z"/></g></g></svg>
                    :
                    <svg x="0px" y="0px" width="22px" height="22px" viewBox="0 0 124.512 124.512" fill="#FFEFAF"><g><path d="M113.956,57.006l-97.4-56.2c-4-2.3-9,0.6-9,5.2v112.5c0,4.6,5,7.5,9,5.2l97.4-56.2C117.956,65.105,117.956,59.306,113.956,57.006z"/></g></svg>
            }
        </button>
    )
}

export default PlayBtn
