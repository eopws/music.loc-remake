// here will be imports

const ProgressBar = () => {

    return (
        <div className="controls__progress-bar progress-bar">
            <div className="progress-bar__time">
                <span className="progress-bar__time-current">1:49</span>
                <span className="progress-bar__time-duration">4:01</span>
            </div>

            <div className="progress-bar__seek">
                <div className="progress-bar__seek-played progress-bar__seek-thumb"></div>
                <div className="progress-bar__seek-loaded progress-bar__seek-thumb"></div>
            </div>
        </div>
    )
}

export default ProgressBar
