// 2. YEAR EXAM
// DMJX, INTERACTIVE DESIGN, JUNE 2022
// CODED BY EIGIL NIKOLAJSEN

let anagram, curLevel, curCat, curCatName, levelObj, grid, levelInfo, sortable

const buildAnagram = (level) => {
    console.log("buildAnagram")

    getkdk()

    levelInfo = level
    curCat = kdk.game.categories[level.split("-")[0]]
    curCatName = level.split("-")[0]
    curLevel = +level.split("-")[1]
        //console.log(curCat)
        //console.log(curCat + " " + curLevel)
    levelObj = curCat.levels[curLevel]


    let gameTemplate = document.querySelector("#game_template")
    let gameContentContainer = document.querySelector("#game_content_container")
    let gameClone = gameTemplate.content.cloneNode(true)
    let gameTitle = gameClone.querySelector("#game_title")
    gameContentContainer.innerHTML = ""
    document.querySelector("#game_win_container").innerHTML = ""
    grid = gameClone.querySelector("#game_letter_grid")
    let uiMute = gameClone.querySelectorAll(".ui_mute")
    uiMute.forEach((el) => { el.addEventListener("click", () => { clickMute(uiMute) }) })
    let UIstars = gameClone.querySelectorAll(".game_nav_star")
    gameTitle.textContent = `${curCat.categoryName} #${curLevel}`

    if (levelObj.completed > 0) {
        levelObj.hintsgiven = 3 - levelObj.completed
        gameClone.querySelector("#ui_hint").classList.add("all_hints_used")
        buildWinContent()
    } else {
        gameClone.querySelector("#ui_hint").addEventListener("click", () => { clickHint(UIstars) })
    }
    hintUIStars(UIstars)

    gameContentContainer.append(gameClone)

    //split anagram string into array
    anagram = levelObj[`hint${levelObj.hintsgiven}`]


    let str = shuffleWord(anagram).split("")
    let gridTempArr = [
        []
    ]

    let hyphenCount = 1, //hyphen count starts from 1
        spaceCount = 1, //space count starts from 1
        letterCount = 1, //letter count starts from 1
        rowCount = 0,
        count = 0,
        col = calcColCount(anagram)

    grid.style.gridTemplateColumns = `repeat(${col}, 1fr)`

    //run through string array, create DOM elements
    for (let i = 0; i < str.length; i++) {

        //it's a letter
        if (str[i] != " " && str[i] != "-") {

            let span = document.createElement("span")

            //it's uppercase
            if (str[i] == str[i].toUpperCase()) {
                span.classList.add(`letter`, `locked`) //add classes (locked if capital letter)
                span.style.gridArea = `l${letterCount}` //add grid area style
                span.textContent = str[i] //add text
                gridTempArr[rowCount][count % col] = `l${letterCount}` //add e.g. l1 to grid layout
                letterCount++
            }

            //it's lowercase
            else {
                span.classList.add(`letter`, `dragge`) //add classes
                span.textContent = str[i] //add text
                gridTempArr[rowCount][count % col] = "." //add empty to grid layout
            }

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
                    //console.log(`h${hyphenCount}`)
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
                        //console.log(`s${spaceCount}`)
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
                    //console.log(`s${spaceCount}`)
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

    //console.log(gridTempArr)

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

    //console.log(gridTempStr)

    grid.querySelectorAll("span.locked").forEach((locked) => {
        locked.addEventListener("touchstart", () => {
            locked.classList.add("undraggable")
            setTimeout(() => { locked.classList.remove("undraggable") }, 300)
        })
        locked.addEventListener("mousedown", () => {
            locked.classList.add("undraggable")
            setTimeout(() => { locked.classList.remove("undraggable") }, 300)
        })
    })

    letterSizeRecalc()
    buildImg()

    if (sortable) sortable.destroy()

    sortable = new Draggable.Sortable(document.querySelectorAll('#game_letter_grid'), {
        draggable: '#game_letter_grid span.dragge',
        handle: '#game_letter_grid span.dragge',
        plugins: [Draggable.Plugins.SortAnimation],
        sortAnimation: {
            duration: 300,
            easingFunction: 'cubic-bezier(.5,1.4,.8,1)',
        },
        forceFallback: true,
    })

    //sortable init
    sortable.on('drag:start', () => {
        grid.style.cursor = "grabbing"
    })
    sortable.on('drag:move', () => {
        grid.style.cursor = "grabbing"
    })
    sortable.on('drag:stop', () => {
        grid.style.cursor = "auto"
        setTimeout(() => {
            if (wordsMatch(anagram)) {
                youWon()
            }
        }, 100)
    })
}

const buildImg = () => {
    console.log("buildImg")
    let imgContainer = document.querySelector("#game_img_container")
    let masks = ["Ẁ", "ẁ", "ẃ", "Ẅ", "ẅ"]
    let randomMask = masks[Math.floor(Math.random() * masks.length)]
    if (curCat.categoryName) {
        imgContainer.innerHTML = `<div style="background-image:url(${getURL()}img/insects/${curCatName}/${curLevel}_1.jpg);">${randomMask}</div>`
    }
}

//when hint is clicked
const clickHint = () => {
    console.log("clickHint")

    if (levelObj.hintsgiven < 2) {
        levelObj.hintsgiven++
            setkdk()
    }

    buildAnagram(levelInfo)
    letterSizeRecalc()
}

const hintUIStars = (stars) => {
    console.log(stars)
    if (levelObj.hintsgiven == 1) stars[2].classList.remove("yellow_star")
    if (levelObj.hintsgiven == 2) {
        stars[1].classList.remove("yellow_star")
        stars[2].classList.remove("yellow_star")
        setTimeout(() => {
            document.querySelector("#ui_hint").classList.add("all_hints_used")
        }, 200)
    }
}

//when mute is clicked
const clickMute = (uiMute) => {
    console.log("clickMute")
    if (uiMute[0].textContent == "‹") {
        uiMute.forEach((el) => { el.textContent = "›" })
    } else {
        uiMute.forEach((el) => { el.textContent = "‹" })
    }
}

//calculate column count
const calcColCount = (str) => {
    //ALMINDE-LIG bred-tæge => ['ALMINDE_', 'LIG', 'bred_', 'tæge_']
    let splitd = str.split("-").map(n => n += "_").join("-").split(" ").join("-").split("-")

    //console.log(splitd)
    var longest = splitd.reduce(
        function(a, b) {
            return a.length > b.length ? a : b;
        }
    )
    if (longest.length < 6) { longest = "xxxxxx" }
    return longest.length
}

//shuffle array
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

//shuffle insect anagram
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

//check if your word matches the solution
const wordsMatch = (str) => {
    console.log("wordsMatch")
    let won = false

    let currentWord = ""
    document.querySelectorAll("#game_letter_grid span.letter").forEach((el) => {
        if (el.textContent != "–" && el.textContent != el.textContent.toUpperCase())
            currentWord += el.textContent
    })

    let goalWord = str.split(" ").join("-").split("-").join("").split("")
    goalWord = goalWord.filter(l => l == l.toLowerCase()).join("")

    if (currentWord == goalWord) won = true

    return won
}

//exec function when you win
const youWon = () => {
    console.log("youWon")

    let delayAni = 0
    let letters = document.querySelectorAll("#game_letter_grid span.letter")
    let randomArr = []
    letters.forEach((el, i) => {
        randomArr[i] = i
    })
    randomArr = shuffle(randomArr)
    letters.forEach((el, i) => {
        el.classList.add("letter_complete")
        letters[randomArr[i]].style.animationDelay = `${delayAni / 30}s`
        delayAni++
    })
    starsComplete()
    sortable.destroy()
    if (levelObj.completed == 0) {
        levelObj.completed = 3 - levelObj.hintsgiven
        setkdk()
    }
    unlockNextLevel(curLevel)
    buildWinContent()
    document.querySelector("#ui_hint").removeEventListener("click", clickHint)
    document.querySelector("#ui_hint").classList.add("all_hints_used")

}

const starsComplete = () => {
    let domStars = document.querySelectorAll("#game_star_container .game_img_star")
    for (let i = 0; i < domStars.length - levelObj.hintsgiven; i++) {
        domStars[i].classList.add("yellow_star")
    }
    domStars.forEach((el) => {
        setTimeout(() => {
            el.classList.add("star_complete")
        }, 700)
    })
}

const buildWinContent = () => {
    let winContainer = document.querySelector("#game_win_container")
    let winTemplate = document.querySelector("#game_win_template")
    let winClone = winTemplate.content.cloneNode(true)
    let winContent = levelObj.wincontent
    winContainer.innerHTML = ""

    winClone.querySelector("#win_title").textContent = levelObj.insect
    winClone.querySelector(".win_desc").textContent = winContent.beskrivelse
    winClone.querySelector(".win_img2").src = `${getURL()}img/insects/${curCatName}/${curLevel}_1.jpg`
    winClone.querySelector(".win_img2").alt = winContent.img2
    winClone.querySelector(".win_fagc2").textContent = winContent.img2
    winClone.querySelector(".win_forv").textContent = "Forvekslingsmuligheder"
    winClone.querySelector(".win_forv_t").textContent = winContent.forvekslingsmuligheder
    winClone.querySelector(".win_biol").textContent = "Biologi"
    winClone.querySelector(".win_biol_t").textContent = winContent.biologi
    winClone.querySelector(".win_img3").src = `${getURL()}img/insects/${curCatName}/${curLevel}_1.jpg`
    winClone.querySelector(".win_img3").alt = winContent.img3
    winClone.querySelector(".win_fagc3").textContent = winContent.img3
    winClone.querySelector(".win_leve").textContent = "Levested"
    winClone.querySelector(".win_leve_t").textContent = winContent.levested
    winClone.querySelector(".win_udbr").textContent = "Udbredelse"
    winClone.querySelector(".win_udbr_t").textContent = winContent.udbredelse

    let nextButton = winClone.querySelector("#win_button_next")
    let nextLevelNumber = curLevel + 1
    console.log(nextLevelNumber)

    if (curCat.levels[nextLevelNumber]) {
        if (curCat.levels[nextLevelNumber].unlocked && curCat.levels[nextLevelNumber].playable) {
            nextButton.addEventListener("click", () => {
                navigate(`game`, `${curCatName}-${nextLevelNumber}`)
            })
        } else {
            nextButton.classList.add("unplayable_level")
        }
    } else {
        nextButton.classList.add("unplayable_level")
    }

    winContainer.append(winClone)
}

const unlockNextLevel = (cur) => {
    let next = cur + 1
    if (curCat.levels[next]) {
        curCat.levels[next].unlocked = true
        setkdk()
    }

}

//recalc width values when resizing
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
        //animationBG(bgPatternSvg)
}
window.addEventListener("resize", () => {
    letterSizeRecalc()
})


const getURL = () => {
    var arr = window.location.href.split("/");
    delete arr[arr.length - 1];
    return arr.join("/");
}
console.log(getURL())

//load svg
let contentTopContainer = document.querySelector("#splash_top_container")
fetch('img/game_logo.svg').then(r => r.text()).then(text => {
    contentTopContainer.innerHTML += text;
}).catch(console.error.bind(console));