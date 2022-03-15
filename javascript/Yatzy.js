import Dices from './Dices.js';
// Logic for all other stuff
class Yatzy {
  _rollCount;
  _roundsCount;
  _total;
  _gotBonus;
  _bonus;
  _sum;
  _dices;
  _roundResults;
  _results;
  _resultIndex;

  constructor() {
    this._rollCount = 0;
    this._roundsCount = 1;
    this._total = 0;
    this._gotBonus = false;
    this._bonus = 50;
    this._sum = 0;
    this._dices = new Dices();
    this._roundResults = new Array(15);
    this._results = new Array(15);
    this._resultIndex = 0;
  }

  incrementRollCount() {
    this._rollCount++;
  }

  setRollCount(rollCount) {
    this._rollCount = rollCount;
  }

  getRollCount() {
    return this._rollCount;
  }

  incrementRoundsCount() {
    this._roundsCount++;
  }

  setRoundsCount(roundsCount) {
    this._roundsCount = roundsCount;
  }

  getRoundsCount() {
    return this._roundsCount;
  }

  setTotal(total) {
    this._total = total;
  }

  getTotal() {
    return this._total;
  }

  setGotBonus(boolean) {
    this._gotBonus = boolean;
  }

  getGotBonus() {
    return this._gotBonus;
  }

  getBonus() {
    return this._bonus;
  }

  setSum(sum) {
    this._sum = sum;
  }

  getSum() {
    return this._sum;
  }

  getAllDices() {
    return this._dices.getAllDices();
  }

  addResult(result, index) {
    this._results[index] = result;
    this._resultIndex++;
  }

  getresults() {
    return this._results;
  }

  getResultIndex() {
    return this._resultIndex;
  }

  decrementResultIndex() {
    this._resultIndex--;
  }

  rollDices() {
    this.incrementRollCount();
    this._dices.rollDices();
  }

  setRoundResults() {
    for (let i = 0; i <= 5; i++) {
      this._roundResults[i] = this._dices.checkSameFaceValue(i + 1);
    }

    this._roundResults[6] = this._dices.getHighestScoreByEqualFaces(2);
    this._roundResults[7] = this._dices.twoPairPoints();
    this._roundResults[8] = this._dices.getHighestScoreByEqualFaces(3);
    this._roundResults[9] = this._dices.getHighestScoreByEqualFaces(4);
    this._roundResults[10] = this._dices.fullHousePoints();
    this._roundResults[11] = this._dices.smallStraightPoints();
    this._roundResults[12] = this._dices.largestraightPoints();
    this._roundResults[13] = this._dices.chancePoints();
    this._roundResults[14] = this._dices.yatzyPoints();
  }

  getroundResults() {
    this.setRoundResults();
    return this._roundResults;
  }

  resetRound() {
    this.incrementRoundsCount();
    this.setRollCount(0);
  }

  toString() {
    return [this._total, this._sum, this._gotBonus];
  }
}

export default Yatzy;
