export default class Dice {
  constructor(index, value, isHold) {
    this.index = index;
    this.value = value;
    this.isHold = isHold;
  }

  getIndex() {
    return this.index;
  }

  setIndex(index) {
    this.index = index;
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
