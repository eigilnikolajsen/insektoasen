let container = document.querySelector("#container"),
    iterations = 34,
    whitePoint = 50,
    premadeColors = ["89CCCC", "69B7A1", "729B73", "C7D882", "F7D159", "F29555", "EA6254", "DB4D6C", "AF69A8", "7C5CAA", "4552A3", "547DBA", ]


window.addEventListener("keydown", (e) => {
    if (e.code == "Space") createIteration()
})

function createIteration() {

    container.innerHTML = ""

    for (let i = 0; i < iterations; i++) {
        let div = document.createElement("div")
        div.classList.add("gradient")
        div.style.background = randomLinearGradient()
        if (i == iterations - 1) div.style.background = "#ffffff"

        //if (i == 0) div.style.background = "#000000"

        container.append(div)
    }

    console.log(randomLinearGradient())

}

let randomRange = (range) => {
    return Math.floor(Math.random() * (range[1] - range[0]) + range[0])
}

let randomRGBA = () => {
    let r = Math.floor(Math.random() * whitePoint + 256 - whitePoint),
        g = Math.floor(Math.random() * whitePoint + 256 - whitePoint),
        b = Math.floor(Math.random() * whitePoint + 256 - whitePoint)

    return `rgba(${r},${g},${b},1)`
}

let randomHSL = () => {
    let hRange = [0, 360],
        sRange = [70, 100],
        lRange = [90, 100]

    let h = randomRange(hRange),
        s = randomRange(sRange),
        l = randomRange(lRange)

    return `hsl(${h},${s}%,${l}%)`
}

let randomPremade = () => {
    let r = Math.floor(Math.random() * premadeColors.length)
    return premadeColors[r]
}

let randomDeg = () => {
    let n = Math.floor(Math.random() * 360)
    return `${n}deg`
}

let randomPos = () => {
    let x = Math.floor(Math.random() * 100)
    let y = Math.floor(Math.random() * 100)
    return `${x}% ${y}%`
}

let randomRadialGradient = () => {
    let stop1 = randomHSL(),
        stop2 = randomHSL()
    return `radial-gradient(circle at ${randomPos()}, ${stop1} 0%, ${stop2} 150%)`
}

let randomLinearGradient = () => {
    return `linear-gradient(${randomDeg()}, #${randomPremade()} 0%, #${randomPremade()} 100%)`
}