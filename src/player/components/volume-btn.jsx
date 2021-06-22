import { useRef, useState } from "react"

let isDragging = false
let mouseOnVolume = false

const VolumeBtn = ({volume, onChange, className = ''}) => {
    const [isVolumeChangerShown, setIsVolumeChangerShown] = useState(false)
    const volumeChanger                                   = useRef(null)

    return (
        <button
            className={'controls__btn controls-btn ' + className}
            onMouseEnter={onMouseEnterBtn}
            onMouseLeave={onMouseLeaveBtn}
            onTouchStart={onMouseEnterBtn}
        >
            {
                volume > 50 ?
                    // full volume
                    <svg x="0px" y="0px" width="15px" height="15px" viewBox="0 0 480 480" fill="#FFEFAF"><g><g><path d="M278.944,17.577c-5.568-2.656-12.128-1.952-16.928,1.92L106.368,144.009H32c-17.632,0-32,14.368-32,32v128c0,17.632,14.368,32,32,32h74.368l155.616,124.512c2.912,2.304,6.464,3.488,10.016,3.488c2.368,0,4.736-0.512,6.944-1.568c5.536-2.688,9.056-8.288,9.056-14.432v-416C288,25.865,284.48,20.265,278.944,17.577z M96,304.009H32v-128h64V304.009z M256,414.697l-128-102.4V167.721l128-102.4V414.697z"/></g></g><g><g><path d="M369.024,126.857c-6.304-6.24-16.416-6.144-22.624,0.128c-6.208,6.304-6.144,16.416,0.128,22.624c24.16,23.904,37.472,56,37.472,90.4c0,34.4-13.312,66.496-37.472,90.4c-6.304,6.208-6.368,16.32-0.128,22.624c3.136,3.168,7.264,4.736,11.36,4.736c4.064,0,8.128-1.536,11.264-4.64c30.304-29.92,46.976-70.08,46.976-113.12C416,196.969,399.328,156.809,369.024,126.857z"/></g></g><g><g><path d="M414.144,81.769c-6.272-6.208-16.416-6.176-22.624,0.096c-6.208,6.272-6.176,16.416,0.096,22.624C427.968,140.553,448,188.681,448,240.009s-20.032,99.456-56.384,135.52c-6.272,6.208-6.304,16.352-0.096,22.624c3.136,3.168,7.232,4.736,11.36,4.736c4.064,0,8.128-1.536,11.264-4.64C456.608,356.137,480,299.945,480,240.009C480,180.073,456.608,123.881,414.144,81.769z"/></g></g></svg>
                    :
                volume > 0 ?
                    // half volume
                    <svg x="0px" y="0px" width="15px" height="15px" viewBox="0 0 448.023 448.023" fill="#FFEFAF"><g><g><path d="M294.956,1.591c-5.6-2.688-12.128-1.92-16.928,1.92L122.38,128.023H48.012c-17.664,0-32,14.368-32,32v128c0,17.632,14.336,32,32,32h74.368l155.616,124.512c2.912,2.304,6.464,3.488,10.016,3.488c2.336,0,4.704-0.512,6.944-1.568c5.536-2.688,9.056-8.288,9.056-14.432v-416C304.012,9.879,300.492,4.279,294.956,1.591z M112.012,288.023h-64v-128h64V288.023z M272.012,398.711l-128-102.4V151.735l128-102.4V398.711z"/></g></g><g><g><path d="M385.004,110.871c-6.272-6.208-16.416-6.112-22.624,0.128c-6.208,6.304-6.144,16.416,0.128,22.656c24.192,23.872,37.504,55.968,37.504,90.368c0,34.4-13.312,66.496-37.504,90.368c-6.272,6.24-6.336,16.352-0.128,22.656c3.136,3.168,7.264,4.736,11.36,4.736c4.064,0,8.128-1.536,11.264-4.608c30.336-29.92,47.008-70.112,47.008-113.152C432.012,180.983,415.34,140.791,385.004,110.871z"/></g></g></svg>
                    :
                    // muted
                    <svg x="0px" y="0px" width="15px" height="15px" viewBox="0 0 448.023 448.023" fill="#FFEFAF"><g><g><path d="M342.94,1.591c-5.6-2.688-12.128-1.92-16.928,1.92l-127.68,102.08c-6.912,5.504-8,15.584-2.496,22.496 c5.536,6.944,15.584,8.064,22.496,2.528l101.664-81.312v196.48c0,8.864,7.168,16,16,16c8.832,0,16-7.168,16-16V16.023 C351.996,9.879,348.476,4.279,342.94,1.591z"/></g></g><g><g><path d="M443.324,420.727l-95.968-95.968l-0.032-0.032l-160-160l-0.032-0.032l-31.968-31.968l-0.032-0.032l-127.968-128 c-6.24-6.24-16.384-6.24-22.624,0c-6.24,6.24-6.24,16.384,0,22.624l100.672,100.704h-9.376c-17.952,0-32,14.048-32,32v128 c0,17.952,14.048,32,32,32h74.368L325.98,444.535c2.912,2.304,6.464,3.488,10.016,3.488c2.336,0,4.704-0.512,6.944-1.568 c5.536-2.688,9.056-8.288,9.056-14.432v-57.376l68.672,68.672c3.136,3.136,7.232,4.704,11.328,4.704s8.192-1.568,11.328-4.672 C449.564,437.111,449.564,426.967,443.324,420.727z M159.996,288.023h-64v-128h41.376l22.624,22.624V288.023z M319.996,398.711 l-128-102.4v-81.664l128,128V398.711z"/></g></g></svg>
            }

            <div
                className={"controls-btn__volume-changer volume-changer" + (isVolumeChangerShown ? ' volume-changer_show' : '')}
                onMouseDown={onDragMouseStart}
                onTouchStart={onDragTouchStart}
                ref={volumeChanger}
            >
                <div
                    className="volume-changer__seek"
                    style={{
                        height: volume + '%'
                    }}
                ></div>
            </div>
        </button>
    )

    function onMouseEnterBtn(e) {
        mouseOnVolume = true
        setIsVolumeChangerShown(true)
    }

    function onMouseLeaveBtn(e) {
        mouseOnVolume = false

        setTimeout(() => !isDragging && !mouseOnVolume && setIsVolumeChangerShown(false), 300)
    }

    function onUserMovesSeek(e) {
        if (e.type === 'touchmove' || e.type === 'touchstart') {
            e = e.targetTouches[0]
        }

        let newVolumeValue = volumeChanger.current.getBoundingClientRect().bottom - e.clientY

        if (newVolumeValue < 0) {
            newVolumeValue = 0
        }

        if (newVolumeValue > 100) {
            newVolumeValue = 100
        }

        onChange(newVolumeValue)
    }

    function onDragMouseStart(e) {
        e.preventDefault()
        onUserMovesSeek(e)
        isDragging = true

        document.onmousemove = onUserMovesSeek
        document.onmouseup   = onDragEnd
        document.ontouchmove = null
        document.ontouchend  = null
    }

    function onDragTouchStart(e) {
        onUserMovesSeek(e)
        isDragging = true

        document.onmousemove = null
        document.onmouseup   = null
        document.ontouchmove = onUserMovesSeek
        document.ontouchend  = onDragEnd
    }

    function onDragEnd(e) {
        isDragging = false

        if (!mouseOnVolume) {
            setIsVolumeChangerShown(false)
        }

        document.onmousemove = null
        document.onmouseup   = null
        document.ontouchmove = null
        document.ontouchend  = null
    }
}

export default VolumeBtn
