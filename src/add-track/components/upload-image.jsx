import { useRef, useState } from "react"

const UploadImage = ({image, onChange}) => {
    const [drag, setDrag] = useState(0)
    const imageInput      = useRef(null)

    let imageUrl

    try {
        imageUrl   = URL.createObjectURL(image)
    } catch (err) {
        imageUrl = ''
    }

    return (
        <div
            className={'add-song-form__image-box upload-image-box ' + (drag ? 'upload-image-box_hover' : '')}
            onDragStart={onDragStart}
            onDragLeave={onDragEnd}
            onDragOver={onDragStart}
            onDrop={onDrop}
        >
            {
                image !== null ?
                    <div
                        className="upload-image-box__image-preview"
                        onClick={openImageSelection}
                        style={{
                            backgroundImage: `url(${imageUrl})`
                        }}
                    ></div>
                    :
                    ''
            }

            <div className="upload-image-box__inner">
                <span className="upload-image-box__title">Drag an image here</span>
                <span className="upload-image-box__secondary-text">Or</span>

                <button
                    className="add-song-form__btn"
                    onClick={openImageSelection}
                >
                    Select an image

                    <input
                        ref={imageInput}
                        name="track-image"
                        type="file"
                        hidden
                        onChange={onImageSet}
                    />
                </button>
            </div>
        </div>
    )

    function onDragStart(e) {
        e.preventDefault()

        setDrag(true)
    }

    function onDragEnd(e) {
        e.preventDefault()

        setDrag(false)
    }

    function onDrop(e) {
        e.preventDefault()

        let file = e.dataTransfer.files[0]

        onChange(file)

        setDrag(false)
    }

    function openImageSelection(e) {
        if (imageInput.current) {
            imageInput.current.click()
        }
    }

    function onImageSet(e) {
        onChange(e.target.files[0])
    }
}

export default UploadImage
