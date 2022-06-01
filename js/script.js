// HISTORIEDYSTEN 2022
// ALL CONTENT DESIGNED BY INTERACTIVE DESIGN 2020-2023 @ DMJX
// WEBSITE CODED BY EIGIL NIKOLAJSEN


//define variable
let clickableObjects = {},
    bg = document.querySelector("#bg"),
    bgWrapper = document.querySelector("#bg_wrapper"),
    lightboxWrapper = document.querySelector("#lightbox_wrapper"),
    lightboxBg = document.querySelector("#lightbox_bg"),
    lightboxExit = document.querySelector("#lightbox_exit"),
    lightboxContent = document.querySelector("#lightbox_content_wrapper"),
    lightboxTitle = document.querySelector("#lightbox_title"),
    loadingSpinner = document.querySelector("#loading_spinner"),
    bgWidth = bg.clientWidth,
    bgSteps = 2,
    curBgStep = 0,
    moveinterval = window.innerWidth < bgWidth ? (bgWidth - window.innerWidth) / bgSteps : 0,
    bgMoved = 0,
    arrowLeft = document.querySelector("#arrow_left"),
    arrowRight = document.querySelector("#arrow_right"),
    numberWrapper = document.querySelector("#number_wrapper")

//add eventlisteners to arrows
arrowLeft.addEventListener("click", () => movebg(false))
arrowRight.addEventListener("click", () => movebg(true))
document.addEventListener("keydown", (e) => {
    if (e.code == "ArrowLeft" || e.code == "KeyA") movebg(false)
    if (e.code == "ArrowRight" || e.code == "KeyD") movebg(true)
    if (e.code == "Escape") closeLightbox()
})

//update values on window resize
window.addEventListener("resize", () => {
    bgWidth = bg.clientWidth
    moveinterval = window.innerWidth < bgWidth ? (bgWidth - window.innerWidth) / bgSteps : 0
    curBgStep = 0
    movebg(false)
})

//function for moving bg with arrows
function movebg(goingRight) {

    //recalc moveInterval
    bgWidth = bg.clientWidth
    moveinterval = window.innerWidth < bgWidth ? (bgWidth - window.innerWidth) / bgSteps : 0

    //depending on the arrow clicked curBgSteps is updated
    //curBgStep goes int steps from 0 to bgSteps
    if (goingRight) {
        //if curBgStep is equal to or bigger than bgSteps, make it equal to bgSteps, else increment by 1
        curBgStep >= bgSteps ? curBgStep = bgSteps : curBgStep++
    } else {
        //if curBgStep is equal to or less than 0, make it equal to 0, else decrement by 1
        curBgStep <= 0 ? curBgStep = 0 : curBgStep--
    }

    //animate bg on x-axis
    anime({
        targets: bgWrapper,
        translateX: -moveinterval * curBgStep,
        duration: 500,
        easing: "cubicBezier(.4,.25,.1,1)",
    })

    //grey out arrows when not usable
    if (curBgStep == 0) {
        arrowLeft.parentElement.classList.add("greyed_arrow")
    } else {
        arrowLeft.parentElement.classList.remove("greyed_arrow")
    }

    if (curBgStep == bgSteps) {
        arrowRight.parentElement.classList.add("greyed_arrow")
    } else {
        arrowRight.parentElement.classList.remove("greyed_arrow")
    }

}

function buildNumbers() {
    numberWrapper.innerHTML = ""

    //for every number in the clickeableobjects object, create and a tag
    for (const number in clickableObjects) {
        let a = document.createElement("a") //create dom element
        a.classList.add("number") //give class number (for styling)
        if (clickableObjects[number].visited) a.classList.add("visited_number")
        a.textContent = number //html text is the number
        a.style.left = `${clickableObjects[number].position[0]}vh` //position number x
        a.style.top = `${clickableObjects[number].position[1]}vh` //position number y
        a.addEventListener("click", () => {
            a.classList.add("visited_number")
            openLightbox(clickableObjects[number], number) //open lightbox when clicked
            clickableObjects[number].visited = true
        })
        if (clickableObjects[number].index == "NaN") a.style.opacity = 0
        numberWrapper.append(a) //append to #number_wrapper
    }
}

//function for opening lightbox (takes obj and index number)
function openLightbox(obj, number) {

    //has been clicked
    obj.active = true

    //change from display none to flex
    lightboxWrapper.style.display = "flex"

    //animate opacity of wrapper
    anime({
        targets: lightboxWrapper,
        opacity: [0, 1],
        duration: 500,
        easing: "cubicBezier(.5,.6,0,1)",
    })

    //animate bg to clicked number's center in 0 sec
    anime({
        targets: lightboxBg,
        translateX: `${(obj.position[0] * window.innerHeight / 100) - (window.innerWidth / 2) - (moveinterval * curBgStep)}px`,
        translateY: `${(obj.position[1] * window.innerHeight / 100) - (window.innerHeight / 2)}px`,
        duration: 0,
    })

    //animate back to center (so it look like it's scaling up from clicked number)
    setTimeout(() => {
        anime({
            targets: lightboxBg,
            scale: [0, 1],
            translateX: 0,
            translateY: 0,
            duration: 500,
            easing: "cubicBezier(.5,.6,0,1)",
        })
    }, 10)

    //change title
    lightboxTitle.innerHTML = `<span>${number}</span> ${obj.title}`
    if (obj.index == "NaN") lightboxTitle.innerHTML = `${obj.title}`

    //clear content
    lightboxContent.innerHTML = ""

    //if video, place embed into content, and make loading spinner visible (video goes on top of spinner when loaded)
    if (obj.type == "video") {
        lightboxContent.innerHTML = obj.content
        loadingSpinner.style.visibility = "visible"
    }

    //if text, hide loading spinner, create p element and place content
    if (obj.type == "text") {
        loadingSpinner.style.visibility = "hidden"
        let lightboxText = document.createElement("p")
        lightboxText.id = "lightbox_text"
        lightboxText.innerHTML = obj.content
        lightboxContent.append(lightboxText)
    }
    if (obj.position[0] == 264 && obj.index == "1.2" && obj.visited == true) {
        lightboxContent.innerHTML += `<p id="psst_hco">Tillykke, du har fundet påskeæg nummer 2 ud af 3! 
        <br>2. del af koden er: "20"</p>`
    }

}

//add event listener to exit button
lightboxExit.addEventListener("click", closeLightbox)
lightboxWrapper.addEventListener("click", (e) => {
    if (e.path[0].id == "lightbox_wrapper") closeLightbox() //if click on lightbox_wrapper (outside lightbox), but not on text, etc.
})


//function for closing lightbox
function closeLightbox() {

    //run through obj, if active, animate lightbox back to number
    for (const number in clickableObjects) {
        if (clickableObjects[number].active) {
            anime({
                targets: lightboxWrapper,
                opacity: 0,
                duration: 200,
                easing: "cubicBezier(.4,.25,.1,1)",
            })
            anime({
                targets: lightboxBg,
                scale: 0,
                translateX: `${(clickableObjects[number].position[0] * window.innerHeight / 100) - (window.innerWidth / 2) - (moveinterval * curBgStep)}px`,
                translateY: `${(clickableObjects[number].position[1] * window.innerHeight / 100) - (window.innerHeight / 2)}px`,
                duration: 500,
                easing: "cubicBezier(.5,.6,0,1)",
            })
        }
        clickableObjects[number].active = false //and set active to false
    }

    //hide completely after animation done
    setTimeout(() => {
        lightboxWrapper.style.display = "none"
        lightboxContent.innerHTML = ""
    }, 500)
}