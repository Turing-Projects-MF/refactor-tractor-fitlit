class Fitness {
  constructor(data) {
    this.data = data;
  }

  getAverage(data, property = null) {
    return this.data.reduce((total, value) => {
      total += value[property];
      return total;
    }, 0) / data.length;
  }
}

export default Fitness;
