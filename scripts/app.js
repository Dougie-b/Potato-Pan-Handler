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




  //function to spawn new block
  // function startBlock(){
  //   cells[4 && 13 && 22 && 31 && 40 && 49 && 58].classList.add(blockClass)
  // }




  // * function to assign a class to the block 
  // function assignBlock(){


  // }

  // * Add block(mouse for now) to grid -- for moving blocks after spawn
  function addBlock (position) { // takes argument so function is reusable
    cells[position].classList.add(blockClass) // use position as index to pick the corresponding div from the array of cells and add the class of block
  }

  // * Remove block(mouse for now) from the grid -- for moving blocks after spawn
  function removeBlock(position) {
    cells[position].classList.remove(blockClass)
  }

  // move blocks down when key is pressed

  // function handleKeyUp(event) {
  //   const key = event.keyCode // store the event.keyCode in a variable to save us repeatedly typing it out
  //   const q = 81
  //   const w = 87
  //   const e = 69
  //   const r = 82
  //   console.log('POSITION BEFORE REDEFINING --->', blockCurrentPosition)
  //   removeBlock(blockCurrentPosition) // remove the block from its current position
    
  //   // will need an if statement extra for when the wrong key is pressed. Will have to change the (key ===) to match the appropriate key for the block in the final position
  //   if (key === q === blockClass[1] && blockCurrentPosition + width < cellCount - 28) { // if the down arrow is pressed and the block is not on the (desired) bottom row
  //     blockCurrentPosition += width // redefine block position index to be previous position plus width to go down one row
  //   } else if (key === q === blockClass[1] && blockCurrentPosition + width > cellCount - 27) { // if q is pressed and the block
  //     blockCurrentPosition -= 2
  //   } else if (key === q && blockCurrentPosition === 54) {
  //     cells[54].classList.remove(blockClass)
  //   } 
  //   console.log('POSITION AFTER REDEFINING --->', blockCurrentPosition)
  //   addBlock(blockCurrentPosition) // add block to the new position that was defined in the if statement above
  //   createBlock()
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
  }



  document.addEventListener('keyup', handleKeyUp) // listening for key press
  createGrid(blockStartPosition) 

}

window.addEventListener('DOMContentLoaded', init)