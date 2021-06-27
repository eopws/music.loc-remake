import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import ProgressBar from "@player/components/progress-bar"
import ChangeTrackBtn from "@player/components/change-song-btn"
import PlayBtn from "@player/components/play-btn"
import ShuffleBtn from "@player/components/shuffle-btn"
import RepeatBtn from "@player/components/repeat-btn"
import VolumeBtn from "@player/components/volume-btn"
import AddSongBtn from "@player/components/add-song-btn"
import { setIsPlaying, setCurrentTime, setDuration, setLoadedTime, setVolume } from "@store/player"
import {showModal } from "@store/add-song"
import { shufflePlaylist, turnPrevTrack, turnNextTrack, setRepeat } from "@store/playlist"


let audio = new Audio()

const Player = () => {
    const dispatch = useDispatch()

    const isPlaying   = useSelector((state) => state.player.isPlaying)
    const currentTime = useSelector((state) => state.player.currentTime)
    const loadedTime  = useSelector((state) => state.player.loadedTime)
    const duration    = useSelector((state) => state.player.duration)
    const volume      = useSelector((state) => state.player.volume)
    const track       = useSelector((state) => state.playlist.currentTrack)
    const repeat      = useSelector((state) => state.playlist.repeat)

    useEffect(() => {
        audio.ontimeupdate     = onAudioTimeUpdate
        audio.onprogress       = onAudioLoadBufferUpdate
        audio.onloadedmetadata = onLoadedMetadata
        audio.onended          = onAudioEnded
        audio.onerror          = onAudioError

        audio.volume = volume / 100

        if (track) {
            audio.src = process.env.REACT_APP_API_URL + 'static/audio/' + track.audio
            audio.play()
            dispatch(setIsPlaying(true))
        }
    }, [track])

    let headerImage = track ? track.img : 'track-default-img.png';
    headerImage = process.env.REACT_APP_API_URL + 'static/img/' + headerImage

    return (
        <section className="player">
            <div className="player__inner">
                <div className="player__image-wrapper">
                    <div
                        className="player__image"
                        style={{
                            backgroundImage: 'url(' + headerImage + ')'
                        }}
                    ></div>
                </div>

                <div className="player__content">
                    <div className="player__top-bar">
                        <div className="player__top-bar-mobile-image">
                            <img src={headerImage} alt="No song choosen" />
                        </div>

                        <div>
                            <h2 className="player__top-bar-song">{track ? track.title : ''}</h2>
                            <span className="player__top-bar-author">{track ? track.author : ''}</span>
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

                            <ShuffleBtn
                                className="controls__btn_right"
                                onClick={onShuffleClick}
                            />
                            <RepeatBtn
                                repeat={repeat}
                                onClick={onUserSetsRepeat}
                            />
                            <VolumeBtn
                                volume={volume}
                                onChange={onUserChangesVolume}
                            />
                            <AddSongBtn
                                onClick={onAddSongClick}
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

    function onShuffleClick() {
        dispatch(shufflePlaylist())
    }

    function onUserSetsRepeat() {
        dispatch(setRepeat(!repeat))
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

    function onAddSongClick() {
        dispatch(showModal())
    }
}

export default Player
