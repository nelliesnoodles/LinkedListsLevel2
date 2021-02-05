// check a users inputs for the select on each node.
// Results on this experiment are set and predetermined. 

let prevset = []
let nextset = []
let prevAnswers = ['None', 'Z', 'X', 'B']
let nextAnswers = ['X', 'B', 'C', 'None']


function setDOM() {
    let prev1 = document.getElementById('select1')
    let prev2 = document.getElementById('select2')
    let prev3 = document.getElementById('select3')
    let prev4 = document.getElementById('select4')
    prevset = [prev1, prev2, prev3, prev4]
    let next1 = document.getElementById('select1a')
    let next2 = document.getElementById('select2a')
    let next3 = document.getElementById('select3a')
    let next4 = document.getElementById('select4a')
    nextset = [next1, next2, next3, next4]
}

function win() {
    let iswinner = check_answer()
    if (iswinner) {
        document.getElementById('winner').style.display = 'flex'
    }
    else {
        document.getElementById('try_again').style.display = 'flex'
    }
}
function check_answer() {
    let length = 4
    let win = true
    for (let i = 0; i < length; i++) {
        prev_selection = prevset[i].value
        prev_answer = prevAnswers[i]
        let message=`prev[ ${prev_selection} : ${prev_answer} ]`
        console.log(message)
        if (prev_selection != prev_answer) {
            win = false
            break
        }
    }

    if (win) {
        for (let j = 0; j < length; j++) {
            next_selection = nextset[j].value
            next_answer = nextAnswers[j]
            let message = `next[ ${next_selection} : ${next_answer} ]`
            console.log(message)
            if (next_selection != next_answer) {
                win = false
                break
            }
        }
    }
    return win
}

function reload() {
    location.reload();
}

window.onload = function () {
    setDOM()
}