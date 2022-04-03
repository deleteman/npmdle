<script>
    export let isOpen;
    export let stats;
    import {gameState} from '$lib/store.js'
    
    function closeModal() {
        isOpen = false;
    }

    function shareStatus() {
        let textStatus = "I'm terrible at NPMDle, can you do better than me?"
        textStatus += "\n"
        textStatus += $gameState.attemptsStatus.join("\n")
        navigator.clipboard.writeText(textStatus);
        console.log(textStatus)
    }
</script>

<div id="background"  style="--display: {isOpen ? 'block' : 'none'};" on:click={closeModal}></div>
<div id="modal" style="--display: {isOpen ? 'block' : 'none'};">
    <h1>GameOver!</h1>
    <h2>You're terrible at this game!</h2>
    <div id="statistics">
        <div class="statistic-container">
            <div class="label">You couldn't even guess <strong>{stats.word}</strong>?!</div>
            <div class="label">Check out the package <a href="http://npmjs.com/package/{stats.word}" target="_blank">on NPM</a> and show it some love <strong>{stats.word}</strong>?!</div>

        </div>
        <div class="statistic-container share-container">
            <button class="share-button" on:click={shareStatus}>Share</button>
        </div>
        <!--
            <div class="statistic-container">
                <div class="statistic">91</div>
                <div class="label">Win %</div>
            </div>
            
            <div class="statistic-container">
                <div class="statistic">5</div>
                <div class="label">Current Streak</div>
            </div>
            
            <div class="statistic-container">
                <div class="statistic">6</div>
                <div class="label">Max Streak</div>
            </div>
        </div>
        <h1>Guess Distribution</h1>
        <div id="guess-distribution">
            <div class="graph-container">
                <div class="guess">1</div>
                <div class="graph">
                    <div class="graph-bar" style="width: 7%;">
                        <div class="num-guesses">0</div>
                    </div>
                </div>
            </div>
            
            <div class="graph-container">
                <div class="guess">2</div>
                <div class="graph">
                    <div class="graph-bar" style="width: 7%;">
                        <div class="num-guesses">0</div>
                    </div>
                </div>
            </div>
            
            <div class="graph-container">
                <div class="guess">3</div>
                <div class="graph">
                    <div class="graph-bar align-right" style="width: 71%;">
                        <div class="num-guesses">10</div>
                    </div>
                </div>
            </div>
            
            <div class="graph-container">
                <div class="guess">4</div>
                <div class="graph">
                    <div class="graph-bar align-right" style="width: 79%;">
                        <div class="num-guesses">11</div>
                    </div>
                </div>
            </div>
            
            <div class="graph-container">
                <div class="guess">5</div>
                <div class="graph">
                    <div class="graph-bar align-right" style="width: 100%;">
                        <div class="num-guesses">14</div>
                    </div>
                </div>
            </div>
            
            <div class="graph-container">
                <div class="guess">6</div>
                <div class="graph">
                    <div class="graph-bar align-right" style="width: 36%;">
                        <div class="num-guesses">5</div>
                    </div>
                </div>
            </div>
        -->
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
    .share-button {
        background: green;
        border-radius: 5px;
        font-size: 35px;
        color: white;
        border: 0px;
        padding: 9px;
    }
    .share-container {
        text-align: center;
        padding: 5px;
    }
</style>