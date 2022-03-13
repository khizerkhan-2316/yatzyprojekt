export default class Dice {
  constructor(value, isHold) {
    this.value = value;
    this.isHold = isHold;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
  }

  getIsHold() {
    return this.isHold;
  }

  setIsHold(isHold) {
    this.isHold = isHold;
  }
}
