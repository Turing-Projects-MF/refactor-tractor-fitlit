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

  getUserInfoByDateAndId(id, date, dataType) {
    return dataType.find(data => id === data.userID && date === data.date);
  }
}

export default Fitness;
