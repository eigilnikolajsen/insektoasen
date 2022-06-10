// 2. YEAR EXAM
// DMJX, INTERACTIVE DESIGN, JUNE 2022
// CODED BY EIGIL NIKOLAJSEN

const buildLevels = () => {

    let catTemplate = document.querySelector("#levels_categori_template")
    let catClone = catTemplate.content.cloneNode(true)
    let catContainer = document.querySelector(".splide__list")
    catContainer.append(catClone)
    catContainer.append(catTemplate.content.cloneNode(true))
    catContainer.append(catTemplate.content.cloneNode(true))
    catContainer.append(catTemplate.content.cloneNode(true))
    catContainer.append(catTemplate.content.cloneNode(true))
    catContainer.append(catTemplate.content.cloneNode(true))
    catContainer.append(catTemplate.content.cloneNode(true))

    let levelTemplate = document.querySelector("template.levels_level_template")
    let levelClone = levelTemplate.content.cloneNode(true)
    let containerTest = document.querySelector(".levels_content_middle")
    containerTest.append(levelClone)









    new Splide('.splide', {
        type: "slide",
        rewind: true,
        width: "100vw",
        start: 0,
        perpage: 1,
        permove: 1,
        gap: "1em",
        pagination: true,
        drag: true,
        autoWidth: true,
    }).mount();


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