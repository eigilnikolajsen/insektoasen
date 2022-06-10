// 2. YEAR EXAM
// DMJX, INTERACTIVE DESIGN, JUNE 2022
// CODED BY EIGIL NIKOLAJSEN

const navigate = (site, level) => {
    console.log("navigate")

    let loading = document.querySelector("#loading_container"),
        splash = document.querySelector("#splash_container"),
        levels = document.querySelector("#levels_container"),
        game = document.querySelector("#game_container")

    let pagesArr = ["loading", "splash", "levels", "game"]



    for (let i = 0; i < pagesArr.length; i++) {
        let allCont = document.querySelector(`#${pagesArr[i]}_container`)
        let nextCont = document.querySelector(`#${site}_container`)

        allCont.classList.add("container_fade")
        setTimeout(() => {
            allCont.style.display = "none"
        }, 100)

        if (pagesArr[i] == site) {
            setTimeout(() => {
                nextCont.style.display = "flex"
                if (site == "game") {
                    buildAnagram(level)
                }
                if (site == "levels") {
                    buildLevels()
                }
            }, 150)
            setTimeout(() => {
                nextCont.classList.remove("container_fade")
            }, 200)
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