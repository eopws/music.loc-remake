// here will be imports

const ShuffleBtn = ({onClick, className = ''}) => {

    return (
        <button
            className={'controls__btn controls-btn ' + className}
            onClick={onClick}
        >
            <svg x="0px" y="0px" width="16px" height="16px" viewBox="0 0 384.97 384.97" fill="#FFEFAF"><g><g id="Shuffle"><path d="M379.34,290.664l-57.926-58.612c-4.728-4.752-12.391-4.752-17.107,0c-4.728,4.74-4.728,12.439,0,17.179l38.87,39.327h-72.639l-45.378-56.747c-4.74-4.74-12.427-4.74-17.167,0c-4.74,4.74-4.74,12.427,0,17.167l48.049,60.079c2.382,2.382,5.498,3.561,8.614,3.549c0.012,0,0.012,0,0.024,0h78.871l-39.243,39.7c-4.728,4.74-4.728,12.439,0,17.179c4.728,4.752,12.391,4.752,17.119,0l59.057-59.755c2.671-2.189,4.487-5.402,4.487-9.143C384.97,296.354,382.648,292.806,379.34,290.664z"/><path d="M12.03,96.074h90.468l45.258,56.591c4.74,4.74,12.427,4.74,17.167,0c4.74-4.74,4.74-12.427,0-17.167l-48.049-60.079c-2.574-2.562-5.991-3.621-9.348-3.405H12.03C5.39,72.013,0,77.403,0,84.044C0,90.684,5.39,96.074,12.03,96.074z"/><path d="M270.922,96.074h73.12l-39.243,39.7c-4.728,4.74-4.728,12.439,0,17.179c4.728,4.752,12.391,4.752,17.119,0l59.43-60.139c4.896-4.92,4.728-13.077-0.517-17.709l-58.912-59.622c-4.728-4.752-12.391-4.752-17.119,0c-4.728,4.74-4.728,12.439,0,17.179l38.87,39.327h-79.003c-0.06,0-0.108,0.036-0.168,0.036c-3.405-0.301-6.629,0.746-9.36,3.477L101.572,288.559H12.03c-6.641,0-12.03,5.39-12.03,12.03s5.39,12.03,12.03,12.03h96.242c3.32,0,6.978-1.492,9.323-3.85L270.922,96.074z"/></g></g></svg>
        </button>
    )
}

export default ShuffleBtn