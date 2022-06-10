const navigate = () => {
    console.log("navigate")

    let loading = document.querySelector("#loading_container"),
        splash = document.querySelector("#splash_container"),
        levels = document.querySelector("#levels_container"),
        game = document.querySelector("#game_container")

    loading.style.display = "none"
    splash.style.display = "flex"
    levels.style.display = "none"
    game.style.display = "none"
}

setTimeout(() => {
    navigate()
}, 2000)