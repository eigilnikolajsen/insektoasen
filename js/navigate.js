const navigate = (site) => {
    console.log("navigate")

    let loading = document.querySelector("#loading_container"),
        splash = document.querySelector("#splash_container"),
        levels = document.querySelector("#levels_container"),
        game = document.querySelector("#game_container")

    if (site == "game") {
        buildImg()
        buildAnagram()
        letterSizeRecalc()
    }

    loading.style.display = "none"
    splash.style.display = "none"
    levels.style.display = "none"
    game.style.display = "none"

    document.querySelector(`#${site}_container`).style.display = "flex"
}

setTimeout(() => {
    navigate("splash")
}, 2000)