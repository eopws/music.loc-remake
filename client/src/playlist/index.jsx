import Track from "@playlist/components/track"
import { setCurrentTrack, setTracks } from "@store/playlist"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getTracks } from "@http/tracksAPI"

let totalSongs
let currentPage = 1

const Playlist = () => {
    const dispatch       = useDispatch()
    const tracks         = useSelector((state) => state.playlist.tracks)
    const currentTrackId = useSelector((state) => state.playlist.currentTrack?.id)
    const isPlaying      = useSelector((state) => state.player.isPlaying)

    const [isFetching, setIsFetching]   = useState(false)
    const tracksLimit                   = 7

    useEffect(() => {
        getTracks(tracksLimit, currentPage).then((results) => {
            dispatch(setTracks(results.data))

            totalSongs = results.totalCount
        })
    }, [])

    return (
        <section className="track-list">
            <div
                className="track-list__inner"
                onScroll={onPlaylistScroll}
            >
                {Object.entries(tracks).map(([id, track]) =>
                    <Track
                        key={track.id}
                        isActive={currentTrackId === track.id}
                        isPlaying={isPlaying}
                        track={track}
                        onClick={() => onUserSetsTrack(track.id)}
                    />
                )}
            </div>
        </section>
    )

    // load tracks on loading
    function onPlaylistScroll(e) {
        if (isFetching) {
            return null
        }

        let leftToTheBottom = e.target.scrollHeight - (e.target.scrollTop + e.target.offsetHeight)

        if (leftToTheBottom < 100) {
            setIsFetching(true)

            loadSongs()
        }
    }

    function loadSongs() {
        if (totalSongs <= tracks.length) {
            setIsFetching(false)

            return false
        }

        currentPage++

        getTracks(tracksLimit, currentPage).then((results) => {
            dispatch(setTracks([...tracks, ...results.data]))
            setIsFetching(false)
        })
    }

    function onUserSetsTrack(trackId) {
        const newCurrentTrack = Object.assign({}, tracks.find((track) => track.id === trackId))

        if (!newCurrentTrack) {
            return null
        }

        newCurrentTrack.id = trackId

        dispatch(setCurrentTrack(newCurrentTrack))
    }
}

export default Playlist
