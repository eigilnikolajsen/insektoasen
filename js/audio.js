let soundOn = false
let audioStarted = false
let soundOff = true

window.addEventListener("blur", () => {
    if (!soundOff && soundOn) musicToggle(false)
})

window.addEventListener("focus", () => {
    if (!soundOff && !soundOn) musicToggle(false)
})

const musicToggle = (on) => {

    audioStarted = true
    let bgMusic = document.querySelector("#sfx_bg")
    bgMusic.volume = 0.25
    let uiMute = document.querySelectorAll(".ui_mute")
    let sounds = document.querySelectorAll("audio")

    console.log(bgMusic)


    if (soundOn) {
        bgMusic.pause()
        sounds.forEach((el) => { el.muted = true })
        uiMute.forEach((el) => { el.textContent = "›" })
    } else {
        bgMusic.play()
        sounds.forEach((el) => { el.muted = false })
        uiMute.forEach((el) => { el.textContent = "‹" })
    }

    soundOn = !soundOn
    if (on) soundOff = !soundOff
}

const playSFX = (sfx) => {
    document.querySelector(`#sfx_${sfx}`).play()
}