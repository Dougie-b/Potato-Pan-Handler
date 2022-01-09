function init (){

  //Variables
  const grid = document.querySelector('.grid') // get the grid element
  const width = 9 // define the width
  const height = 10
  const cellCount = width * height // define the number of cells on the grid
  const cells = [] // empty array to store our divs that we create 

  const blockClassArray = ['q', 'w', 'e', 'r'] // array of block classes to randomly assign on spawn
  const blockClass = blockClassArray[Math.floor(Math.random() * blockClassArray.length)] //maths to randomise the class selection
  const charClass = 'char' //character class
  const charClass2 = 'char2' 
  const blockStartPosition = 4  // starting position of the block (refers to an index) Would like to start with the column filled
  let blockCurrentPosition = 4 // use let to track where the block currently is (refers to an index)



  function createGrid() {
    for (let i = 0; i < cellCount; i++) { // for loop to run for every cell, in this case we want 100 cells
      const cell = document.createElement('div') // create the div
      cell.innerText = i // inner text of the div to be its index
      grid.appendChild(cell) // make the cell a child of the grid element we grabbed above
      cells.push(cell) // add the newly created div into our empty array
    }
    //createBlock()
    addBlock(blockStartPosition)
    addCharacter()
  }

  // function to spawn character
  function addCharacter() {
    cells[59].classList.add(charClass)
  }

  function addCharacter2() {
    cells[59].classList.remove(charClass)
    cells[59].classList.add(charClass2)
  }

  function removeCharacter() {
    cells[59].classList.remove(charClass)
    cells[59].classList.remove(charClass2)
  }


  // * Add block(mouse for now) to grid -- for moving blocks after spawn
  function addBlock (position) { // takes argument so function is reusable
    cells[position].classList.add(blockClass) // use position as index to pick the corresponding div from the array of cells and add the class of block
  }

  // * Remove block(mouse for now) from the grid -- for moving blocks after spawn
  function removeBlock(position) {
    cells[position].classList.remove(blockClass)
  }


  function handleKeyDown() {
    addCharacter2()
  }


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
      } else if (key === w && blockClass === 'w'){
        blockCurrentPosition -= 2
      } else if (key === e && blockClass === 'e') {
        blockCurrentPosition -= 2
      } else if (key === r && blockClass === 'r') {
        blockCurrentPosition -= 2
      } else {
        console.log('wrong key!')
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
  }



  document.addEventListener('keyup', handleKeyUp) // listening for key press
  document.addEventListener('keydown', handleKeyDown)
  
  createGrid(blockStartPosition) 

}

window.addEventListener('DOMContentLoaded', init)