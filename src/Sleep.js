//import sleepData from './data/sleep';
import Fitness from './Fitness';

class Sleep extends Fitness {
  constructor(sleepData) {
    super(sleepData)
    this.sleepData = sleepData;
  }

  filterSleepDataPerDay(id, dataType) {
    return this.filterDataByUserId(id, dataType);
  }

  calculateAverageSleep(id, dataType) {
    let perDaySleep = this.filterSleepDataPerDay(id, dataType);
    return this.getAverage(perDaySleep, "hoursSlept");
  }

  calculateAverageSleepQuality(id, dataType) {
    let perDaySleepQuality = this.filterSleepDataPerDay(id, dataType);
    return this.getAverage(perDaySleepQuality, "sleepQuality");
  }

  findSleepDataByDate(id, date) {
    return this.getUserInfoByDateAndId(id, date, this.sleepData)
  }

  calculateDailySleep(id, date) {
    let findSleepByDate = this.findSleepDataByDate(id, date);
    return findSleepByDate.hoursSlept;
  }

  calculateDailySleepQuality(id, date) {
    let findSleepQualityByDate = this.findSleepDataByDate(id, date);
    return findSleepQualityByDate.sleepQuality;
  }

  calculateWeekSleep(date, id, userRepo) {
    return userRepo.getWeekFromDate(date, id, this.sleepData).map((data) => `${data.date}: ${data.hoursSlept}`);
  }

  calculateWeekSleepQuality(date, id, userRepo) {
    return userRepo.getWeekFromDate(date, id, this.sleepData).map((data) => `${data.date}: ${data.sleepQuality}`);
  }

  calculateAllUserSleepQuality() {
    var totalSleepQuality = this.getAverage(this.sleepData, "sleepQuality");
    return totalSleepQuality;
  }

  getUserSleepObject(date, userRepo, sleepProperty) {
    let timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
    let userSleepObject = userRepo.combineRankedUserIDsAndAveragedData(this.sleepData, date, sleepProperty, timeline);
    return userSleepObject;
  }

  getUserNames(userSleepObject, userRepo) {
    return Object.keys(userSleepObject).filter((key) => {
      return this.getAverage(userSleepObject[key]) > 3;
    }).map((sleeper) => {
      return userRepo.getDataFromID(parseInt(sleeper)).name;
    })
  }

  determineBestSleepers(date, userRepo, property) {
    let timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
    let userSleepObject = userRepo.isolateUsernameAndRelevantData(this.sleepData, date, property, timeline);
    return this.getUserNames(userSleepObject, userRepo)
  }

  determineSleepWinnerForWeek(date, userRepo, property) {
    let sleepRankWithData = this.getUserSleepObject(date, userRepo, property);
    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }

  determineSleepHoursWinnerForDay(date, userRepo, property) {
    let sleepRankWithData = this.getUserSleepObject(date, userRepo, property);
    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }

  getBestResults(sortedArray) {
    return sortedArray.filter(element => {
      return element[Object.keys(element)] === Object.values(sortedArray[0])[0]
    });
  }

  getSleepersIds(bestSleepers) {
    return bestSleepers.map(bestSleeper => {
      return (Object.keys(bestSleeper));
    });
  }

  getWinnerNamesFromList(sortedArray, userRepo) {
    let bestSleepers = this.getBestResults(sortedArray);
    let bestSleeperIds = this.getSleepersIds(bestSleepers);
    return bestSleeperIds.map(sleepNumber => {
      return userRepo.getDataFromID(parseInt(sleepNumber)).name;
    });
  }
}

export default Sleep;
