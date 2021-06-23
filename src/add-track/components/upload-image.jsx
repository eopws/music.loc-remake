import { useRef } from "react"

const UploadImage = ({image, onChange}) => {
    const imageInput = useRef(null)

    let imageUrl

    try {
        imageUrl   = URL.createObjectURL(image)
    } catch (err) {
        imageUrl = ''
    }

    return (
        <div className="add-song-form__image-box upload-image-box">
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
                        onChange={onChange}
                    />
                </button>
            </div>
        </div>
    )

    function openImageSelection(e) {
        if (imageInput.current) {
            imageInput.current.click()
        }
    }
}

export default UploadImage
