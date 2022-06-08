// 2. YEAR EXAM
// DMJX, INTERACTIVE DESIGN, JUNE 2022
// CODED BY EIGIL NIKOLAJSEN

let contentTopContainer = document.querySelector("#content_top_container")

const element = document.querySelector("#container");

document.querySelector("#test_button").addEventListener("click", () => {
    console.log("screenfull test")
    if (screenfull.isEnabled) {
        screenfull.request(element, { navigationUI: 'hide' });
    }
})

fetch('img/game_logo.svg').then(r => r.text()).then(text => {
    contentTopContainer.innerHTML += text;
}).catch(console.error.bind(console));

fetch('img/star.svg').then(r => r.text()).then(text => {
    document.querySelectorAll(".levels_content_levels_star").forEach((el) => {
        el.innerHTML = text;
    })
    document.querySelectorAll(".game_nav_star").forEach((el) => {
        el.innerHTML = text;
    })
    document.querySelectorAll(".game_img_star").forEach((el) => {
        el.innerHTML = text;
    })
}).catch(console.error.bind(console));

fetch('img/mask/mask1.svg').then(r => r.text()).then(text => {
    document.querySelector("#game_img_container").innerHTML = text
}).catch(console.error.bind(console));



const letterSizeRecalc = () => {
    document.querySelectorAll("#game_letter_grid span.letter").forEach((el) => {
        el.style.width = `100%`
        setTimeout(() => {
            let w = el.offsetWidth
            el.style.padding = `${w * 0.55 - 3}px 0 ${w * 0.45 - 3}px 0`
            el.style.width = `${w}px`
        }, 50)
    })
}

letterSizeRecalc()

window.addEventListener("resize", () => {
    letterSizeRecalc()
})

const sortable = new Draggable.Sortable(document.querySelectorAll('#game_letter_grid'), {
    draggable: '#game_letter_grid span.dragge',
    handle: '#game_letter_grid span.dragge',
    plugins: [Draggable.Plugins.SortAnimation],
    sortAnimation: {
        duration: 200,
        easingFunction: 'ease-out',
    },
})

sortable.on('drag:start', (el) => {
    //console.log(el.data.source)
})

const buildAnagram = () => {
    let grid = document.querySelector("#game_letter_grid")
    let level = kdk.game.categories.biller.levels[2]

    //split anagram string into array
    let str = level.anagram.split("")
    let gridTemplateAreasArray = [
        []
    ]

    let hyphenCount = 1,
        spaceCount = 1,
        letterCount = 0,
        rowCount = 0,
        count = 0

    console.log(str)

    //run through array, create DOM elements
    for (let i = 0; i < str.length; i++) {

        //it's a letter
        if (str[i] != " " && str[i] != "-") {

            let span = document.createElement("span")

            //it's uppercase
            if (str[i] == str[i].toUpperCase()) {
                span.classList.add(`letter`, `dragge`, `locked`)
                span.textContent = str[i]
                gridTemplateAreasArray[rowCount][count % 8] = "."
                console.log(".")
            }

            //it's lowercase
            else {
                span.classList.add(`letter`, `dragge`)
                span.textContent = str[i]
                gridTemplateAreasArray[rowCount][count % 8] = "."
                console.log(".")
            }

            count++
            letterCount++

        }

        //it's not a letter
        else {

            let isNewRow = false

            if (str[i] == "-") {

                let spanHyphen = document.createElement("span")

                spanHyphen.classList.add(`letter`, `locked`, `h${hyphenCount}`)
                spanHyphen.textContent = "–"
                gridTemplateAreasArray[rowCount][count % 8] = `h${hyphenCount}`
                console.log("hx")

                hyphenCount++
                count++
            } else {
                isNewRow = true
            }


            let tempCount = count
            for (let j = 0; j < 8 - (tempCount % 8); j++) {

                let spanSpace = document.createElement("span")

                spanSpace.classList.add(`s${spaceCount}`)
                gridTemplateAreasArray[rowCount][count % 8] = `s${spaceCount}`
                console.log("sx")

                count++
            }

            spaceCount++
            rowCount++
            gridTemplateAreasArray[rowCount] = []

            if (isNewRow) {
                isNewRow = false
                for (let j = 0; j < 8; j++) {

                    let spanSpace = document.createElement("span")

                    spanSpace.classList.add(`s${spaceCount}`)
                    gridTemplateAreasArray[rowCount][j] = `s${spaceCount}`
                    console.log("sx")
                }

                spaceCount++
                rowCount++
                gridTemplateAreasArray[rowCount] = []

            }
        }
    }

    console.log(gridTemplateAreasArray)

    let gridTemplateAreasString = ``

    for (let i = 0; i < gridTemplateAreasArray.length - 1; i++) {

        gridTemplateAreasString += `"`
        for (let j = 0; j < gridTemplateAreasArray[i].length; j++) {
            gridTemplateAreasString += gridTemplateAreasArray[i][j]
            gridTemplateAreasString += " "
        }
        gridTemplateAreasString += `" `
    }

    console.log(gridTemplateAreasString)
}

buildAnagram()