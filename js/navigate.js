// 2. YEAR EXAM
// DMJX, INTERACTIVE DESIGN, JUNE 2022
// CODED BY EIGIL NIKOLAJSEN

const navigate = (site, level) => {
    console.log("navigate")

    let pagesArr = ["loading", "splash", "levels", "game", "stats", "info"]

    getkdk()



    for (let i = 0; i < pagesArr.length; i++) {

        if (kdk.game.onboarding && site == "levels") {
            kdk.game.onboarding = false
            setkdk()
            if (!audioStarted) musicToggle(true)
            navigate("game", "onboarding-1")
            return
        }

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
                    container.style.backgroundImage = "none"
                    buildAnagram(level)
                }
                if (site == "levels") {
                    console.log("navigate levels")
                    container.style.backgroundImage = "none"
                    if (!audioStarted) musicToggle(true)
                    buildLevels()
                }
                if (site == "splash") {
                    container.style.backgroundImage = "var(--green-green)"
                    appHeight()
                }
                if (site == "stats") {
                    container.style.backgroundImage = "var(--guldsmede)"
                    buildStats()
                }
                if (site == "info") {
                    container.style.backgroundImage = "var(--moel)"
                    buildStats()
                }
                allButtons()
            }, foregroundDuration * 1000 * 0.32)
        }
    }
}

navigate("loading")

setTimeout(() => {
    navigate("splash")
}, 1000)