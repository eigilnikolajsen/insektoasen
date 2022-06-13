// 2. YEAR EXAM
// DMJX, INTERACTIVE DESIGN, JUNE 2022
// CODED BY EIGIL NIKOLAJSEN

const navigate = (site, level) => {
    console.log("navigate")

    let loading = document.querySelector("#loading_container"),
        splash = document.querySelector("#splash_container"),
        levels = document.querySelector("#levels_container"),
        game = document.querySelector("#game_container")

    let pagesArr = ["loading", "splash", "levels", "game", "stats", "info"]

    for (let i = 0; i < pagesArr.length; i++) {
        let allCont = document.querySelector(`#${pagesArr[i]}_container`)
        let nextCont = document.querySelector(`#${site}_container`)
        let foreground = document.querySelector(`#foreground`)
        let foregroundDuration = 0.6
        let container = document.querySelector("#container")

        foreground.className = ""
        if (site != "loading") {
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => {
                    foreground.className = "transition"
                })
            })
        }

        setTimeout(() => {
            allCont.style.display = "none"
        }, foregroundDuration * 1000 * 0.31)

        if (pagesArr[i] == site) {
            setTimeout(() => {
                nextCont.style.display = "flex"
                if (site == "game") {
                    buildAnagram(level)
                }
                if (site == "levels") {
                    console.log("navigate levels")
                    container.style.backgroundImage = "none"
                    buildLevels()
                }
                if (site == "splash") {
                    container.style.backgroundImage = "var(--green-green)"
                        // UNCOMMENT TO ENABLE SCREENFULL
                        // const fullscreenElement = document.querySelector("#container");
                        //
                        // document.querySelector("#start_button").addEventListener('click', () => {
                        //     if (screenfull.isEnabled) {
                        //         screenfull.request(fullscreenElement);
                        //     }
                        // })
                }
                if (site == "stats") {
                    buildStats()
                }
            }, foregroundDuration * 1000 * 0.32)
        }
    }

    // loading.style.display = "none"
    // splash.style.display = "none"
    // levels.style.display = "none"
    // game.style.display = "none"

    // document.querySelector(`#${site}_container`).style.display = "flex"

}

navigate("loading")

setTimeout(() => {
    navigate("splash")
}, 2000)