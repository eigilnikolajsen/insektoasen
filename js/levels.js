// 2. YEAR EXAM
// DMJX, INTERACTIVE DESIGN, JUNE 2022
// CODED BY EIGIL NIKOLAJSEN

const buildLevels = () => {
    let gameCat = kdk.game.categories
    let catTemplate = document.querySelector("#levels_categori_template")
    let catContainer = document.querySelector(".splide__list")
    let pag = document.querySelector(".splide__pagination")
    if (pag) pag.remove()

    let colorArr = []

    catContainer.innerHTML = ""

    for (const insect in gameCat) {
        let categoryInsect = gameCat[insect]
        let catClone = catTemplate.content.cloneNode(true)

        //title = Biller
        let title = catClone.querySelector(".levels_content_title")
        title.textContent = categoryInsect.categoryName
        colorArr.push(insect)

        let illu = catClone.querySelector(".levels_content_illustration")
        fetch(`img/insects/${insect}.svg`).then(r => r.text()).then(svg => {
            illu.innerHTML = svg
        }).catch(console.error.bind(console))

        let levelCount = 0,
            levelTotal = 0,
            starCount = 0

        for (const level in categoryInsect.levels) {
            let lvl = categoryInsect.levels[level]

            //copy template
            let levelTemplate = document.querySelector("template.levels_level_template")
            let levelClone = levelTemplate.content.cloneNode(true)

            //set difficulty & navigation
            let wrapper = levelClone.querySelector(".levels_content_level_container")
            wrapper.classList.add(`diff_${lvl.difficulty}`)
            if (!lvl.playable) wrapper.classList.add(`unplayable_level`)
            if (lvl.unlocked && lvl.playable) {
                wrapper.addEventListener("click", () => {
                    navigate(`game`, `${insect}-${lvl.level}`)
                })
            } else if (lvl.playable) {
                wrapper.classList.add(`locked_level`)
            } else {
                wrapper.addEventListener("click", () => {
                    statLocked.textContent = "16 stjerne for at låse op"
                    statLocked.classList.remove("stat_locked_blink")
                    window.requestAnimationFrame(() => {
                        window.requestAnimationFrame(() => {
                            statLocked.classList.add("stat_locked_blink")
                        })
                    })
                })
            }

            let number = levelClone.querySelector(".levels_content_level_number")
            if (lvl.unlocked) number.textContent = lvl.level
            if (lvl.difficulty == "extreme") number.textContent = "…"

            let stars = levelClone.querySelectorAll(".levels_content_levels_star")
            for (let i = 0; i < lvl.completed; i++) {
                stars[i].classList.add("yellow_star")
            }

            levelTotal++
            levelCount += lvl.completed > 0 ? 1 : 0
            starCount += lvl.completed

            let contentMiddle = catClone.querySelector(".levels_content_middle")
            contentMiddle.append(levelClone)
        }

        let statLevels = catClone.querySelector(".stat_levels")
        let statStars = catClone.querySelector(".stat_stars")
        let statLocked = catClone.querySelector(".stat_locked")
        statLevels.textContent = `${levelCount} / ${levelTotal} ${categoryInsect.categoryName.toLowerCase()}`
        statStars.textContent = `${starCount} / ${levelTotal * 3} stjerner`


        catContainer.append(catClone)

    }


    let catIndex = 0
    for (let i = 0; i < colorArr.length; i++) {
        if (colorArr[i] == curCatName) catIndex = i
    }

    //console.log("before splide")

    var splide = new Splide('.splide', {
        type: "slide",
        width: "100vw",
        start: catIndex,
        pagination: true,
        loop: true,
        rewind: true,
        drag: true,
        arrowPath: "M25.8,13.09c.54,.54,.93,1.47,.93,2.23,0,1.2-.82,1.96-1.96,1.96H0v5.44H24.76c1.14,0,1.96,.82,1.96,1.96,0,.82-.38,1.69-.93,2.23l-6.31,6.31,3.65,3.65,16.87-16.87L23.13,3.13l-3.65,3.65,6.31,6.31Z",

    })

    // splide.on('active', (event) => {
    //     let bg = document.querySelector("#container")
    //     bg.style.backgroundImage = `var(--${colorArr[event.index]})`
    // })

    splide.on('move', (event) => {
        console.log(event)
        console.log(document.documentElement.clientWidth)
        let bg = document.querySelector("#levels_background")
        bg.style.transform = `translateX(-${document.documentElement.clientWidth * event}px)`
    })

    splide.mount()

}





// let contentTop = document.querySelector(".levels_content_illustration")
// fetch('img/insects/biller.svg').then(r => r.text()).then(svg => {
//     contentTop.innerHTML = svg
// }).catch(console.error.bind(console))

const initMouseMove = () => {
    window.addEventListener("mousemove", (event) => {
        document.querySelectorAll(".cls-eye").forEach((eye) => {
            let eyeBound = eye.getBoundingClientRect()
            let x = eyeBound.left + ((eyeBound.right - eyeBound.left) / 2)
            let y = eyeBound.top + ((eyeBound.bottom - eyeBound.top) / 2)
            let rad = Math.atan2(event.pageX - x, event.pageY - y)
            let rot = (rad * (180 / Math.PI) * -1) + 90
            eye.style.transform = `rotate(${rot}deg)`
        })
    })
}

initMouseMove()