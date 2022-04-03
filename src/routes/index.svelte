

<script context="module">
	export const prerender = true;
</script>


<script>
	import Gameboard from '$lib/Gameboard.svelte'
	import Keyboard from '$lib/Keyboard.svelte'
	import EndGameModal from '$lib/EndGameModal.svelte';
	import GameoverModal from '$lib/GameoverModal.svelte'
	import { onMount } from 'svelte';
	import { getCookie, setCookie } from '$lib/cookies'
	import {gameState} from '$lib/store.js'


	let word = "";
	let showEndGameModal = false;
	let showGameOver = false;
	//let gameState = {}
	let alreadyPlayed = false;

	async function getWord() {
		let today = (new Date())
		today.setHours(0,0,0,0)	
		let todaytimeStamp = today.getTime()
		console.log("last game: ", $gameState.lastgame)
		console.log("today timestamp: ", todaytimeStamp)
		if($gameState.lastgame == todaytimeStamp) {
			alreadyPlayed = true;
			$gameState.alreadyPlayed = true;
			showEndGameModal = true;
		}
		const url = "https://raw.githubusercontent.com/deleteman/npmdle-word-generator/main/words/"
		const resp = await fetch(url + todaytimeStamp)
		let encodedWord = await resp.text()
		word = atob(encodedWord)
		console.log("today's word: ", word)
	}

	function updateGameDataCookie(data) {
		let today = (new Date())
		today.setHours(0, 0, 0, 0)
		data.lastgame = today.getTime();
		setCookie('npmdle', JSON.stringify(data))
	}

	function handleUserWinning(event) {
		showEndGameModal = true;
		$gameState = {...$gameState, wins: $gameState.wins + 1, word: event.detail.word, attempts: event.detail.tries};
		updateGameDataCookie($gameState)
	}

	function handleGameOver(event) {
		showGameOver = true;
		$gameState = {...$gameState, loses: $gameState.loses+ 1, word: event.detail.word}
		updateGameDataCookie($gameState)
	}

	function loadCookie() {
		$gameState = getCookie('npmdle')
		console.log("Game state saved: ", gameState)
	}

	onMount(async () => {
		loadCookie()
		await getWord()
	})
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>
		Welcome to NPMDle
	</h1>

	<EndGameModal isOpen={showEndGameModal} stats={$gameState} alreadyPlayed={alreadyPlayed}/>
	<GameoverModal isOpen={showGameOver} stats={$gameState} />
	<Gameboard word={word} on:userWon={handleUserWinning} on:gameOver={handleGameOver}/>	
	<Keyboard></Keyboard>
</section>

