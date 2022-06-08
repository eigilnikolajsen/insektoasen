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

fetch('img/game_logo.svg')
    .then(r => r.text())
    .then(text => {
        contentTopContainer.innerHTML += text;
    })
    .catch(console.error.bind(console));

fetch('img/star.svg')
    .then(r => r.text())
    .then(text => {
        document.querySelectorAll(".levels_content_levels_star").forEach((el) => {
            el.innerHTML = text;
        })
        document.querySelectorAll(".game_nav_star").forEach((el) => {
            el.innerHTML = text;
        })
        document.querySelectorAll(".game_img_star").forEach((el) => {
            el.innerHTML = text;
        })
    })
    .catch(console.error.bind(console));

fetch('img/mask/mask1.svg')
    .then(r => r.text())
    .then(text => {
        document.querySelector("#game_img_container").innerHTML = text
    })
    .catch(console.error.bind(console));

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

letterSizeRecalc()

window.addEventListener("resize", () => {
    letterSizeRecalc()
})

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