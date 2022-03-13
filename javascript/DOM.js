import Dice from './Dice.js';
import Yatzy from './Yatzy.js';
import History from './History.js';

///// DOM nodes
const dices = document.querySelectorAll('.dice');
const checkboxes = document.querySelectorAll('.checkbox');
const rollButton = document.querySelectorAll('button')[1];
const paragrafs = document.querySelectorAll('p');

const textFields = document.querySelectorAll('.textfield');

const sumTextField = document.querySelector('.sumTextField');
const bonusTextField = document.querySelector('.bonusTextField');
const totalTextField = document.querySelector('.total');

const modalButton = document.querySelector('button');
const modalHeading = document.querySelector('h2');
const modal = document.querySelector('.main-container');

const historyButton = document.querySelector('.history');

let selectedField = null;

//objects
let allDices = [
  new Dice(0, false),
  new Dice(0, false),
  new Dice(0, false),
  new Dice(0, false),
  new Dice(0, false),
];

let game = new Yatzy(allDices);
const history = new History();

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
      selectedField = field;
      game.addResult(parseInt(selectedField.value), game.getResultIndex());
      sumPoints(field);
      disableField(field);
      resetRound();
      calculateSum(field);
      addBonus();
    } else if (game.getRollCount() === 0 && game.getRoundsCount() > 1) {
      const oldField = selectedField;
      selectedField = field;
      changeFieldValue(oldField, field);
    } else {
      showModal('Caution', "You can't select a textfield before rolling");
    }

    resetGame();
  });
});

modal.addEventListener('click', () => {
  modal.style.display = 'none';
});

historyButton.addEventListener('click', () => {
  if (history.getHistory().length > 0) {
    gameStatistics();
  } else {
    showModal('Not Found!', 'Not found any history of games');
  }
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
        ? (textfield.value = game.getroundResults()[index])
        : (textfield.value = 0);
    }
  });
};

const changeFieldValue = (oldField, newField) => {
  enableField(oldField);
  disableField(newField);
  reCalculateTotal(oldField, newField);
  reCalculateSum();
  addChangedResult(newField);
};

const addChangedResult = (newField) => {
  game.decrementResultIndex();
  game.addResult(parseInt(newField.value), game.getResultIndex());
};

const reCalculateTotal = (oldField, newField) => {
  game.setTotal(
    game.getTotal() - parseInt(oldField.value) + parseInt(newField.value)
  );
  totalTextField.value = game.getTotal();
};

const reCalculateSum = () => {
  game.setSum(0);
  textFields.forEach((field) => {
    calculateSum(field);
  });
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

const addBonus = () => {
  if (game.getSum() >= 63 && !game.getGotBonus()) {
    game.setGotBonus(true);
    game.setTotal(game.getTotal() + 50);
    bonusTextField.value = game.getBonus();
    totalTextField.value = game.getTotal();
  }
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

const enableField = (field) => {
  field.disabled = false;
  field.style.backgroundColor = '#000';
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
    history.addGame(game);

    setTimeout(() => {
      showModal(
        'Game Over',
        'Wanna play again? Press the button otherwise press anywhere else'
      );
    }, 1000);

    modalButton.addEventListener('click', () => {
      PlayAgain();
    });
  }
};

const PlayAgain = () => {
  allDices = [
    new Dice(0, false),
    new Dice(0, false),
    new Dice(0, false),
    new Dice(0, false),
    new Dice(0, false),
  ];
  game = new Yatzy(allDices);
  paragrafs[2].innerHTML = 'Round: ' + game.getRoundsCount() + '/15';
  sumTextField.value = '0';
  bonusTextField.value = '0';
  totalTextField.value = '0';
  clearTextAllTextFields();
  clearDices();
};

const clearTextAllTextFields = () => {
  textFields.forEach((field) => {
    field.style.backgroundColor = '#000';
    field.disabled = false;
    field.value = '';
  });
};

const clearDices = () => {
  dices.forEach((dice) => (dice.value = '?'));
};

const showModal = (heading, paragraf) => {
  modalHeading.innerHTML = heading;
  paragrafs[0].innerHTML = paragraf;
  modal.style.display = 'flex';
};

const gameStatistics = () => {
  const statistics = history.getHistory().map((game, index) => {
    return '' + (index + 1) + ',' + game.toString() + '\n';
  });

  alert(
    'Game number: ' + 'total: ' + 'sum: ' + 'got bonus: \n' + [...statistics]
  );
};
