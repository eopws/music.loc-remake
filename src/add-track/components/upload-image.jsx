
const UploadImage = ({onChange}) => {

    return (
        <div className="add-song-form__image-box upload-image-box">
            <div className="upload-image-box__inner">
                <span className="upload-image-box__title">Drag an image here</span>
                <span className="upload-image-box__secondary-text">Or</span>

                <button className="add-song-form__btn">
                    Select an image

                    <input
                        name="track-image"
                        type="file"
                        hidden
                        onChange={onChange}
                    />
                </button>
            </div>
        </div>
    )
}

export default UploadImage
