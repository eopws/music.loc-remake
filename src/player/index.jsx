import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import noSongsImage from "@assets/img/player/no-songs.svg"
import ProgressBar from "@player/components/progress-bar"
import ChangeTrackBtn from "@player/components/change-song-btn"
import PlayBtn from "@player/components/play-btn"
import ShuffleBtn from "@player/components/shuffle-btn"
import RepeatBtn from "@player/components/repeat-btn"
import VolumeBtn from "@player/components/volume-btn"
import { setIsPlaying, setCurrentTime, setDuration, setLoadedTime, setVolume } from "@store/player"
import { turnPrevTrack, turnNextTrack } from "@store/playlist"

let audio = new Audio()

const Player = () => {
    const dispatch = useDispatch()

    const isPlaying   = useSelector((state) => state.player.isPlaying)
    const currentTime = useSelector((state) => state.player.currentTime)
    const loadedTime  = useSelector((state) => state.player.loadedTime)
    const duration    = useSelector((state) => state.player.duration)
    const volume      = useSelector((state) => state.player.volume)
    const track       = useSelector((state) => state.playlist.currentTrack)

    useEffect(() => {
        audio.ontimeupdate     = onAudioTimeUpdate
        audio.onprogress       = onAudioLoadBufferUpdate
        audio.onloadedmetadata = onLoadedMetadata
        audio.onended          = onAudioEnded
        audio.onerror          = onAudioError

        audio.volume = volume / 100

        if (track) {
            audio.src = track.url
            audio.play()
            dispatch(setIsPlaying(true))
        }
    }, [track])

    return (
        <section className="player">
            <div className="player__inner">
                <div className="player__image-wrapper">
                    <img src={track?.img ?? noSongsImage} alt="No song choosen" />
                </div>

                <div className="player__content">
                    <div className="player__top-bar">
                        <div className="player__top-bar-mobile-image">
                            <img src={track?.img ?? noSongsImage} alt="No song choosen" />
                        </div>

                        <div>
                            <h2 className="player__top-bar-song">{track?.title}</h2>
                            <span className="player__top-bar-author">{track?.author}</span>
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
                            <ChangeTrackBtn
                                onClick={() => onUserSetsTrack('prev')}
                            />
                            <PlayBtn
                                isPlaying={isPlaying}
                                onClick={play}
                            />
                            <ChangeTrackBtn
                                onClick={() => onUserSetsTrack('next')}
                                isRight={true}
                            />

                            <ShuffleBtn className="controls__btn_right" />
                            <RepeatBtn />
                            <VolumeBtn
                                volume={volume}
                                onChange={onUserChangesVolume}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

    function play() {
        // if the audio is not ready do nothing
        if (audio.readyState === 0) {
            return null
        }

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
        dispatch(turnNextTrack())
    }

    function onAudioError() {
        dispatch(setIsPlaying(false))
        dispatch(setDuration(0))
        dispatch(setCurrentTime(0))
        dispatch(setLoadedTime(0))
    }

    function onUserSetsTrack(to) {
        if (to === 'prev') {
            dispatch(turnPrevTrack())
        } else {
            dispatch(turnNextTrack())
        }
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

    function onUserChangesVolume(newVolume) {
        try {
            audio.volume = newVolume / 100
            dispatch(setVolume(newVolume))
        } catch(e) {
            audio.volume = volume
            dispatch(setVolume(volume))
        }
    }
}

export default Player
