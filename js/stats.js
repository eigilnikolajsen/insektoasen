// 2. YEAR EXAM
// DMJX, INTERACTIVE DESIGN, JUNE 2022
// CODED BY EIGIL NIKOLAJSEN

let easyTotal = 0,
    medTotal = 0,
    hardTotal = 0,
    extremeTotal = 0

const buildStats = () => {

    getkdk()

    let statsRest = document.querySelector("#stats_rest")
    statsRest.innerHTML = ""
    let statsTemplate = document.querySelector("#stats_template")

    //let totalContents = document.querySelector(".stats_total_contents")
    let insectsTotal = document.querySelector(".stats_total_insects")
    let starsTotal = document.querySelector(".stats_total_stars")
    let easyTotalH3 = document.querySelector(".stats_total_easy")
    let medTotalH3 = document.querySelector(".stats_total_med")
    let hardTotalH3 = document.querySelector(".stats_total_hard")
    let extremeTotalH3 = document.querySelector(".stats_total_extreme")

    let iForCatTotal = 0,
        iTotalForCatTotal = 0,
        sForCatTotal = 0,
        sTotalForCatTotal = 0,
        easy = 0,
        med = 0,
        hard = 0,
        extreme = 0

    easyTotal = 0
    medTotal = 0
    hardTotal = 0
    extremeTotal = 0
    for (const category in kdk.game.categories) {
        if (category == "onboarding") continue
        let statsClone = statsTemplate.content.cloneNode(true)
        let illustration = statsClone.querySelector(".stats_illustration")
        let insects = statsClone.querySelector(".stats_insects")
        let stars = statsClone.querySelector(".stats_stars")

        fetch(`img/insects/${category}.svg`).then(r => r.text()).then(svg => {
            illustration.innerHTML = svg
        }).catch(console.error.bind(console))

        let iForCat = 0,
            iTotalForCat = 0,
            sForCat = 0,
            sTotalForCat = 0
        for (const level in kdk.game.categories[category].levels) {
            let complete = kdk.game.categories[category].levels[level].completed
            let difficult = kdk.game.categories[category].levels[level].difficulty
            iForCat = complete > 0 ? iForCat + 1 : iForCat
            iTotalForCat += 1
            sForCat = sForCat + complete
            sTotalForCat += 3

            easy = difficult == "easy" && complete > 0 ? easy + 1 : easy
            easyTotal = difficult == "easy" ? easyTotal + 1 : easyTotal
            med = difficult == "med" && complete > 0 ? med + 1 : med
            medTotal = difficult == "med" ? medTotal + 1 : medTotal
            hard = difficult == "hard" && complete > 0 ? hard + 1 : hard
            hardTotal = difficult == "hard" ? hardTotal + 1 : hardTotal
            extreme = difficult == "extreme" && complete > 0 ? extreme + 1 : extreme
            extremeTotal = difficult == "extreme" ? extremeTotal + 1 : extremeTotal
        }

        insects.innerHTML = `<p class="stats_numbers">${iForCat} / ${iTotalForCat}</p><p class="stats_desc">${kdk.game.categories[category].categoryName.toLowerCase()}</p>`
        stars.innerHTML = `<p class="stats_numbers">${sForCat} / ${sTotalForCat}</p><p class="stats_desc">stjerner</p>`

        iForCatTotal = iForCatTotal + iForCat
        iTotalForCatTotal = iTotalForCatTotal + iTotalForCat
        sForCatTotal = sForCatTotal + sForCat
        sTotalForCatTotal = sTotalForCatTotal + sTotalForCat

        statsRest.append(statsClone)
    }

    insectsTotal.innerHTML = `<p class="stats_numbers">${iForCatTotal} / ${iTotalForCatTotal}</p><p class="stats_desc">insekter</p>`
    starsTotal.innerHTML = `<p class="stats_numbers">${sForCatTotal} / ${sTotalForCatTotal}</p><p class="stats_desc">stjerner</p>`
    easyTotalH3.innerHTML = `<p class="stats_numbers">${easy} / ${easyTotal}</p><p class="stats_desc">nemme baner</p>`
    medTotalH3.innerHTML = `<p class="stats_numbers">${med} / ${medTotal}</p><p class="stats_desc">medium baner</p>`
    hardTotalH3.innerHTML = `<p class="stats_numbers">${hard} / ${hardTotal}</p><p class="stats_desc">svære baner</p>`
    extremeTotalH3.innerHTML = `<p class="stats_numbers">${extreme} / ${extremeTotal}</p><p class="stats_desc">umulige baner</p>`
}

const getDiffCount = (diff) => {

    getkdk()

    let count = 0
    for (const category in kdk.game.categories) {
        for (const level in kdk.game.categories[category].levels) {
            let lvl = kdk.game.categories[category].levels[level]
            if (lvl.difficulty == diff && lvl.completed > 0) count++
        }
    }
    return count
}

const unlockLevels = (diff) => {

    getkdk()

    for (const category in kdk.game.categories) {
        for (const level in kdk.game.categories[category].levels) {
            let lvl = kdk.game.categories[category].levels[level]
            if (lvl.difficulty == diff) lvl.playable = true
        }
    }

    setkdk()

}

const resetStats = () => {
    let w = document.querySelector("#stats_content_wrapper")
    let cc = document.createElement("div")
    let c = document.createElement("div")
    let q = document.createElement("h2")
    let p = document.createElement("p")
    let bc = document.createElement("div")
    let b1 = document.createElement("button")
    let b2 = document.createElement("button")

    cc.id = "stats_reset_container"
    c.id = "stats_reset_wrapper"
    q.id = "stats_reset_title"
    q.textContent = "Er du nu helt sikker?"
    p.id = "stats_reset_desc"
    p.textContent = "Alle tallene bliver nulstillet - du er slået tilbage til start"
    bc.id = "stats_reset_button_wrapper"
    b1.id = "stats_reset_deny"
    b1.textContent = "Nej, tilbage"
    b1.addEventListener("click", () => {
        setTimeout(() => {
            cc.remove()
        }, 100)
    })
    b2.id = "stats_reset_confirm"
    b2.textContent = "Bekræft"
    b2.addEventListener("click", () => {
        setTimeout(() => {
            kdkInit()
            navigate('stats')
            cc.remove()
        }, 100)
    })

    c.append(q)
    c.append(p)
    bc.append(b1)
    bc.append(b2)
    c.append(bc)
    cc.append(c)
    w.append(cc)
}