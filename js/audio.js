let soundOn = false

const musicToggle = () => {
    let bgMusic = document.querySelector("#sfx_bg")
    let uiMute = document.querySelectorAll(".ui_mute")
    let sounds = document.querySelectorAll(".ui_mute")

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