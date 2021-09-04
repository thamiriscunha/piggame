'use strict';
const player01Element = document.querySelector('.player--0');
const player02Element = document.querySelector('.player--1');
const scorePlayer1 = document.querySelector('#score--0');
const scorePlayer2 = document.querySelector('#score--1');
//const scorePlayer2 = document.getElementById('score--1');
const currentScorePlayer1 = document.getElementById('current--0');
const currentScorePlayer2 = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnNewElement = document.querySelector('.btn--new');
const btnRollElement = document.querySelector('.btn--roll');
const btnHoldElement = document.querySelector('.btn--hold');

// Start
let scores, currentScore, activePlayer, playing;

const init = function () {
  // Start
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  currentScorePlayer1.textContent = 0;
  currentScorePlayer2.textContent = 0;

  diceElement.classList.add('hidden');
  player01Element.classList.remove('player--winner');
  player02Element.classList.remove('player--winner');
  player01Element.classList.add('play-active'); //sempre começa com o jogador 1
  player02Element.classList.remove('play-active');
  document.querySelector(`.player0-winner`).classList.add('hidden');
  document.querySelector(`.player1-winner`).classList.add('hidden');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  player01Element.classList.toggle('player--active');
  player02Element.classList.toggle('player--active');
};

btnRollElement.addEventListener('click', function () {
  if (playing) {
    //1. Rolar o dado randomicamente
    const dice = Math.trunc(Math.random() * 6) + 1; //Math.random() * 6 = 0.0 - 6.9..
    //console.log(dice);
    //2. Mostrar o dado
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    //3. Checar se número gerado é 1: se for, passa a jogada para o próximo usuário
    if (dice != 1) {
      //Soma o dado na pontuação atual
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //troca de jogador
      switchPlayer();
    }
  }
});

btnHoldElement.addEventListener('click', function () {
  if (playing) {
    //1. Adiciona a pontuação atual para o jogador
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Checa se a pontuação é >= 100
    if (scores[activePlayer] >= 20) {
      // Fim do jogo
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      console.log(
        document
          .querySelector(`.player${activePlayer}-winner`)
          .classList.remove('hidden')
      );
    } else {
      // ainda não ganhou => troca de jogador
      switchPlayer();
    }
  }
});

btnNewElement.addEventListener('click', init);
