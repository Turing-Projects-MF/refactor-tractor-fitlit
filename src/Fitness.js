class Fitness {
  constructor(data) {
    this.data = data;
  }

  getAverage(data, property = null) {
    return data.reduce((total, value) => {
      property === null ? total += value : total += value[property]
      return total;
    }, 0) / data.length;
  }
}

export default Fitness;
