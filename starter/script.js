'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const current0El = document.querySelector('#current--0');
const score1El = document.getElementById('score--1');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;



const switchPlayer = function() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

btnRoll.addEventListener('click', function() {
    if(isPlaying) {
        const dice = Math.trunc(Math.random() * 6) + 1;
    
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
    
        if(dice !== 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() {
    if(isPlaying) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    
        if(scores[activePlayer] >= 100) {
            isPlaying = false;
            diceEl.classList.toggle('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', function () {
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
    document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

    activePlayer = 0;
    document.querySelector(`.player--${activePlayer}`).classList.add('player--active');

    
    for(let i = 0; i < scores.length; i++) {
        scores[i] = 0;
        document.getElementById(`score--${i}`).textContent = scores[i];
    }

    diceEl.classList.add('hidden');
    isPlaying = true;
});
