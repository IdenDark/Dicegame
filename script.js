'use strict';

//selecting elements
const player0El = document.querySelector(`.player--0`);
const player1El = document.querySelector(`.player--1`);
let score0El = document.querySelector(`#score--0`);
let current0El = document.getElementById(`current--0`);
let current1El = document.getElementById(`current--1`);
let score1El = document.getElementById(`score--1`);
const diceEl = document.querySelector(`.dice`);
const btnNew = document.querySelector(`.btn--new`);
const btnRoll = document.querySelector(`.btn--roll`);
const btnHold = document.querySelector(`.btn--hold`);

// starting condition

const scoreResetter = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add(`hidden`);
};
const currentResseter = function () {
  current0El.textContent = 0;
  current1El.textContent = 0;
  currentScore = 0;
};

scoreResetter();

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

btnNew.addEventListener(`click`, function () {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove(`player--winner`);
  playing = true;
  player0El.classList.add(`player--active`);
  player1El.classList.remove(`player--active`);
  scores = [0, 0];
  currentResseter();
  scoreResetter();

  activePlayer = activePlayer === 1 ? 0 : 0;
});

const switchPrayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle(`player--active`);
  player1El.classList.toggle(`player--active`);
};
//rolling dice functionality

btnRoll.addEventListener(`click`, function () {
  if (playing) {
    // 1. generating a random roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2 display dice

    diceEl.classList.remove(`hidden`);
    diceEl.src = `dice-${dice}.png`;
    //3. check either 1 or not

    if (dice !== 1) {
      //add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPrayer();
    }
  }
});

btnHold.addEventListener(`click`, function () {
  if (playing) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add(`player--winner`);
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove(`player--active`);
      diceEl.classList.add(`hidden`);
      // Display a win message
      document.querySelector(`.player--${activePlayer}`).querySelector('h2').textContent +=' WON'
    } else {
      switchPrayer();
    }
  }
  //if (scores)
});
// resetting the game
