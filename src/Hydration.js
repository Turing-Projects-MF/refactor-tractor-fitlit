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

  getOuncesPerDay(loggedData) {
    return loggedData.map((data) => `${data.date}: ${data.numOunces}`);
  }

  calculateFirstWeekOunces(userRepo, id) {
    let weeklyOunces = userRepo.getFirstWeek(id, this.hydrationData);
    return this.getOuncesPerDay(weeklyOunces);
  }

  calculateRandomWeekOunces(date, id, userRepo) {
    let randomWeekOunces = userRepo.getWeekFromDate(date, id, this.hydrationData);
    return this.getOuncesPerDay(randomWeekOunces);
  }
}


export default Hydration;
