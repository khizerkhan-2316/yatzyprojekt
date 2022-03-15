class Yatzy {
  constructor(dices) {
    this.rollCount = 0;
    this.roundsCount = 1;
    this.total = 0;
    this.gotBonus = false;
    this.bonus = 50;
    this.sum = 0;
    this.dices = dices;
    this.roundResults = new Array(15);
    this.results = new Array(15);
    this.resultIndex = 0;
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

  addResult(result, index) {
    this.results[index] = result;
    this.resultIndex++;
  }

  getResults() {
    return this.results;
  }

  getResultIndex() {
    return this.resultIndex;
  }

  decrementResultIndex() {
    this.resultIndex--;
  }

  rollDices() {
    this.incrementRollCount();
    this.dices.forEach((die, index) => {
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

  setroundResults() {
    for (let i = 0; i <= 5; i++) {
      this.roundResults[i] = this.checkSameFaceValue(i + 1);
    }

    this.roundResults[6] = this.getHighestScoreByEqualFaces(2);
    this.roundResults[7] = this.twoPairPoints();
    this.roundResults[8] = this.getHighestScoreByEqualFaces(3);
    this.roundResults[9] = this.getHighestScoreByEqualFaces(4);
    this.roundResults[10] = this.fullHousePoints();
    this.roundResults[11] = this.smallStraightPoints();
    this.roundResults[12] = this.largestraightPoints();
    this.roundResults[13] = this.chancePoints();
    this.roundResults[14] = this.yatzyPoints();
  }

  getroundResults() {
    this.setroundResults();
    return this.roundResults;
  }

  checkSameFaceValue(value) {
    return this.dices
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
    // maybe refactor and check if its correct result
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
    // maybe refactor
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

  resetRound() {
    this.incrementRoundsCount();
    this.setRollCount(0);
  }

  toString() {
    return [this.total, this.sum, this.gotBonus];
  }
}

export default Yatzy;
