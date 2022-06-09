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

window.addEventListener("resize", () => {
    letterSizeRecalc()
})

const buildAnagram = () => {
    let grid = document.querySelector("#game_letter_grid")
        //grid = document.querySelector("#test_container")
    let level = kdk.game.categories.biller.levels[1]

    //split anagram string into array
    let str = level.anagram.split("")
    let gridTempArr = [
        []
    ]

    let hyphenCount = 1, //hyphen count starts from 1
        spaceCount = 1, //space count starts from 1
        rowCount = 0,
        count = 0

    console.log(str)

    //run through string array, create DOM elements
    for (let i = 0; i < str.length; i++) {

        //it's a letter
        if (str[i] != " " && str[i] != "-") {

            let span = document.createElement("span")

            //it's uppercase
            if (str[i] == str[i].toUpperCase()) {
                span.classList.add(`letter`, `locked`) //add classes (locked if capital letter)
            }

            //it's lowercase
            else {
                span.classList.add(`letter`, `dragge`) //add classes
            }

            span.textContent = str[i] //add text
            gridTempArr[rowCount][count % 8] = "." //add empty to grid layout
            grid.append(span)
            count++ //add 1 to running counter

        }

        //it's not a letter
        else {


            let isNewRow = false

            //if hyphen, then add hyphen and fill last of row with spaces
            if (str[i] == "-") {
                let spanHyphen = document.createElement("span")
                spanHyphen.classList.add(`letter`, `locked`, `h${hyphenCount}`) //add classes
                spanHyphen.style.gridArea = `h${hyphenCount}` //add grid area style
                spanHyphen.textContent = "–" //add endash
                gridTempArr[rowCount][count % 8] = `h${hyphenCount}` //add e.g. h1 to grid layout
                console.log(`h${hyphenCount}`)
                grid.append(spanHyphen)

                hyphenCount++ //increment hyphen count
                count++ //increment count
            } else {
                isNewRow = true
            }

            //make a space
            let spanSpace = document.createElement("span")
            spanSpace.classList.add(`s${spaceCount}`) //add class
            spanSpace.style.gridArea = `s${spaceCount}` //add grid area style
            console.log(`s${spaceCount}`)
            grid.append(spanSpace)

            //loop through and fill rest of row with spaces
            let tempCount = count
            for (let j = 0; j < (8 - (tempCount % 8)) % 8; j++) {
                gridTempArr[rowCount][count % 8] = `s${spaceCount}` //add e.g. s1 to grid layout

                count++ //increment count
            }

            spaceCount++ //increment space count
            rowCount++ //increment row count
            gridTempArr[rowCount] = [] //add new empty array @ index rowCount

            //if not hyphen but space, make row of empty to seperate rows
            if (isNewRow) {
                isNewRow = false

                let spanSpaceRow = document.createElement("span")
                spanSpaceRow.classList.add(`s${spaceCount}`) //add class
                spanSpaceRow.style.gridArea = `s${spaceCount}` //add grid area style
                console.log(`s${spaceCount}`)
                grid.append(spanSpaceRow)

                for (let j = 0; j < 8; j++) {
                    gridTempArr[rowCount][j] = `s${spaceCount}` //add e.g. s1 to grid layout
                }

                spaceCount++ //increment 
                rowCount++ //increment row count
                gridTempArr[rowCount] = [] //add new empty array @ index rowCount

            }
        }
    }

    console.log(gridTempArr)

    let gridTempStr = ``

    //loop through gridTempArr and create gridTempStr to add to css
    for (let i = 0; i < gridTempArr.length - 1; i++) {

        gridTempStr += `"`
        for (let j = 0; j < gridTempArr[i].length; j++) {
            gridTempStr += gridTempArr[i][j]
            gridTempStr += " "
        }
        gridTempStr += `" `
    }

    grid.style.gridTemplateAreas = gridTempStr

    console.log(gridTempStr)
}

buildAnagram()
letterSizeRecalc()


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