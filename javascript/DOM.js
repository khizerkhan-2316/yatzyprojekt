import Dice from './Dice.js';
import Yatzy from './Yatsy.js';

///// DOM

const rollButton = document.querySelectorAll('button')[1];
const playAgainButton = document.querySelector('button');
const errorModal = document.querySelector('.main-container');
const dices = document.querySelectorAll('.dice');
const checkboxes = document.querySelectorAll('.checkbox');
const paragrafs = document.querySelectorAll('p');
const textFields = document.querySelectorAll('.textfield');
const modalHeading = document.querySelector('h2');

const yatzy = new Yatzy();
//
let rolls = 0;
let rounds = 1;
let total = 0;
let gotBonus = false;

const objectDices = [
  new Dice(0, '', false),
  new Dice(1, '', false),
  new Dice(2, '', false),
  new Dice(3, '', false),
  new Dice(4, '', false),
];

rollButton.addEventListener('click', () => {
  rollDices();
});

textFields.forEach((field) => {
  field.addEventListener('click', () => {
    if (rolls >= 1) {
      sumPoints(field);
      field.disabled = true;
      field.style.backgroundColor = '#400000';
      field.classList.add('disabled');
      resetRound();
    } else {
      modalHeading.innerHTML = 'Caution';
      paragrafs[0].innerHTML = "You can't select a textfield before rolling";
      errorModal.style.display = 'flex';
    }

    const sum = calculateSum();

    console.log(sum);
    textFields[6].value = sum;

    if (sum >= 63 && !gotBonus) {
      gotBonus = true;
      total += 50;
      textFields[7].value = 50;
      textFields[17].value = total;
    }

    restartGame();
  });
});

const rollDices = () => {
  rolls++;
  updateDices();
  updateFields();
  rolls === 3 ? (rollButton.disabled = true) : (rollButton.disabled = false);
};

const updateDices = () => {
  rolls >= 1
    ? checkboxes.forEach((box) => (box.disabled = false))
    : checkboxes.forEach((box) => (box.disabled = true));

  paragrafs[1].innerHTML = 'Rolls: ' + rolls;
  let count = 2;
  objectDices.forEach((die, index) => {
    if (!isDieHolded(checkboxes[index])) {
      const randomnumber = Math.floor(Math.random() * 6 + 1);

      die.setValue(randomnumber);
      dices[index].value = randomnumber;
    }

    count++;
  });

  count = 0;
};

const isDieHolded = (checkbox) => {
  return checkbox.checked ? true : false;
};

const getResults = () => {
  // all functions which calculates the results should be here.
  const result = new Array(15);

  for (let i = 0; i <= 5; i++) {
    result[i] = checkSameFaceValue(i + 1);
  }

  result[8] = getHighestScoreByEqualFaces(2);
  result[9] = twoPairPoints();
  result[10] = getHighestScoreByEqualFaces(3);
  result[11] = getHighestScoreByEqualFaces(4);
  result[12] = fullHousePoints();
  result[13] = smallStraightPoints();
  result[14] = largestraightPoints();
  result[15] = chancePoints();
  result[16] = YatzyPoints();

  return result;
};

const updateFields = () => {
  textFields.forEach((textfield, index) => {
    if (!textfield.disabled && (index != 6 || index != 7)) {
      textfield.value !== undefined
        ? (textfield.value = getResults()[index])
        : (textfield.value = 0);
    }
  });
};

const checkSameFaceValue = (value) => {
  let points = 0;
  objectDices.forEach((dice) => {
    dice.getValue() === value ? (points += value) : 0;
  });

  return points;
};

const calculateSum = () => {
  let points = 0;
  for (let i = 0; i <= 5; i++) {
    if (textFields[i].disabled) {
      points += parseInt(textFields[i].value);
    }
  }

  return points;
};

const calcCounts = () => {
  const freq = new Array(7);
  objectDices.forEach((dice) => {
    freq[dice.value] === undefined
      ? (freq[dice.value] = 1)
      : (freq[dice.value] += 1);
  });

  return freq;
};

const getHighestScoreByEqualFaces = (equalfaces) => {
  return getHighestScoreByEqualFacess(equalfaces, false);
};

const getHighestScoreByEqualFacess = (equalfaces, exactly) => {
  const freq = calcCounts();

  let points = 0;

  for (let i = 1; i <= 6; i++) {
    if (
      (exactly && freq[i] === equalfaces) ||
      (!exactly && freq[i] >= equalfaces)
    ) {
      points = i * equalfaces;
    }
  }

  return points;
};

const twoPairPoints = () => {
  const freq = calcCounts();
  let sum = 0;
  let count = 0;

  freq.forEach((freq, index) => {
    if (freq >= 2) {
      sum += index * 2;
      count++;
    }
  });

  return count == 2 ? sum : 0;
};

const fullHousePoints = () => {
  let points = 0;
  let threeEquals = getHighestScoreByEqualFaces(3, true);
  let twoEquals = getHighestScoreByEqualFaces(2, true);

  if (threeEquals !== 0) {
    points += threeEquals;

    if (twoEquals !== 0) {
      points += twoEquals;
    }
  }

  return points;
};
const smallStraightPoints = () => {
  const freq = calcCounts();

  let points = 0; //

  for (let i = 1; i <= 5; i++) {
    if (freq[i] === 1) {
      points += i;
    } else {
      return 0;
    }
  }

  return points;
};
const largestraightPoints = () => {
  const freq = calcCounts();

  let points = 0; //

  for (let i = 2; i <= 6; i++) {
    if (freq[i] === 1) {
      points += i;
    } else {
      return 0;
    }
  }

  return points;
};
const chancePoints = () => {
  const freq = calcCounts();
  let points = 0;
  for (let i = 1; i <= 6; i++) {
    if (freq[i] !== undefined) {
      points += freq[i] * i;
    }
  }

  return points;
};

const YatzyPoints = () => {
  const points = getHighestScoreByEqualFaces(5, true);

  if (points > 0) {
    return 50;
  } else {
    return 0;
  }
};

const sumPoints = (field) => {
  total += parseInt(field.value);
  textFields[17].value = total;
};

const resetRound = () => {
  rounds++;
  rolls = 0;
  if (rounds <= 15) {
    paragrafs[2].innerHTML = 'Round: ' + rounds + '/15';
  }
  paragrafs[1].innerHTML = 'Rolls: ' + rolls;
  rollButton.disabled = false;
  objectDices.forEach((die, index) => {
    die.setValue(0);
    dices[index].value = '?';
    checkboxes[index].checked = false;
    checkboxes[index].disabled = true;
  });
};

const gameStatistics = () => {};

const checkGameOver = () => {
  let allDisabled = true;

  for (let i = 0; i < textFields.length; i++) {
    if (!textFields[i].disabled) {
      allDisabled = false;
    }
  }
  return allDisabled;
};
const restartGame = () => {
  if (checkGameOver()) {
    setTimeout(() => {
      modalHeading.innerHTML = 'Game Over';
      paragrafs[0].innerHTML =
        'Wanna play again? Press the button otherwise press anywhere else';
      errorModal.style.display = 'flex';
    }, 4000);

    playAgainButton.addEventListener('click', () => {
      PlayAgain();
    });
  }
};

const PlayAgain = () => {
  clearTextAllTextFields();
  rounds = 1;
  paragrafs[2].innerHTML = 'Round: ' + rounds + '/15';
};

const clearTextAllTextFields = () => {
  textFields.forEach((field, index) => {
    if (index !== 6 && index !== 7 && index !== 17) {
      field.style.backgroundColor = '#FFFFFF';
      field.disabled = false;
    }
    field.value = '';
  });
};

errorModal.addEventListener('click', () => {
  errorModal.style.display = 'none';
});
