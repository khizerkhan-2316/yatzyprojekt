import Dice from './Dice.js';
import Yatzy from './Yatzy.js';

///// DOM nodes
const dices = document.querySelectorAll('.dice');
const checkboxes = document.querySelectorAll('.checkbox');
const rollButton = document.querySelectorAll('button')[1];
const paragrafs = document.querySelectorAll('p');

const textFields = document.querySelectorAll('.textfield');
const sumTextField = document.querySelector('.sumTextField');
const bonusTextField = document.querySelector('.bonusTextField');
const totalTextField = document.querySelector('.total');

const playAgainButton = document.querySelector('button');
const modalHeading = document.querySelector('h2');
const modal = document.querySelector('.main-container');

//objects
const allDices = [
  new Dice(0, false),
  new Dice(0, false),
  new Dice(0, false),
  new Dice(0, false),
  new Dice(0, false),
];

const game = new Yatzy(allDices);

// eventlisteners

rollButton.addEventListener('click', () => {
  game.rollDices();
  disableRollButton();
  disableCheckBoxes();
  updateDices();
  updateFields();
});

checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener('click', () => {
    isDieHolded(checkbox)
      ? allDices[index].setIsHold(true)
      : allDices[index].setIsHold(false);
  });
});

textFields.forEach((field) => {
  field.addEventListener('click', () => {
    if (game.getRollCount() >= 1) {
      sumPoints(field);
      disableField(field);
      resetRound();
      calculateSum(field);
      addBonus();
    } else {
      modal.style.display = 'flex';
    }

    resetGame();
  });
});

modal.addEventListener('click', () => {
  modal.style.display = 'none';
});

//// Eventlistener end

// DOM Manipulation

const updateDices = () => {
  paragrafs[1].innerHTML = 'Rolls: ' + game.getRollCount();
  allDices.forEach((die, index) => {
    dices[index].value = die.getValue();
  });
};

const updateFields = () => {
  textFields.forEach((textfield, index) => {
    if (!textfield.disabled) {
      textfield.value !== undefined
        ? (textfield.value = game.getResults()[index])
        : (textfield.value = 0);
    }
  });
};

const addBonus = () => {
  if (game.getSum() >= 63 && !game.getGotBonus()) {
    game.setGotBonus(true);
    game.setTotal(game.getTotal() + 50);
    bonusTextField.value = game.getBonus();
    totalTextField.value = game.getTotal();
  }
};

const calculateSum = (field) => {
  if (field.classList.contains('upperTextFields')) {
    field.disabled ? game.setSum(game.getSum() + parseInt(field.value)) : '';
    sumTextField.value = game.getSum();
  }
};

const sumPoints = (field) => {
  game.setTotal(game.getTotal() + parseInt(field.value));

  totalTextField.value = game.getTotal();
};

const isDieHolded = (checkbox) => {
  return checkbox.checked ? true : false;
};

const disableRollButton = () => {
  game.getRollCount() === 3
    ? (rollButton.disabled = true)
    : (rollButton.disabled = false);
};

const disableCheckBoxes = () => {
  game.getRollCount() >= 1 && game.getRollCount() < 3
    ? checkboxes.forEach((box) => (box.disabled = false))
    : checkboxes.forEach((box) => (box.disabled = true));
};

const disableField = (field) => {
  field.disabled = true;
  field.style.backgroundColor = '#400000';
};

// Reset round and restart game

const resetRound = () => {
  game.resetRound();
  if (game.getRoundsCount() <= 15) {
    paragrafs[2].innerHTML = 'Round: ' + game.getRoundsCount() + '/15';
  }
  paragrafs[1].innerHTML = 'Rolls: ' + game.getRollCount();
  rollButton.disabled = false;
  allDices.forEach((die, index) => {
    die.setValue(0);
    die.setIsHold(false);
    dices[index].value = '?';
    checkboxes[index].checked = false;
    checkboxes[index].disabled = true;
  });
};

const gameOver = () => {
  let allDisabled = true;

  textFields.forEach((field) => {
    if (!field.disabled) {
      allDisabled = false;
    }
  });

  return allDisabled;
};
const resetGame = () => {
  if (gameOver()) {
    setTimeout(() => {
      modalHeading.innerHTML = 'Game Over';
      paragrafs[0].innerHTML =
        'Wanna play again? Press the button otherwise press anywhere else';
      modal.style.display = 'flex';
    }, 1000);

    playAgainButton.addEventListener('click', () => {
      PlayAgain();
    });
  }
};

const PlayAgain = () => {
  clearTextAllTextFields();
  game.resetGame();
  paragrafs[2].innerHTML = 'Round: ' + game.getRoundsCount() + '/15';
  sumTextField.value = '0';
  bonusTextField.value = '0';
  totalTextField.value = '0';
};

const clearTextAllTextFields = () => {
  textFields.forEach((field) => {
    field.style.backgroundColor = '#000';
    field.disabled = false;
    field.value = '';
  });
};

const gameStatistics = () => {};
