class Yatzy {
  constructor() {
    this.rollCount = 0;
    this.roundsCount = 1;
    this.total = 0;
    this.gotBonus = false;
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
}

export default Yatzy;
