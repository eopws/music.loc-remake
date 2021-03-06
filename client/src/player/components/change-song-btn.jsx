// here will be imports

const ChangeTrackBtn = ({isRight, onClick, className = ''}) => {

    return (
        <button
            className={'controls__btn controls-btn ' + className}
            onClick={onClick}
        >
            <svg style={{
                transform: isRight ? 'rotate(180deg)' : ''
            }} x="0px" y="0px" width="15px" height="15px" viewBox="0 0 289.882 289.883" fill="#FFEFAF"><g><path d="M2.522,152.243l137.834,108.027c2.152,1.843,5.176,2.275,7.746,1.092c2.57-1.17,4.23-3.74,4.23-6.58v-92.937l125.581,98.425c2.138,1.843,5.164,2.275,7.746,1.092c2.57-1.17,4.222-3.74,4.222-6.58V35.096c0-2.849-1.67-5.437-4.275-6.605c-2.606-1.162-5.645-0.694-7.782,1.191L152.328,131.35V35.096c0-2.849-1.679-5.437-4.285-6.605c-2.594-1.162-5.644-0.694-7.773,1.191L2.436,141.342c-1.561,1.384-2.459,3.456-2.435,5.468C0.019,148.899,0.938,150.875,2.522,152.243z"/></g></svg>
        </button>
    )
}

export default ChangeTrackBtn
