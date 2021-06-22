import formatTime from "@utils/format-time"
import { useEffect, useRef, useState } from "react"

let isDragging = false
// used to save new audio current time between drag events
let newCurrentTime = 0

const ProgressBar = ({audioCurrentTime, duration, loadedTime, onChange}) => {
    const [currentTime, setCurrentTime] = useState(0)

    const seekRef = useRef()

    useEffect(() => {
        if (!isDragging) {
            setCurrentTime(audioCurrentTime)
        }
    }, [audioCurrentTime])

    return (
        <div
            className="controls__progress-bar progress-bar"
        >
            <div className="progress-bar__time">
                <span className="progress-bar__time-current">{formatTime(currentTime)}</span>
                <span className="progress-bar__time-duration">{formatTime(duration)}</span>
            </div>

            <div
                className="progress-bar__seek"
                onMouseDown={onDragMouseStart}
                onTouchStart={onDragTouchStart}
                ref={seekRef}
            >
                <div
                    className="progress-bar__seek-played progress-bar__seek-thumb"
                    style={{
                        width: (currentTime * 100 / duration) + '%'
                    }}
                ></div>
                <div
                    className="progress-bar__seek-loaded progress-bar__seek-thumb"
                    style={{
                        width: (loadedTime * 100 / duration) + '%'
                    }}
                ></div>
            </div>
        </div>
    )

    function onUserMovesSeek(e) {
        if (e.type === 'touchmove' || e.type === 'touchstart') {
            e = e.targetTouches[0]
        }

        let leftOffsetPixels   = e.clientX - seekRef.current.getBoundingClientRect().left
        let leftOffsetProcents = leftOffsetPixels * 100 / seekRef.current.offsetWidth
        newCurrentTime         = Math.floor(duration * leftOffsetProcents / 100)

        if (newCurrentTime < 0) {
            newCurrentTime = 0
        }

        if (newCurrentTime > duration) {
            newCurrentTime = duration
        }

        setCurrentTime(newCurrentTime)
    }

    function onDragMouseStart(e) {
        // register only left button clicks
        if (e.button !== 0) {
            return null
        }

        // prevent selection
        e.preventDefault()

        onUserMovesSeek(e)
        isDragging = true

        document.onmousemove = onUserMovesSeek
        document.onmouseup   = onUserStopsMoveSeek
        document.ontouchmove = null
        document.ontouchend  = null
    }

    function onDragTouchStart(e) {
        onUserMovesSeek(e)
        isDragging = true

        document.ontouchmove = onUserMovesSeek
        document.ontouchend  = onUserStopsMoveSeek
        document.onmousemove = null
        document.onmouseup   = null
    }

    function onUserStopsMoveSeek(e) {
        onChange(newCurrentTime)
        isDragging = false

        document.onmousemove = null
        document.onmouseup   = null
        document.ontouchmove = null
        document.ontouchend  = null
    }
}

export default ProgressBar
