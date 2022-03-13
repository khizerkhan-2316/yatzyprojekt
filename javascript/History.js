class History {
  constructor() {
    this.history = [];
  }

  addGame(game) {
    this.history.push(game);
  }

  getHistory() {
    return this.history;
  }
}

export default History;
