function init (){

  //Variables
  const grid = document.querySelector('.grid') // get the grid element
  const width = 9 // define the width
  const height = 10
  const cellCount = width * height // define the number of cells on the grid
  const cells = [] // empty array to store our divs that we create 
  const blocksBrokenClass = 'blocksBroken'
  let blocksBroken = 0
  const timerClass = 'timer'
  let seconds = 0

  const blockClassArray = ['q', 'w', 'e', 'r'] // array of block classes to randomly assign on spawn
  const blockClass = blockClassArray[Math.floor(Math.random() * blockClassArray.length)] //maths to randomise the class selection
  const charClass = 'char' //character class
  const charClass2 = 'char2' 
  const blockStartPosition = 4 // starting position of the block (refers to an index) Would like to start with the column filled
  let blockCurrentPosition = 4 // use let to track where the block currently is (refers to an index)
  const blockColumn = cells[4, 13, 22, 31, 40, 49, 58]


  function createGrid() {
    for (let i = 0; i < cellCount; i++) { // for loop to run for every cell, in this case we want 100 cells
      const cell = document.createElement('div') // create the div
      cell.innerText = i // inner text of the div to be its index
      grid.appendChild(cell) // make the cell a child of the grid element we grabbed above
      cells.push(cell) // add the newly created div into our empty array
    }
    createBlocks(4)
    createBlocks(13)
    createBlocks(22)
    createBlocks(31)
    createBlocks(40)
    createBlocks(49)
    createBlocks(58)
    addCharacter()
    createTimer()
    createBlocksBrokenCount()
    
  }

  // timer function
  function startTimer(){
    seconds += 1
    cells[8].innerHTML = seconds
  }

  function createTimer(){
    setInterval(startTimer, 1000)
    cells[8].classList.add(timerClass)
  }

  // blocks broken correct counter
  function createBlocksBrokenCount() {
    cells[17].classList.add(blocksBrokenClass)
    cells[17].innerText = blocksBroken
  }

  function incrementBlocksBroken(){
    blocksBroken += 1
    cells[17].innerText = blocksBroken
  }

  // function to spawn character
  function addCharacter() {
    cells[59].classList.add(charClass)
  }
  // function to switch character image on keydown
  function addCharacter2() {
    cells[59].classList.remove(charClass)
    cells[59].classList.add(charClass2)
  }

  function removeCharacter() {
    cells[59].classList.remove(charClass)
    cells[59].classList.remove(charClass2)
  }


  // create & randomise blocks
  function createBlocks(position) {
    cells[position].classList.add(blockClassArray[Math.floor(Math.random() * blockClassArray.length)])
  }

  // Add block(mouse for now) to grid -- for moving blocks after spawn
  function addBlock (position) { // takes argument so function is reusable
    cells[position].classList.add(blockClass) // use position as index to pick the corresponding div from the array of cells and add the class of block
  }

  // Remove block(mouse for now) from the grid -- for moving blocks after spawn
  function removeBlock(position) {
    cells[position].classList.remove(blockClass)
  }

  // function to toggle in second character class & add a new block at the start position (tho not yet D:)
  function handleKeyDown() {
    addCharacter2()
  }


  // for (let i = 0; i < cars.length; i++) {
  //   text += cars[i] + "<br>";
  // }

  function handleKeyUp(event) {
    const key = event.keyCode // store the event.keyCode in a variable to save us repeatedly typing it out
    const q = 81
    const w = 87
    const e = 69
    const r = 82

    removeBlock(blockCurrentPosition)
    if (blockCurrentPosition + width < cellCount - 28) {
      blockCurrentPosition += width
      
    } else if (blockCurrentPosition === 58) {
      if (key === q && blockClass === 'q') {
        blockCurrentPosition -= 2
        incrementBlocksBroken()
      } else if (key === w && blockClass === 'w'){
        blockCurrentPosition -= 2
        incrementBlocksBroken()
      } else if (key === e && blockClass === 'e') {
        blockCurrentPosition -= 2
        incrementBlocksBroken()
      } else if (key === r && blockClass === 'r') {
        blockCurrentPosition -= 2
        incrementBlocksBroken()
      } else {
        blockCurrentPosition += width
      }
    } else if (blockCurrentPosition === 56) {
      blockCurrentPosition -= 2
    }
    addBlock(blockCurrentPosition)
    if (blockCurrentPosition === 54) {
      removeBlock(blockCurrentPosition)
    }
    removeCharacter()
    addCharacter()
    createBlocks(4)
  }


  document.addEventListener('keyup', handleKeyUp) // listening for key press
  document.addEventListener('keydown', handleKeyDown)
  
  createGrid() 

}

window.addEventListener('DOMContentLoaded', init)