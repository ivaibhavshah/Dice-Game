'use strict';
// Selecting all the classes we will need in this project to work with
// using getelementbyid as it is faster than query selector

const player0N = prompt("Please name of Player 1", "Player 1");
const player1N = prompt("Please name of Player 2", "Player 2");

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

document.querySelector('#name--0').textContent = player0N;
document.querySelector('#name--1').textContent = player1N;

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// to make score zero on reloading page 
score0El.textContent = 0;
score1El.textContent = 0;
let currentScore = 0;
let activeplayer = 0;
let playing = true;
let scores = [0, 0];
// to hide the dice in the web
// This syntax will add class name to dice class in html
diceEl.classList.add('hidden');


const switchplayer = function() {
        document.getElementById(`score--${activeplayer}`).textContent = scores[activeplayer];
        document.getElementById(`current--${activeplayer}`).textContent = 0;
        currentScore = 0;
        activeplayer = activeplayer === 0 ? 1 : 0;
        player0El.classList.toggle('player--active');
        player1El.classList.toggle('player--active');
    }
    // Rolling the dice functionality
    // not defining separately the function as it is not called by anybody else

btnRoll.addEventListener('click', function() {
    if (playing == true) {
        // generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;
        // Trunc function prevents integer
        // and random picks a random number till it is multiple to 

        // Displaying image 
        diceEl.classList.remove('hidden');

        diceEl.src = `dice-${dice}.png`

        // updating score & winning
        if (dice !== 1) {
            // add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activeplayer}`).textContent = currentScore;
        } else {
            // Switch players
            scores[activeplayer] = 0;
            switchplayer();


        }

    }
});

btnHold.addEventListener('click', function() {
    if (playing == true) {
        // add current score to score
        scores[activeplayer] += currentScore;

        document.getElementById(`score--${activeplayer}`).textContent = scores[activeplayer];

        //    console.log(scores);

        // finishes the game
        if (scores[activeplayer] >= 50) {
            playing = false;
            document.querySelector(`.player--${activeplayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activeplayer}`).classList.remove('player--acitve');
            diceEl.classList.add('hidden');
        } else {
            switchplayer();
        }
    }
});

btnNew.addEventListener('click', function() { location.reload() });