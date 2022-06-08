// 2. YEAR EXAM
// DMJX, INTERACTIVE DESIGN, JUNE 2022
// CODED BY EIGIL NIKOLAJSEN

let contentTopContainer = document.querySelector("#content_top_container")

//contentTopContainer.innerHTML += kdk.game.logo

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