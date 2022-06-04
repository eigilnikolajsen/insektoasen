let container = document.querySelector("#container"),
    str = "sommerfugl"

function createDOM() {
    let strSplit = str.toLocaleUpperCase().split("")

    console.log(strSplit)


    let ulTest = document.createElement("ul")
    ulTest.id = "ul_test"
    container.append(ulTest)

    for (let i = 0; i < strSplit.length; i++) {
        let li = document.createElement("li")
        li.classList.add("letter")
        li.textContent = strSplit[i]
        ulTest.append(li)
    }

}

createDOM()


const sortable = new Draggable.Sortable(document.querySelectorAll('ul'), {
    draggable: 'li'
});