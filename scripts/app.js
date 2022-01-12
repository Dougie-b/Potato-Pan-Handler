function init (){

  //Variables
  const grid = document.querySelector('.grid') // get the grid element
  const width = 9 // define the width
  const height = 10
  const cellCount = width * height // define the number of cells on the grid
  const cells = [] // empty array to store our divs that we create 
  const blocksBrokenClass = 'blocksBroken'
  const blocksFailedClass = 'blocksFailed'
  let blocksBroken = 0
  let blocksFailed = 0
  const timerClass = 'timer'
  let seconds = 0

  const blockClassArray = ['q', 'w', 'e', 'r'] // array of block classes to randomly assign on spawn
  const blockClass = blockClassArray[Math.floor(Math.random() * blockClassArray.length)] //maths to randomise the class selection
  const charClass = 'char' //character class
  const charClass2 = 'char2' 
  // const blockStartPosition = 4 // starting position of the block (refers to an index) Would like to start with the column filled
  let blockCurrentPositions = [58, 49, 40, 31, 22, 13, 4] // use let to track where the block currently is (refers to an index)
  // let blockColumnPosition = 4 || 13 || 22 || 31 || 40 || 49 || 58 an attempt to make the block moving function handle all boxes
  // const blockColumn = [cells[4], cells[13], cells[22], cells[31], cells[40], cells[49]]
  
  // why does blockColumn not work for createBlocks? tried a few different things


  function createGrid() {
    for (let i = 0; i < cellCount; i++) { // for loop to run for every cell, in this case we want 100 cells
      const cell = document.createElement('div') // create the div
      cell.innerText = i // inner text of the div to be its index
      grid.appendChild(cell) // make the cell a child of the grid element we grabbed above
      cells.push(cell) // add the newly created div into our empty array
    }
    for (let i = 0; i < blockCurrentPositions.length; i++) {
      createBlock(blockCurrentPositions[i])
    }
    addCharacter()
    createTimer()
    createBlocksBrokenCount()
    createBlocksFailedCount()
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

  function createBlocksFailedCount() {
    cells[26].classList.add(blocksFailedClass)
    cells[26].innerText = blocksFailed
  }

  function incrementBlocksFailed(){
    blocksFailed += 1
    cells[26].innerText = blocksFailed
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
  function createBlock(position) {
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

  function addRemoveBlock (position) {
    cells[position] = cells[position] + width
  }


  function handleKeyDown(event) {
    const key = event.keyCode // store the event.keyCode in a variable to save us repeatedly typing it out
    const q = 81
    const w = 87
    const e = 69
    const r = 82

    // define an array of the classes in the blockCurrentPositions 
    const columnArray = blockCurrentPositions.map(position => {
      return cells[position].classList.value
    })
    // const columnArray = [blockCurrentPositions.classList.value]
    console.log('og columnArray -->', columnArray)

    // shift items down the array and put back to move down a row && make new block at top & push it to array (ARRAY LENGTHS MUST MATCH (columnArray/blockStartingPositions))
    // use foreach to update each element in the columnArray (pushing them down the array so they go down the rows on grid)
    // will need to push in a new createBlock randomiser value for cell 4
    // define function to move the final block depending on correct/incorrect input
    console.log('Block current positions -->', blockCurrentPositions)
    
    function moveBlocks() {
      const newColumnArray = columnArray.slice(-6)
      for (let i = 0; i < blockCurrentPositions.length; i++) {
        removeBlock(blockCurrentPositions[i])
      }
      //newColumnArray = newColumnArray.push('x')
      console.log('new ColumnArray -->', newColumnArray)
    }
    moveBlocks()


    // function moveSnake(squares) {
    //   let tail = currentSnake.pop();
    //   squares[tail].classList.remove("snake");
    //   currentSnake.unshift(currentSnake[0] + direction);
    //   // movement ends here
    //   eatApple(squares, tail);
    //   squares[currentSnake[0]].classList.add("snake");
    // }
    // console.log(columnArray)
    // let newColumnArray = columnArray.shift()
    // newColumnArray.push(createBlock(4))
    // console.log(newColumnArray)

    // removeBlock(blockCurrentPositions)
    // if (blockCurrentPositions + width < cellCount - 28) {
    //   blockCurrentPositions += width      
    // } else if (blockCurrentPositions === 58) {
    //   if (key === q && blockClass === 'q') {
    //     blockCurrentPositions -= 2
    //     incrementBlocksBroken()
    //   } else if (key === w && blockClass === 'w'){
    //     blockCurrentPositions -= 2
    //     incrementBlocksBroken()
    //   } else if (key === e && blockClass === 'e') {
    //     blockCurrentPositions -= 2
    //     incrementBlocksBroken()
    //   } else if (key === r && blockClass === 'r') {
    //     blockCurrentPositions -= 2
    //     incrementBlocksBroken()
    //   } else {
    //     blockCurrentPositions += width
    //     incrementBlocksFailed()
    //   }
    // } else if (blockCurrentPositions === 56) {
    //   blockCurrentPositions -= 2
    // }
    // addBlock(blockCurrentPositions)
    // if (blockCurrentPositions === 54) {
    //   removeBlock(blockCurrentPositions)
    // }
    addCharacter2()
  }

  // for (let i = 0; i < cars.length; i++) {
  //   text += cars[i] + "<br>";
  // }

  function handleKeyUp() {
    removeCharacter()
    addCharacter()
    //createBlocks(4)
  }

  document.addEventListener('keyup', handleKeyUp) // listening for key press
  document.addEventListener('keydown', handleKeyDown)
  
  createGrid() 
}

window.addEventListener('DOMContentLoaded', init)