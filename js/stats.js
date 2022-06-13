// 2. YEAR EXAM
// DMJX, INTERACTIVE DESIGN, JUNE 2022
// CODED BY EIGIL NIKOLAJSEN

const buildStats = () => {
    let statsTotal = document.querySelector("#stats_total")
    let statsRest = document.querySelector("#stats_rest")
    statsTotal.innerHTML = ""
    statsRest.innerHTML = ""
    let statsTemplate = document.querySelector("#stats_template")

    let statCloneStart = statsTemplate.content.cloneNode(true)
    let insectsStart = statCloneStart.querySelector(".stats_insects")
    let starsStart = statCloneStart.querySelector(".stats_stars")

    let iForCatTotal = 0,
        iTotalForCatTotal = 0,
        sForCatTotal = 0,
        sTotalForCatTotal = 0
    for (const category in kdk.game.categories) {
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
            iForCat = complete > 0 ? iForCat + 1 : iForCat
            iTotalForCat += 1
            sForCat = sForCat + complete
            sTotalForCat += 3
        }

        insects.innerHTML = `<p class="stats_numbers">${iForCat} / ${iTotalForCat}</p><p class="stats_desc">${kdk.game.categories[category].categoryName.toLowerCase()}</p>`
        stars.innerHTML = `<p class="stats_numbers">${sForCat} / ${sTotalForCat}</p><p class="stats_desc">stjerner</p>`

        iForCatTotal = iForCatTotal + iForCat
        iTotalForCatTotal = iTotalForCatTotal + iTotalForCat
        sForCatTotal = sForCatTotal + sForCat
        sTotalForCatTotal = sTotalForCatTotal + sTotalForCat

        statsRest.append(statsClone)
    }

    insectsStart.innerHTML = `<p class="stats_numbers">${iForCatTotal} / ${iTotalForCatTotal}</p><p class="stats_desc">insekter</p>`
    starsStart.innerHTML = `<p class="stats_numbers">${sForCatTotal} / ${sTotalForCatTotal}</p><p class="stats_desc">stjerner</p>`

    statsTotal.append(statCloneStart)

}