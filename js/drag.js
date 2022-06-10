let container = document.querySelector("#container"),
    str = "sommerfugl"

function createDOM() {
    let strSplit = str.toLocaleUpperCase().split("")

    console.log(strSplit)

    for (let i = 0; i < strSplit.length; i++) {
        let span = document.createElement("span")
        span.classList.add("letter")
        span.textContent = strSplit[i]
        container.append(span)
    }

}

createDOM()

let mouseX, mouseY, mouseStartX, mouseStartY, dragElement, dragAnimation

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
});

window.addEventListener("mousedown", (e) => {
    console.log(e.path[0].classList[0])
    if (e.path[0].classList[0] != "letter") { return } else {
        dragElement = e.path[0]
        mouseStartX = mouseX
        mouseStartY = mouseY

        window.requestAnimationFrame(dragging) //start loop
    }
})

window.addEventListener("mouseup", (e) => {
    window.cancelAnimationFrame(dragAnimation) //stop loop

    console.log(e.path)
})

function dragging() {
    dragAnimation = window.requestAnimationFrame(dragging) //loop

    let elementX = -(mouseStartX - mouseX),
        elementY = -(mouseStartY - mouseY)

    console.log(mouseStartX)

    dragElement.style.transform = `translate(${elementX}px, ${elementY}px)`
}