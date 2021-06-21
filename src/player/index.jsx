import noSongsImage from "@assets/img/player/no-songs.svg"
import ProgressBar from "@player/components/progress-bar"
import ChangeSongBtn from "@player/components/change-song-btn"
import PlayBtn from "@player/components/play-btn"
import ShuffleBtn from "@player/components/shuffle-btn"
import RepeatBtn from "@player/components/repeat-btn"
import VolumeBtn from "@player/components/volume-btn"

const Player = () => {

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
                        <ProgressBar />

                        <div className="controls__buttons-block">
                            <ChangeSongBtn />
                            <PlayBtn />
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
}

export default Player
