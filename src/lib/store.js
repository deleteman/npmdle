import { writable } from 'svelte/store';

export const failedChars = writable([])
export const gameState = writable({
    lastgame: 0,
    wins: 0,
    loses: 0,
    word: "",
    attempts: 0,
    alreadyPlayed: false,
    attemptsStatus: []
})