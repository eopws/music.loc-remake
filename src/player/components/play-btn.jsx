// here will be imports

const PlayBtn = ({className = ''}) => {

    return (
        <button className={'controls__btn controls-btn ' + className}>
            <svg x="0px" y="0px" width="22px" height="22px" viewBox="0 0 124.512 124.512" fill="#FFEFAF"><g><path d="M113.956,57.006l-97.4-56.2c-4-2.3-9,0.6-9,5.2v112.5c0,4.6,5,7.5,9,5.2l97.4-56.2C117.956,65.105,117.956,59.306,113.956,57.006z"/></g></svg>
        </button>
    )
}

export default PlayBtn