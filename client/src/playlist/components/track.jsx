import formatTime from "@utils/format-time"

const Track = ({track, isActive, isPlaying, onClick}) => {

    return (
        <div className="track-list__item track">

            <div
                className="track__wrapper"
                onClick={onClick}
            >

                <div className="track__inner">

                    <div className="track__image-wrapper">

                        <div
                            className="track__image"
                            style={{
                                backgroundImage: 'url(' + process.env.REACT_APP_API_URL + 'static/img/' + track.img + ')'
                            }}
                        ></div>

                        <div className={'track__icon ' + (isActive ? 'track__icon_show' : '')}>
                            {
                                isActive && isPlaying ?
                                <svg width="40px" height="40px" viewBox="0 0 100 100" fill="#fff"><g transform="rotate(180 50 50)"><rect height="72.4964" x="15" width="20"><animate attributeName="height" calcMode="spline" values="50;75;10;50" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1" repeatCount="indefinite" begin="-0.6666666666666666s" dur="1s"></animate></rect><rect height="11.5407" x="40" width="20"><animate attributeName="height" calcMode="spline" values="50;75;10;50" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1" repeatCount="indefinite" begin="0s" dur="1s"></animate></rect><rect height="50.9629" x="65" width="20"><animate attributeName="height" calcMode="spline" values="50;75;10;50" keySplines="0.5 0 0.5 1;0.5 0 0.5 1;0.5 0 0.5 1" repeatCount="indefinite" begin="-0.3333333333333333s" dur="1s"></animate></rect></g></svg>
                                :
                                <svg x="0px" y="0px" width="18px" height="18px" viewBox="0 0 124.512 124.512" fill="#FFF"><g><path d="M113.956,57.006l-97.4-56.2c-4-2.3-9,0.6-9,5.2v112.5c0,4.6,5,7.5,9,5.2l97.4-56.2 C117.956,65.105,117.956,59.306,113.956,57.006z"/></g></svg>
                            }
                        </div>

                    </div>

                    <div className="track__title">
                        <span className="track__title-song">{track.title}</span>
                        <span className="track__title-author">{track.author}</span>
                    </div>

                    <div className="track__time">
                        <span>{formatTime(track.duration)}</span>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Track
