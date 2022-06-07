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