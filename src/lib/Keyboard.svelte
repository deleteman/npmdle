<script>
  import {failedChars} from './store.js'
  
  function synthInput() {
    console.log(this.innerHTML)
    document.dispatchEvent(new KeyboardEvent('keydown', {
      key: this.innerHTML
    }))
  }
  
  function synthEnter() {
    document.dispatchEvent(new KeyboardEvent('keydown', {
      code: 'Enter',
      key: 'Enter',
      charCode: 13,
      keyCode: 13,
      view: window,
      bubbles: true
    }))
  }
  
</script> 


<div id="keyboard-cont">
  <div class="first-row">
    <button class="keyboard-button" disabled={$failedChars.includes('q')} on:click={synthInput}>q</button>
    <button class="keyboard-button" disabled={$failedChars.includes('w')} on:click={synthInput}>w</button>
    <button class="keyboard-button" disabled={$failedChars.includes('e')} on:click={synthInput}>e</button>
    <button class="keyboard-button" disabled={$failedChars.includes('r')} on:click={synthInput}>r</button>
    <button class="keyboard-button" disabled={$failedChars.includes('t')} on:click={synthInput}>t</button>
    <button class="keyboard-button" disabled={$failedChars.includes('y')} on:click={synthInput}>y</button>
    <button class="keyboard-button" disabled={$failedChars.includes('u')} on:click={synthInput}>u</button>
    <button class="keyboard-button" disabled={$failedChars.includes('i')} on:click={synthInput}>i</button>
    <button class="keyboard-button" disabled={$failedChars.includes('o')} on:click={synthInput}>o</button>
    <button class="keyboard-button" disabled={$failedChars.includes('p')} on:click={synthInput}>p</button>
  </div>
  <div class="second-row">
    <button class="keyboard-button" disabled={$failedChars.includes('a')} on:click={synthInput}>a</button>
    <button class="keyboard-button" disabled={$failedChars.includes('s')} on:click={synthInput}>s</button>
    <button class="keyboard-button" disabled={$failedChars.includes('d')} on:click={synthInput}>d</button>
    <button class="keyboard-button" disabled={$failedChars.includes('f')} on:click={synthInput}>f</button>
    <button class="keyboard-button" disabled={$failedChars.includes('g')} on:click={synthInput}>g</button>
    <button class="keyboard-button" disabled={$failedChars.includes('h')} on:click={synthInput}>h</button>
    <button class="keyboard-button" disabled={$failedChars.includes('j')} on:click={synthInput}>j</button>
    <button class="keyboard-button" disabled={$failedChars.includes('k')} on:click={synthInput}>k</button>
    <button class="keyboard-button" disabled={$failedChars.includes('l')} on:click={synthInput}>l</button>
  </div>
  <div class="third-row">
    <button class="keyboard-button" >Del</button>
    <button class="keyboard-button" disabled={$failedChars.includes('z')} on:click={synthInput}>z</button>
    <button class="keyboard-button" disabled={$failedChars.includes('x')} on:click={synthInput}>x</button>
    <button class="keyboard-button" disabled={$failedChars.includes('c')} on:click={synthInput}>c</button>
    <button class="keyboard-button" disabled={$failedChars.includes('v')} on:click={synthInput}>v</button>
    <button class="keyboard-button" disabled={$failedChars.includes('b')} on:click={synthInput}>b</button>
    <button class="keyboard-button" disabled={$failedChars.includes('n')} on:click={synthInput}>n</button>
    <button class="keyboard-button" disabled={$failedChars.includes('m')} on:click={synthInput}>m</button>
    <button class="keyboard-button"  on:click={synthEnter}>Enter</button>
  </div>
</div>


<style>
  #keyboard-cont {
    margin: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  #keyboard-cont div {
    display: flex;
  }
  
  .second-row {
    margin: 0.5rem 0;
  }
  
  .keyboard-button {
    font-size: 1rem;
    font-weight: 700;
    padding: 0.5rem;
    margin: 0 2px;
    cursor: pointer;
    text-transform: uppercase;
  }
  
</style>