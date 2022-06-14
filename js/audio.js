let soundOn = false
let audioStarted = false

const musicToggle = () => {

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
}

const playSFX = (sfx) => {
    document.querySelector(`#sfx_${sfx}`).play()
}