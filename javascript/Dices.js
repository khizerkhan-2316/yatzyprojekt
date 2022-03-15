import Die from './Die.js';
// Logic for dices and calculting results for dices
class Dices {
  _dices;

  constructor() {
    this._dices = [
      new Die(0, false),
      new Die(0, false),
      new Die(0, false),
      new Die(0, false),
      new Die(0, false),
    ];
  }

  rollDices() {
    this._dices.forEach((die, index) => {
      if (!die.getIsHold()) {
        const randomnumber = Math.floor(Math.random() * 6 + 1);
        die.setValue(randomnumber);
      }
    });
  }

  getAllDices() {
    return this._dices;
  }

  calcCounts() {
    const freq = new Array(7);
    this._dices.forEach((dice) => {
      freq[dice.value] === undefined
        ? (freq[dice.value] = 1)
        : (freq[dice.value] += 1);
    });

    return freq;
  }

  checkSameFaceValue(value) {
    return this._dices
      .map((dice) => {
        return dice.getValue() === value ? value : 0;
      })
      .reduce((a, b) => a + b, 0);
  }

  getHighestScoreByEqualFaces(equalfaces) {
    return this.getHighestScoreByEqualFacesHelper(equalfaces, false);
  }

  getHighestScoreByEqualFacesHelper(equalfaces, exactly) {
    const freq = this.calcCounts();

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
  }

  twoPairPoints() {
    const freq = this.calcCounts();
    let sum = 0;
    let count = 0;

    freq.map((freq, index) => {
      if (freq >= 2) {
        sum += index * 2;
        count++;
      }
    });

    return count == 2 ? sum : 0;
  }

  fullHousePoints() {
    let points = 0;
    let threeEquals = this.getHighestScoreByEqualFaces(3, true);
    let twoEquals = this.getHighestScoreByEqualFaces(2, true);

    if (threeEquals !== 0) {
      points += threeEquals;

      if (twoEquals !== 0) {
        points += twoEquals;
      }
    }

    return points;
  }

  smallStraightPoints() {
    // maybe refactor
    const freq = this.calcCounts();

    let points = 0; //

    for (let i = 1; i <= 5; i++) {
      if (freq[i] === 1) {
        points += i;
      } else {
        return 0;
      }
    }

    return points;
  }

  largestraightPoints() {
    const freq = this.calcCounts();

    let points = 0; //

    for (let i = 2; i <= 6; i++) {
      if (freq[i] === 1) {
        points += i;
      } else {
        return 0;
      }
    }

    return points;
  }

  chancePoints() {
    const freq = this.calcCounts();
    let points = 0;

    for (let i = 1; i <= 6; i++) {
      freq[i] !== undefined ? (points += freq[i] * i) : 0;
    }
    return points;
  }

  yatzyPoints() {
    const points = this.getHighestScoreByEqualFaces(5, true);
    return points > 0 ? 50 : 0;
  }
}

export default Dices;
