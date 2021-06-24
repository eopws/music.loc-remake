import "@assets/reset.css"
import "@assets/style.scss"
import siteBackground from "@assets/img/background.jpg"
import { useEffect } from "react"
import Player from "@player"
import Playlist from "@playlist"
import AddSong from "@add-track"

const App = () => {
    useEffect(() => {
        // set all images inside div.ibg as backgrounds for all those div's
        document.querySelectorAll('.ibg').forEach(item => {
            const img = item.querySelector('img')

            if (!img) {
                return null
            }

            item.style.backgroundImage = `url(${img.src})`

            img.remove()
        })
    }, [])

    return (
        <div className="wrapper">

            <div className="site-background ibg">
                <img src={siteBackground} alt="" />
            </div>

            <div className="container">
                <Player />
                <Playlist />
            </div>

            <AddSong />

        </div>
    )
}

export default App
