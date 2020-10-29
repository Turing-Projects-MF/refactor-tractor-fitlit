import Fitness from './Fitness';

class Hydration extends Fitness {
  constructor(hydrationData) {
    super(hydrationData)
      this.hydrationData = hydrationData;
  }

  calculateAverageOunces(id, dataType) {
    let perDayUserHydration = this.filterDataByUserId(id, dataType);
    return this.getAverage(perDayUserHydration, 'numOunces').toFixed(0);
  }

  calculateDailyOunces(id, date) {
    let findOuncesByDate = this.getUserInfoByDateAndId(id, date, this.hydrationData)
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
