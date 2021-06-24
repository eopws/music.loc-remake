import { useDispatch, useSelector } from "react-redux"
import UploadImage from "@add-track/components/upload-image"
import { hideModal } from "@store/add-song"
import { useRef, useState } from "react"

const AddSong = () => {
    const dispatch            = useDispatch()
    const isShown             = useSelector((state) => state.addSong.isShown)
    const [author, setAuthor] = useState('')
    const [title, setTitle]   = useState('')
    const [image, setImage]   = useState(null)
    const [audio, setAudio]   = useState(null)
    const audioInput          = useRef(null)

    return (
        <div className={'add-song-modal ' + (isShown ? 'add-song-modal_show' : '')}>
            <div className="add-song-modal__title">
                <span>Upload a track</span>
            </div>

            <form
                className="add-song-modal__upload-form add-song-form"
                onSubmit={onFormSubmit}
            >
                <div className="add-song-modal__content">
                    <UploadImage
                        image={image}
                        onChange={onImageChanges}
                    />

                    <div className="add-song-form__inputs-box">
                        <label className="add-song-form__text-input">
                            Author:
                            <input
                                type="text"
                                value={author}
                                onChange={onAuthorChanges}
                            />
                        </label>

                        <label className="add-song-form__text-input">
                            Title:
                            <input
                                type="text"
                                value={title}
                                onChange={onTitleChanges}
                            />
                        </label>
                    </div>

                    <div className="add-song-form__upload-audio-wrapper">
                        <button
                            className="add-song-form__btn"
                            onClick={openAudioSelection}
                        >
                            {
                                audio !== null ?
                                    'Audio uploaded'
                                    :
                                    'Upload audio'
                            }
                            <input
                                ref={audioInput}
                                type="file"
                                accept="audio/*"
                                hidden
                                onChange={onAudioChanges}
                            />
                        </button>
                    </div>
                </div>

                <div className="add-song-modal__footer add-song-footer">
                    <button
                        className="add-song-footer__btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                    <button className="add-song-footer__btn add-song-footer__btn_green">Upload</button>
                </div>
            </form>
        </div>
    )

    function onFormSubmit(e) {
        e.preventDefault()
    }

    function onImageChanges(image) {
        setImage(image)
    }

    function onAuthorChanges(e) {
        setAuthor(e.target.value)
    }

    function onTitleChanges(e) {
        setTitle(e.target.value)
    }

    function openAudioSelection(e) {
        if (audioInput.current) {
            audioInput.current.click()
        }
    }

    function onAudioChanges(e) {
        setAudio(e.target.files[0])
    }

    function onCancel(e) {
        dispatch(hideModal())
    }
}

export default AddSong
