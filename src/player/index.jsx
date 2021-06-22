import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import noSongsImage from "@assets/img/player/no-songs.svg"
import ProgressBar from "@player/components/progress-bar"
import ChangeSongBtn from "@player/components/change-song-btn"
import PlayBtn from "@player/components/play-btn"
import ShuffleBtn from "@player/components/shuffle-btn"
import RepeatBtn from "@player/components/repeat-btn"
import VolumeBtn from "@player/components/volume-btn"
import { setIsPlaying, setCurrentTime, setDuration, setLoadedTime } from "@store/player"

let audio = new Audio()

const Player = () => {
    const dispatch    = useDispatch()
    const isPlaying   = useSelector((state) => state.player.isPlaying)
    const currentTime = useSelector((state) => state.player.currentTime)
    const loadedTime  = useSelector((state) => state.player.loadedTime)
    const duration    = useSelector((state) => state.player.duration)

    useEffect(() => {
        audio.ontimeupdate     = onAudioTimeUpdate
        audio.onprogress       = onAudioLoadBufferUpdate
        audio.onloadedmetadata = onLoadedMetadata
        audio.onended          = onAudioEnded
    }, [])

    return (
        <section className="player">
            <div className="player__inner">
                <div className="player__image-wrapper">
                    <img src={noSongsImage} alt="No song choosen" />
                </div>

                <div className="player__content">
                    <div className="player__top-bar">
                        <div className="player__top-bar-mobile-image">
                            <img src={noSongsImage} alt="No song choosen" />
                        </div>

                        <div>
                            <h2 className="player__top-bar-song">Title</h2>
                            <span className="player__top-bar-author">Author</span>
                        </div>
                    </div>

                    <div className="player__controls controls">
                        <ProgressBar
                            audioCurrentTime={currentTime}
                            duration={duration}
                            loadedTime={loadedTime}
                            onChange={onUserChangesTime}
                        />

                        <div className="controls__buttons-block">
                            <ChangeSongBtn />
                            <PlayBtn
                                isPlaying={isPlaying}
                                onClick={onPlayBtnClick}
                            />
                            <ChangeSongBtn />

                            <ShuffleBtn className="controls__btn_right" />
                            <RepeatBtn />
                            <VolumeBtn />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

    function onPlayBtnClick() {
        if (isPlaying) {
            audio.pause()
            dispatch(setIsPlaying(false))
        } else {
            audio.play()
            dispatch(setIsPlaying(true))
        }
    }

    function onAudioTimeUpdate() {
        dispatch(setCurrentTime(Math.ceil(audio.currentTime)))
    }

    function onAudioLoadBufferUpdate() {
        const bufferLength = audio.buffered.length
        if (bufferLength > 0) {
            dispatch(setLoadedTime(audio.buffered.end(bufferLength - 1)))
        }
    }

    function onLoadedMetadata() {
        dispatch(setDuration(Math.ceil(audio.duration)))
    }

    function onAudioEnded() {
        dispatch(setIsPlaying(false))
    }

    function onUserChangesTime(newTime) {
        try {
            audio.currentTime = newTime
            dispatch(setCurrentTime(Math.ceil(newTime)))
        } catch (err) {
            audio.currentTime = currentTime
            dispatch(setCurrentTime(currentTime))
        }
    }
}

export default Player
