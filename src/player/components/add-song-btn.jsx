// here will be imports

const AddSongBtn = ({onClick, className = ''}) => {

    return (
        <button
            className={'controls__btn controls-btn ' + className}
            onClick={onClick}
        >
            <svg x="0px" y="0px" width="17px" height="17px" viewBox="0 0 93.562 93.562" fill="#FFEFAF"><g><path d="M87.952,41.17l-36.386,0.11V5.61c0-3.108-2.502-5.61-5.61-5.61c-3.107,0-5.61,2.502-5.61,5.61l0.11,35.561H5.61 c-3.108,0-5.61,2.502-5.61,5.61c0,3.107,2.502,5.609,5.61,5.609h34.791v35.562c0,3.106,2.502,5.61,5.61,5.61 c3.108,0,5.61-2.504,5.61-5.61V52.391h36.331c3.108,0,5.61-2.504,5.61-5.61C93.562,43.672,91.032,41.17,87.952,41.17z"/></g></svg>
        </button>
    )
}

export default AddSongBtn
