function init (){

  //Variables
  const grid = document.querySelector('.grid') // get the grid element
  const width = 9 // define the width
  const height = 10
  const cellCount = width * height // define the number of cells on the grid
  const cells = [] // empty array to store our divs that we create 

  const blockClass = 'block' // define the class of the block
  const blockStartPosition = 4 && 13 && 22 && 31 && 40 && 49 && 58 // starting position of the block (refers to an index)
  let blockCurrentPosition = 4 // use let to track where the block currently is (refers to an index)



  function createGrid() {
    for (let i = 0; i < cellCount; i++) { // for loop to run for every cell, in this case we want 100 cells
      const cell = document.createElement('div') // create the div
      cell.innerText = i // inner text of the div to be its index
      grid.appendChild(cell) // make the cell a child of the grid element we grabbed above
      cells.push(cell) // add the newly created div into our empty array
    }
    addBlock([blockStartPosition]) 
  }
  // * Add block(mouse for now) to grid
  function addBlock (position) { // takes argument so function is reusable
    cells[position].classList.add(blockClass) // use position as index to pick the corresponding div from the array of cells and add the class of cat
  }

  // * Remove block(mouse for now) from the grid
  function removeBlock(position) {
    cells[position].classList.remove(blockClass)
  }

  // move blocks down when key is pressed

  function handleKeyUp(event) {
    const key = event.keyCode // store the event.keyCode in a variable to save us repeatedly typing it out
    const down = 40
    console.log('POSITION BEFORE REDEFINING --->', blockCurrentPosition)
    removeBlock(blockCurrentPosition) // remove the cat from its current position
    
    // will need an if statement extra for when the wrong key is pressed. Will have to change the (key ===) to match the appropriate key for the block in the final position
    if (key === down && blockCurrentPosition + width < cellCount - 28) { // if the down arrow is pressed and the cat is not on the bottom row
      blockCurrentPosition += width // redefine cat position index to be previous position plus width
    } else if (key === down && blockCurrentPosition + width > cellCount - 27) {
      blockCurrentPosition -= 2
    } else if (key === down && blockCurrentPosition === 54) {
      cells[54].classList.remove(blockClass)
    } 
    console.log('POSITION AFTER REDEFINING --->', blockCurrentPosition)
    addBlock(blockCurrentPosition) // add cat to the new position that was defined in the if statement above
  }


  document.addEventListener('keyup', handleKeyUp) // listening for key press
  createGrid(blockStartPosition) 


}

window.addEventListener('DOMContentLoaded', init)