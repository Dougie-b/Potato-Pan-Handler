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
  const audio = document.querySelector('#audio')
  const backAudio = document.querySelector('#backAudio')


  const blockClassArray = ['q', 'w', 'e', 'r'] // array of block classes to randomly assign on spawn
  const charClass = 'char' //character class
  const charClass2 = 'char2' 
  const blockClassPositions = [
    [58, randomBlock()],
    [49, randomBlock()],
    [40, randomBlock()],
    [31, randomBlock()],
    [22, randomBlock()],
    [13, randomBlock()],
    [4, randomBlock()]
  ]

  function createGrid() {
    for (let i = 0; i < cellCount; i++) { // for loop to run for every cell, in this case we want 100 cells
      const cell = document.createElement('div') // create the div
      cell.innerText = null // inner text of the div to be its index
      grid.appendChild(cell) // make the cell a child of the grid element we grabbed above
      cells.push(cell) // add the newly created div into our empty array
    }
    for (let i = 0; i < blockClassPositions.length; i++) {
      createBlock(blockClassPositions[i][0])
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

  // music functions
  function failSound() {
    audio.src = ('assets/fail.wav')
    audio.play()
  }
  // Need to call in startgame when it's made
  function backgroundSound() {
    backAudio.src = ('assets/background-tune.wav')
    backAudio.play()
  }

  // blocks broken counters
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

  // function to switch the image back to the original
  function removeCharacter() {
    cells[59].classList.remove(charClass)
    cells[59].classList.remove(charClass2)
  }

  // function to randomly choose a class
  function randomBlock() {
    return blockClassArray[Math.floor(Math.random() * blockClassArray.length)]
  }

  // create & randomise blocks
  function createBlock(position) {
    cells[position].classList.add(randomBlock())
  }

  function handleKeyDown(event) {
    const key = event.keyCode // store the event.keyCode in a variable to save us repeatedly typing it out
    const q = 81
    const w = 87
    const e = 69
    const r = 82
    const oldArray = [
      [58, null],
      [49, null],
      [40, null],
      [31, null],
      [22, null],
      [13, null],
      [4, null]
    ]
    // if statements for adding/losing points
    if (key === r && cells[58].classList.value === 'r') {
      incrementBlocksBroken()
    } else if (key === q && cells[58].classList.value === 'q') {
      incrementBlocksBroken()
    } else if (key === w && cells[58].classList.value === 'w') {
      incrementBlocksBroken()
    } else if (key === e && cells[58].classList.value === 'e') {
      incrementBlocksBroken()
    } else incrementBlocksFailed()
    failSound()
    
    // function to make a copy of the original array and store it as oldArray
    function copyArray(arrayToCopy) {
      for (let i = 0; i < arrayToCopy.length; i++) {
        oldArray[i][1] = arrayToCopy[i][1]
      }
    }

    // function to update the old array with the new array values (moving the blocks down one row)
    function updateBlock(oldArray, newArray) {
      for (let i = 0; i < oldArray.length; i++) {
        cells[oldArray[i][0]].classList.remove(oldArray[i][1])
        cells[oldArray[i][0]].classList.add(newArray[i][1])
      }
    }

    // make copy of the array before manipulating
    copyArray(blockClassPositions)
    
    // function to loop through the positions of the array and shuffle them down one
    function moveBlocks() {
      for (let i = 1; i < blockClassPositions.length; i += 2) {
        blockClassPositions[i - 1][1] = blockClassPositions[i][1]
        blockClassPositions[i][1] = blockClassPositions[i + 1][1]
      } 
      addBlock(blockClassPositions, blockClassPositions.length - 1)
    }

    //function to add a new block to the array with a generated class
    function addBlock(arrayChange, position) {
      arrayChange[position][1] = randomBlock()
    }

    // call both functions to move all of the blocks down a row and generate a new one in the first position
    moveBlocks()
    updateBlock(oldArray, blockClassPositions)
    addCharacter2()
  }
  

  function handleKeyUp() {
    removeCharacter()
    addCharacter()
  }

  document.addEventListener('keyup', handleKeyUp) // listening for key press
  document.addEventListener('keydown', handleKeyDown)
  
  createGrid() 
}

window.addEventListener('DOMContentLoaded', init)