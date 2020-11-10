// Linked List Game
/* Author: Nellie Tobey
 * Purpose: To help people learn how linked lists work 
 * Game play: Put the scrambled nodes back in order through 
 * drag and drop UI. 
 * When done, push the active 'DUMP' button to see if the order is correct.
 * Selection options:
 *  <option value="BEGIN">BEGIN NODE</option>
    <option value="NODE2">NODE 2</option>
    <option value="NODE3">NODE 3</option>
    <option value="NODE4">NODE 4</option>
    <option value="NODE5">NODE 5</option>
    <option value="END">END NODE</option>
 */


//DOM ELEMENTS

let DOMELEM = {
    'goalsBtn': null,
    'btnDiv': null,
    'closeBtn': null,
    'gameplay': null,
    'playbutton': null,
    'gamebody': null,
    'timer': null,
    'screen': null,
    'CHOMP': null,
    'score': null,
    'activeGame': false,
    'WINLIST': [],
    'isEMPTY': false,
}

//GAME TIMER
let GAMEINTERVAL
let SECONDS = 0
let MINUTES = 0

function setDOM() {
    let rules = document.getElementById('showInstructions')
    let close = document.getElementById('closeInstructions')
    let gameplay = document.getElementById('instructions')
    let playbutton = document.getElementById('play')
    let screen = document.getElementById('gamescreen')
    let gamebody = document.getElementById('gamebody')
    let time = document.getElementById('time')
    let chompbutton = document.getElementById('CHOMP')
    let h3Score = document.getElementById('score')
    let reload = document.getElementById('reload')
    let btn_div = document.getElementById('gamebuttons')
    DOMELEM['gaolsBtn'] = rules
    DOMELEM['closeBtn'] = close
    DOMELEM['gameplay'] = gameplay
    DOMELEM['playbutton'] = playbutton
    DOMELEM['gamebody'] = gamebody
    DOMELEM['screen'] = screen
    DOMELEM['timer'] = time
    DOMELEM['CHOMP'] = chompbutton
    DOMELEM['score'] = h3Score
    DOMELEM['btnDiv'] = btn_div
    dragone = document.getElementById('node1')

    // accessing these through DOMELEM results in null type
    playbutton.addEventListener('click', startGame)
    rules.addEventListener('click', showInstructions)
    reload.addEventListener('click', reset)
    close.addEventListener('click', hideInstructions)
    chompbutton.addEventListener('click', DUMP)
    
    
}

function reset() {

    location.reload();
    return false;
}

// fisher-yates shuffle from: https://stackoverflow.com/questions/49555273/how-to-shuffle-an-array-of-objects-in-javascript 

function shuffle(arr) {

    for (var i = arr.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    return arr

}

function getChild(pos) {
    child = null
    
    switch (pos) {
        case 'position-select6':
            child = document.getElementById('node6')
            return child;
        case 'position-select1':
            child = document.getElementById('node1')
            return child;
        case 'position-select2':
            child = document.getElementById('node2')
            return child;
        case 'position-select3':
            child = document.getElementById('node3')
            return child;
        case 'position-select4':
            child = document.getElementById('node4')
            return child;
        case 'position-select5':
            child = document.getElementById('node5')
            return child;
    }
    return child
}

function selection_made(elem) {
    
    let TargetParent = document.getElementById('target')
    
    let selection = elem.value
    let position = elem.id
    let labelID = 'label' + position
    let oldlabel = document.getElementById(labelID)
    oldlabel.style.display = 'none'
    //console.log('selection made:', selection)
    let oldnode = document.getElementById(selection)
    let newchild = getChild(position)
    
    //console.log('child =', newchild)
    oldnode.appendChild(newchild)
    let firstchild = oldnode.children[0]
    newchild.removeChild(elem)
    remove_option(selection)
    oldnode.removeChild(firstchild)
    
    // remove elem from parent.
    // place elem in location in dropzone, and remove placeholder


}

function shuffleNodes() {
    element = document.getElementsByClassName("NODE");
    range = element.length - 1

    let assignedcolumns = []
    let nodelist = []


    // In higher levels, the length will get bigger
    for (var i = range + 1; i > 0; i--) {
        assignedcolumns.push(i)
    }
    newcolumns = shuffle(assignedcolumns)
    for (i = 0; i < element.length; i++) {
        newrow = newcolumns[i]
        child = element[i];
        stored = child.id

        nodelist.push(stored)


        child.style.gridRow = newrow

    }
    DOMELEM['WINLIST'] = nodelist
}
function createPlayerLIST() {
    // get retrieved list 
    // return false on error in comparing to DOMELEM WINLIST
    let elements = document.getElementsByClassName("NODE");


    let original = DOMELEM['WINLIST']
    let size = original.length

    // when checking order, make sure the parent element is is='target'
    let WIN = true

    for (i = 0; i < size; i++) {
        var playernodeID = elements[i]
        var playername = playernodeID.id
        var originalID = original[i]
        if (playername !== originalID) {
            WIN = false
            break
        }

    }
    let message = document.getElementById('gameover')
    result = document.getElementById('results')
    showELEM(result)

    if (WIN) {


        message.innerHTML = "GAME OVER: YOU WIN!"
    }
    else {

        message.innerHTML = "GAME OVER: TRY AGAIN!"
    }

}
function checkEMPTY() {
    let divChild = document.getElementById("NodeParent").children[0];

    if (divChild == undefined) {
        DOMELEM['isEMPTY'] = true
        let button = document.getElementById('CHOMP')
        let screen = DOMELEM['gamebody']

        //element.classList.add("my-class");
        button.classList.add("grow")
        button.classList.add("shineit")
        button.disabled = false
        screen.style.height = "auto"

        //console.log("CHOMP updated")

    }


}

function remove_option(val) {
    var selectobjects = document.getElementsByTagName("select");
    for (var j = 0; j < selectobjects.length; j++) {
        var currentselect = selectobjects[j]
        for (var i = 0; i < currentselect.length; i++) {
            if (currentselect.options[i].value == val)
                currentselect.remove(i);
        }
    };
}

function DUMP() {
    //console.log('DUMPING LISTS')
    //let emptygrid = document.getElementById('NodeParent')
    let divChild = document.getElementById("NodeParent").children[0];
    //console.log('divChild = ', divChild)
    if (divChild == undefined) {
        clearInterval(GAMEINTERVAL)
        createPlayerLIST()

    }
    else {
        message = "all Nodes have not been moved to the new list"
        alert(message)


    }
}


function keepTIME() {

    var time_element_seconds = document.getElementById("time_element_seconds");
    var time_element_minutes = document.getElementById("time_element_minutes");
    SECONDS += 1;
    if (SECONDS > 59) {
        MINUTES += 1;
        SECONDS = 0;
    }
    if (SECONDS < 10) {
        NEWSECONDS = '0' + SECONDS
        time_element_seconds.innerHTML = NEWSECONDS;
    }
    else {
        time_element_seconds.innerHTML = SECONDS;
    }

    time_element_minutes.innerHTML = MINUTES;
    

    let finished = DOMELEM['isEMPTY']

    if (finished == false) {
        checkEMPTY()
    }


}

function runTIMER() {
    GAMEINTERVAL = setInterval(keepTIME, 1000)

}

function showELEM(element) {
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden')
        element.classList.add('show')
    }
}

function hideELEM(element) {
    if (element.classList.contains('show')) {
        element.classList.remove('show')
        element.classList.add('hidden')
    }
}
function showInstructions() {
    let gameplay = document.getElementById('instructions')
    let screen = document.getElementById('gamescreen')
    showELEM(gameplay)
    hideELEM(screen)
}

function checkPlay() {
    let playing = DOMELEM['activeGame']
    let screen = document.getElementById('gamescreen')
    if (playing) {
        showELEM(screen)
    }
    else {
        hideELEM(screen)
    }
}

function hideInstructions() {
    let gameplay = document.getElementById('instructions')


    hideELEM(gameplay)
    checkPlay()
}


function startGame() {
    let GAMEBOARD = DOMELEM['screen']
    let btn_div = DOMELEM['btnDiv']
    console.log('setting up gameboard:', GAMEBOARD)
    shuffleNodes()
    console.log('Shuffling nodes')
    hideELEM(btn_div)
    showELEM(GAMEBOARD)
    console.log('revealing gameboard')
    runTIMER()
    console.log('Starting timer')
}

window.addEventListener('load', (event) => {
    setDOM()
    
});