import Track from "@playlist/components/track"
import { setCurrentTrack } from "@store/playlist"
import { useDispatch, useSelector } from "react-redux"

const Playlist = () => {
    const dispatch       = useDispatch()
    const tracks         = useSelector((state) => state.playlist.tracks)
    const currentTrackId = useSelector((state) => state.playlist.currentTrack?.id)
    const isPlaying      = useSelector((state) => state.player.isPlaying)

    return (
        <section className="track-list">
            <div className="track-list__inner">
                {Object.entries(tracks).map(([id, track]) =>
                    <Track
                        key={id}
                        isActive={currentTrackId === +id}
                        isPlaying={isPlaying}
                        track={track}
                        onClick={() => onUserSetsTrack(id)}
                    />
                )}
            </div>
        </section>
    )

    function onUserSetsTrack(trackId) {
        const newCurrentTrack = Object.assign({}, tracks[trackId])

        if (!newCurrentTrack) {
            return null
        }

        newCurrentTrack.id = +trackId

        dispatch(setCurrentTrack(newCurrentTrack))
    }
}

export default Playlist
