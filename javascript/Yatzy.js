class Yatzy {
  constructor(dices) {
    this.rollCount = 0;
    this.roundsCount = 1;
    this.total = 0;
    this.gotBonus = false;
    this.bonus = 50;
    this.sum = 0;
    this.dices = dices;
    this.results = new Array(15);
    this.history = [];
  }

  incrementRollCount() {
    this.rollCount++;
  }

  setRollCount(rollCount) {
    this.rollCount = rollCount;
  }

  getRollCount() {
    return this.rollCount;
  }

  incrementRoundsCount() {
    this.roundsCount++;
  }

  setRoundsCount(roundsCount) {
    this.roundsCount = roundsCount;
  }

  getRoundsCount() {
    return this.roundsCount;
  }

  setTotal(total) {
    this.total = total;
  }

  getTotal() {
    return this.total;
  }

  setGotBonus(boolean) {
    this.gotBonus = boolean;
  }

  getGotBonus() {
    return this.gotBonus;
  }

  getBonus() {
    return this.bonus;
  }

  setSum(sum) {
    this.sum = sum;
  }

  getSum() {
    return this.sum;
  }

  rollDices() {
    this.incrementRollCount();
    this.dices.forEach((die) => {
      if (!die.getIsHold()) {
        const randomnumber = Math.floor(Math.random() * 6 + 1);
        die.setValue(randomnumber);
      }
    });
  }

  calcCounts() {
    const freq = new Array(7);
    this.dices.forEach((dice) => {
      freq[dice.value] === undefined
        ? (freq[dice.value] = 1)
        : (freq[dice.value] += 1);
    });

    return freq;
  }

  setResults() {
    for (let i = 0; i <= 5; i++) {
      this.results[i] = this.checkSameFaceValue(i + 1);
    }

    this.results[6] = this.getHighestScoreByEqualFaces(2);
    this.results[7] = this.twoPairPoints();
    this.results[8] = this.getHighestScoreByEqualFaces(3);
    this.results[9] = this.getHighestScoreByEqualFaces(4);
    this.results[10] = this.fullHousePoints();
    this.results[11] = this.smallStraightPoints();
    this.results[12] = this.largestraightPoints();
    this.results[13] = this.chancePoints();
    this.results[14] = this.yatzyPoints();
  }

  getResults() {
    this.setResults();
    return this.results;
  }

  checkSameFaceValue(value) {
    let points = 0;
    this.dices.forEach((dice) => {
      dice.getValue() === value ? (points += value) : 0;
    });

    return points;
  }

  getHighestScoreByEqualFaces(equalfaces) {
    return this.getHighestScoreByEqualFacesHelper(equalfaces, false); // kaldes getHighestScoreByEqualFacess
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

    freq.forEach((freq, index) => {
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
      if (freq[i] !== undefined) {
        points += freq[i] * i;
      }
    }

    return points;
  }

  yatzyPoints() {
    const points = this.getHighestScoreByEqualFaces(5, true);

    if (points > 0) {
      return 50;
    } else {
      return 0;
    }
  }

  resetRound() {
    this.incrementRoundsCount();
    this.setRollCount(0);
  }

  resetGame() {
    this.setRoundsCount(1);
    this.setRollCount(0);
    this.setTotal(0);
    this.setGotBonus(false);
    this.setSum(0);
    this.results = new Array(15);
  }
}

export default Yatzy;
