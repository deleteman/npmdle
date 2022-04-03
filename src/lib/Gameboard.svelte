<script>
  export let word;
  
  import {onMount, createEventDispatcher} from 'svelte';
  import {failedChars, gameState} from './store.js';
  
  
  const LETTERS_PER_WORD = 5;
  const GUESSES = 7;
  
  let gameBoard;
  
  let currentGuess = 0
  let currentChar = 0
  let currentWord = ""
  let dispatch = createEventDispatcher()


  function validWord() {
    dispatch("userWon", {
      tries: currentGuess + 1,
      word: word
    })
  }
  
  function evaluateWord(guess, row) {
    let wordChars = word.split("")
    let fullWord = word.split("");
    let nodes = [...row.children]


    let attemptStatus = "";

    nodes.forEach( (cell) => {
      let currentChar = wordChars.shift()
      if (cell.innerHTML == currentChar) {
        cell.classList.add("rightchar-box")
        attemptStatus += "🟩";
      } else {
        if(fullWord.indexOf(cell.innerHTML) != -1) {
          cell.classList.add("rightcharwrongplace-box")
          attemptStatus += "🟨"
        } else {
          $failedChars = [...$failedChars, cell.innerHTML]
          attemptStatus += "⬛️";
        }
      }
    })
    let a = $gameState.attemptsStatus || []
    a.push(attemptStatus)
    $gameState = {...$gameState, attemptsStatus: a}

    if(guess == word) {
      return true
    } else {
      return false
    }
  }
  
  
  onMount( () => {
    
    
    for(let i = 0; i < GUESSES; i++) {
      let row = document.createElement('div')
      row.className = "letter-row"
      for(let j = 0; j < LETTERS_PER_WORD; j++){
        let letterbox = document.createElement('div')
        letterbox.className =  "letter-box"
        row.appendChild(letterbox)
      }
      gameBoard.appendChild(row)
    }
    
    
    
    
    function invalidWord(guessNumber) {
      if((guessNumber+1) == GUESSES) {
        return dispatch('gameOver', {
          word
        })
      }
      currentGuess++
      currentChar = 0
      currentWord = ""
    }
    
    
    
    
    document.addEventListener('keydown', function (event) {
      if($gameState.alreadyPlayed) return
      let char = event.key
      let currentRow = document.getElementsByClassName("letter-row")[currentGuess]
      let letterBoxes = currentRow.getElementsByClassName("letter-box")

      //handling enter key
      if(event.code == 'Enter') {
        if(currentChar < LETTERS_PER_WORD) return; //make sure we're not evaluating before entering the full word
        if(!evaluateWord(currentWord, currentRow)) {
          return invalidWord(currentGuess)
        } else {
          return validWord()
        }
      }

      //handling backspace
      if(event.code == 'Backspace') {
        currentChar--;
        console.log("current word: ", currentWord)
        currentWord = currentWord.slice(0, currentWord.length - 1)
        console.log("current word: ", currentWord)
        if(currentChar < 0) currentChar = 0;
        letterBoxes[currentChar].innerHTML = "";
        letterBoxes[currentChar].classList.remove('filled-box')
        return;
      }
      
      //avoid non-alphabetic character
      if(!event.key.match(/^[a-z]$/)) {
        return false
      }
      //avoid going over the limit
      if(currentChar == LETTERS_PER_WORD) return 
      
      
      let letterBox = letterBoxes[currentChar]
      letterBox.innerHTML = char
      letterBox.classList.add("filled-box")
      
      currentWord += char
      currentChar++
    })
  })
  
</script>	


<div id="game-board" bind:this={gameBoard}>
  {#each [1,2,3,4,5, 6,7] as row}		
  <div class="letter-row">
    {#each [1,2,3,4,5] as letter}		
    <div class={this.text ? ' rightcharwrongplace-box filled-box rightchar-box'  : 'letter-box'}></div>
    {/each}
  </div>
  {/each}
</div>




<style>
  
  #game-board {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  
  .letter-box {
    border: 2px solid gray;
    border-radius: 3px;
    margin: 2px;
    font-size: 2.5rem;
    font-weight: 700;
    height: 3rem;
    width: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
  }
  
  .rightchar-box {
    border: 2px solid black !important;
    background-color: darkgreen !important;
    transition: background-color 500ms linear;
    color:aliceblue !important;
  }
  .rightcharwrongplace-box {
    border: 2px solid black !important;
    background-color: #B59F3B !important;
    transition: background-color 500ms linear;
    color:#ddd !important;
  }
  
  .filled-box {
    border: 2px solid black;
    background-color: darkgrey;
  }
  .letter-row {
    display: flex;
  }
  
</style>
