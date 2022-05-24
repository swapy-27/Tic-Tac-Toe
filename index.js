const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
]



var options = document.getElementsByClassName('row');

for (var i = 0; i < options.length; i++) {
    const curr_eve = options[i];
    curr_eve.addEventListener('click', () => {
        const span = curr_eve.children[0].children[0];
        const col = curr_eve.getAttribute("data-col")
        const row = curr_eve.getAttribute("data-row")

        //Player Move
        if (board[row][col] == "") {
            span.innerHTML = "x"
        }
    })
}