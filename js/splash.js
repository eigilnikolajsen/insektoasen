// 2. YEAR EXAM
// DMJX, INTERACTIVE DESIGN, JUNE 2022
// CODED BY EIGIL NIKOLAJSEN

let splashBottom = document.querySelector("#splash_bottom_container")
fetch('img/insects/biller.svg').then(r => r.text()).then(svg => {
    splashBottom.innerHTML += svg
}).catch(console.error.bind(console))


// let bgPattern = document.querySelector("#background_pattern")
// let bgPatternSvg
// fetch('img/bg_pattern.svg').then(r => r.text()).then(svg => {
//     bgPattern.innerHTML += svg
//     bgPattern.innerHTML += svg
//     bgPatternSvg = svg
//     animationBG(bgPatternSvg)
// }).catch(console.error.bind(console))

// const animationBG = (svg) => {

//     bgPattern.innerHTML = ""
//     bgPattern.innerHTML += svg
//     bgPattern.innerHTML += svg

//     let bgSize = bgPattern.querySelector("svg").clientHeight
//     console.log(bgSize)

//     anime({
//         targets: "#background_pattern svg",
//         translateY: `${-bgSize}px`,
//         loop: true,
//         duration: 100000,
//         easing: "linear",
//     })
// }