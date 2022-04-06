<script>
    export let isOpen;
    export let stats;
    export let alreadyPlayed;

    import {gameState} from '$lib/store.js'
    
    function closeModal() {
        isOpen = false;
    }

    function shareStatus() {
        let textStatus = "I guessed today's NPM package name in NPMle! (" + $gameState.attempts + "/7git) \n I'm either really lucky or I need a life"
        textStatus += "\n"
        textStatus += $gameState.attemptsStatus.join("\n")
        navigator.clipboard.writeText(textStatus);
        console.log(textStatus)
    }
</script>

<div id="background"  style="--display: {isOpen ? 'block' : 'none'};" on:click={closeModal}></div>
<div id="modal" style="--display: {isOpen ? 'block' : 'none'};">
    <h1>{alreadyPlayed ? "You've already played today...": "Well done!"}</h1>
    {#if alreadyPlayed}
        <div class="container">
        <h2>Better luck tomorrow!</h2>
        </div>
    {/if}
    <div id="statistics">
        {#if !alreadyPlayed}
        <div class="statistic-container">
            <div class="label">Today's Package</div>
            <div class="statistic"><a href="http://npmjs.com/package/{stats.word}" target="_blank" >{stats.word}</a></div>
        </div>
        <div class="statistic-container">
            <div class="label">Attempts</div>
            <div class="statistic">{stats.attempts}</div>
        </div>
        {/if} 
        <div class="statistic-container">
            <div class="label">Total Wins so far</div>
            <div class="statistic">{stats.wins}</div>
        </div>
        
        <div class="statistic-container">
            <div class="label">Total loses so far</div>
            <div class="statistic">{stats.loses}</div>
        </div>
        {#if !alreadyPlayed}
        <div class="container">
            <button class="share-button" on:click={shareStatus}>Share</button>
        </div>
        {/if}
    </div>
    <div class="footer"></div>
    
</div>

<style>
    #background {
        display: var(--display);
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
    
    #modal {
        display: var(--display);
        position: fixed;
        z-index: 2;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        filter: drop-shadow(0 0 20px #333);
        padding: 10px;
        border-radius: 10px;
        border: 3px solid red;
    }
    
    .label {
        font-weight: bold;
        margin: 5px;
        display: inline;
    }
    
    .statistic {
        display: inline;
        margin: 5px;
        padding: 2px;
    }
    
    .statistic-container { 
        float: none;
        margin: 5px;
        padding: 5px;
    }
    
    .share-button {
        background: green;
        border-radius: 5px;
        font-size: 35px;
        color: white;
        border: 0px;
        padding: 9px;
    }
    .share-button:hover {
        background: #050;
    }
    .share-button:active{
        background: #090;
    }
    .container {
        padding: 5px;
        text-align: center;
    }
</style>