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
            el.style.fontSize = `${w / 1.5}px`
        }, 50)
    })
}

window.addEventListener("resize", () => {
    letterSizeRecalc()
})

const buildAnagram = () => {

    let grid = document.querySelector("#game_letter_grid")
    let level = kdk.game.categories.biller.levels[2]

    //split anagram string into array
    let str = shuffleWord(level.anagram).split("")
    let gridTempArr = [
        []
    ]

    let hyphenCount = 1, //hyphen count starts from 1
        spaceCount = 1, //space count starts from 1
        rowCount = 0,
        count = 0,
        col = calcColCount(level.anagram)

    grid.style.gridTemplateColumns = `repeat(${col}, 1fr)`



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
            gridTempArr[rowCount][count % col] = "." //add empty to grid layout
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
                gridTempArr[rowCount][count % col] = `h${hyphenCount}` //add e.g. h1 to grid layout
                console.log(`h${hyphenCount}`)
                grid.append(spanHyphen)

                hyphenCount++ //increment hyphen count
                count++ //increment count
            } else {
                isNewRow = true
            }



            //loop through and fill rest of row with spaces
            let tempCount = count
            for (let j = 0; j < (col - (tempCount % col)) % col; j++) {

                if (j == 0) {
                    //make a space
                    let spanSpace = document.createElement("span")
                    spanSpace.classList.add(`s${spaceCount}`) //add class
                    spanSpace.style.gridArea = `s${spaceCount}` //add grid area style
                    console.log(`s${spaceCount}`)
                    grid.append(spanSpace)
                }

                gridTempArr[rowCount][count % col] = `s${spaceCount}` //add e.g. s1 to grid layout

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

                for (let j = 0; j < col; j++) {
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

const calcColCount = (str) => {
    let splitd = str.split(" ").join("-").split("-")
    var longest = splitd.reduce(
        function(a, b) {
            return a.length > b.length ? a : b;
        }
    )
    if (longest.length < 6) { longest = "xxxxxx" }
    return longest.length + 1
}

const shuffle = (array) => {

    let currentIndex = array.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }

    return array;
}

const shuffleWord = (str) => {

    //create array from string
    let strArr = str.split("")

    //shuffle array (without capital letters, dashes and spaces)
    let shuffled = shuffle(str.split("").filter(letter => letter != letter.toUpperCase()))

    //put values from shuffled array back into strArr
    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i] != strArr[i].toUpperCase()) {
            strArr[i] = shuffled.splice(0, 1).join("")
        }
    }

    //return string
    return strArr.join("")
}



buildAnagram()
letterSizeRecalc()