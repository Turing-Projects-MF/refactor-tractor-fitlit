class Hydration {
  constructor(hydrationData) {
    this.hydrationData = hydrationData;
  }

  getAverageOfValues(data) {
    return data.reduce((total, value) => {
      total += value.numOunces;
      return total;
    }, 0) / data.length;
  }

  calculateAverageOunces(id) {
    let perDayUserHydration = this.hydrationData.filter((data) => id === data.userID);
    return this.getAverageOfValues(perDayUserHydration);
  }
  calculateDailyOunces(id, date) {
    let findOuncesByDate = this.hydrationData.find((data) => id === data.userID && date === data.date);
    return findOuncesByDate.numOunces;
  }
  calculateFirstWeekOunces(userRepo, id) {
    return userRepo.getFirstWeek(id, this.hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  }
  calculateRandomWeekOunces(date, id, userRepo) {
    return userRepo.getWeekFromDate(date, id, this.hydrationData).map((data) => `${data.date}: ${data.numOunces}`);
  }
}


export default Hydration;
