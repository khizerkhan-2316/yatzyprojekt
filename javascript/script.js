import Dice from './Dice.js';

// DOM
const dices = document.querySelectorAll('.dice');
const button = document.querySelectorAll('button');
const checkboxes = document.querySelectorAll('.checkbox');
const paragrafs = document.querySelectorAll('p');
const samefaceValues = document.querySelectorAll('.samefacevalue');
const textFields = document.querySelectorAll('.textfield');
const errorModal = document.querySelector('.main-container');

//
let turns = 0;
let rounds = 1;

const objectDices = [
  new Dice(0, '', false),
  new Dice(1, '', false),
  new Dice(2, '', false),
  new Dice(3, '', false),
  new Dice(4, '', false),
];

button[1].addEventListener('click', () => {
  rollDices();
});

textFields.forEach((field) => {
  field.addEventListener('click', () => {
    if (turns >= 1) {
      field.disabled = true;
      resetRound();
    } else {
      paragrafs[0].innerHTML = "You can't select a textfield before rolling";
      errorModal.style.display = 'flex';
    }
  });
});

const rollDices = () => {
  turns++;
  updateDices();
  updateFields();
  turns === 3 ? (button[1].disabled = true) : (button[1].disabled = false);
};

const updateDices = () => {
  turns >= 1
    ? checkboxes.forEach((box) => (box.disabled = false))
    : checkboxes.forEach((box) => (box.disabled = true));

  paragrafs[1].innerHTML = 'Turn: ' + turns;

  objectDices.forEach((die, index) => {
    if (!isDieHolded(checkboxes[index])) {
      const randomnumber = Math.floor(Math.random() * 6 + 1);
      die.setValue(randomnumber);
      dices[index].value = randomnumber;
    }
  });
};

const isDieHolded = (checkbox) => {
  return checkbox.checked ? true : false;
};

const updateFields = () => {};

const checkSameFaceValue = (value) => {
  let points = 0;
  objectDices.forEach((dice) => {
    dice.getValue() === value ? (points += value) : '';
  });

  return points;
};
const onePairPoints = () => {};
const twoPairPoints = () => {};
const threeSamePoints = () => {};
const fourSamePoints = () => {};
const fullHousePoints = () => {};
const smallStraightPoints = () => {};
const largestraightPoints = () => {};
const chancePoints = () => {};

const YatzyPoints = () => {};

const resetRound = () => {
  rounds++;
  turns = 0;
  paragrafs[2].innerHTML = 'Round: ' + rounds + '/13';
  paragrafs[1].innerHTML = 'Turn: ' + turns;
  button[1].disabled = false;
  objectDices.forEach((die, index) => {
    die.setValue(0);
    dices[index].value = '?';
    checkboxes[index].checked = false;
    checkboxes[index].disabled = true;
  });
};

errorModal.addEventListener('click', () => {
  errorModal.style.display = 'none';
});
