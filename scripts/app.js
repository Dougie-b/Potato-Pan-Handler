function init (){

  //Variables
  
  // start & end screen functions
  const startButton = document.querySelector('#startButton')
  const backAudio = document.querySelector('#backAudio')
  const restartButton = document.querySelector('#restartButton')
  let intervalStop = null

  startButton.addEventListener('click', startGame)
  restartButton.addEventListener('click', replay)

  function startGame() {
    document.getElementById('startScreen').style.display = 'none'
    backgroundSound()
    runGame()
  }
  
  function backgroundSound() {
    const loops = 5
    let count = 0
    backAudio.onended = function() {
      if (count <= loops){
        count++
        this.play()
      }
    }
    backAudio.src = ('assets/background-tune.wav')
    backAudio.volume = 0.2
    backAudio.play()
  }

  function replay() {
    document.getElementById('endScreen').style.display = 'none'
    location.reload()
  }

  function endGame() {
    document.getElementById('endScreen').style.display = 'flex'
  }

  function runGame() {
    const grid = document.querySelector('.grid') // get the grid element
    const width = 9 // define the width
    const height = 10
    const cellCount = width * height // define the number of cells on the grid
    const cells = [] // empty array to store our divs that we create 
    let blocksBroken = 0
    let blocksFailed = 0
    const timerClass = 'timer'
    let seconds = 0
    const audio = document.querySelector('#audio')
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
    ] // array of arrays containing the index and the second element of each array will be the randomed

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
      createKey()
    }

    function createKey() {
      cells[75].classList.add('q')
      cells[84].innerText = 'Press Q to break bowls!'
      cells[76].classList.add('w')
      cells[85].innerText = 'Press A to break pans!'
      cells[77].classList.add('e')
      cells[86].innerText = 'Press P to break plates!'
      cells[78].classList.add('r')
      cells[87].innerText = 'Press L to break skillets!'
    }

    // timer function
    function startTimer(){
      seconds += 1
      cells[73].innerHTML = 'Time Elapsed '  + seconds
    }

    function createTimer(){
      cells[73].innerHTML = 'Time Elapsed '  + seconds
      intervalStop = setInterval(startTimer, 1000)
      cells[73].classList.add(timerClass)
    }

    // music functions
    function failSound() {
      audio.src = ('assets/fail.wav')
      audio.volume = 0.05
      audio.play()
    }

    function correctSound() {
      audio.src = ('assets/correct.wav')
      audio.volume = 0.05
      audio.play()
    }

    // blocks broken counters
    function incrementBlocksBroken(){
      blocksBroken += 1
    }

    function incrementBlocksFailed(){
      blocksFailed += 1
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
      const a = 65
      const p = 80
      const l = 76
      const oldArray = [
        [58, null],
        [49, null],
        [40, null],
        [31, null],
        [22, null],
        [13, null],
        [4, null]
      ]
      const score = Math.floor(((blocksBroken - blocksFailed) * 500) / (seconds))

      // if statements for adding/losing points
      
      
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
      if (blocksBroken + blocksFailed <= 50) {
        if (key === l && cells[58].classList.value === 'r') {
          incrementBlocksBroken()
          correctSound()
        } else if (key === q && cells[58].classList.value === 'q') {
          incrementBlocksBroken()
          correctSound()
        } else if (key === a && cells[58].classList.value === 'w') {
          incrementBlocksBroken()
          correctSound()
        } else if (key === p && cells[58].classList.value === 'e') {
          incrementBlocksBroken()
          correctSound()
        } else {
          incrementBlocksFailed()
          failSound()
        }
        moveBlocks()
        updateBlock(oldArray, blockClassPositions)
        addCharacter2()
      } else {
        clearInterval(intervalStop)
        document.getElementById('endScreenText').innerHTML = score
        endGame()
      }
    }

    function handleKeyUp() {
      removeCharacter()
      addCharacter()
    }

    document.addEventListener('keyup', handleKeyUp) // listening for key press
    document.addEventListener('keydown', handleKeyDown)
    createGrid() 
  } 
}

window.addEventListener('DOMContentLoaded', init)