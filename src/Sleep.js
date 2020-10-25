import sleepData from './data/sleep';

class Sleep {
  constructor(sleepData) {
    this.sleepData = sleepData;
  }

  getAverageOfValues(data, sleepProperty = null) {
    return data.reduce((total, value) => {
      return sleepProperty === null ? total += value : total += value[sleepProperty]
    }, 0) / data.length;
  }

  filterSleepDataPerDay(id) {
    return this.sleepData.filter((data) => id === data.userID);
  }

  calculateAverageSleep(id) {
    let perDaySleep = this.filterSleepDataPerDay(id);
    return this.getAverageOfValues(perDaySleep, "hoursSlept");
  }

  calculateAverageSleepQuality(id) {
    let perDaySleepQuality = this.filterSleepDataPerDay(id);
    return this.getAverageOfValues(perDaySleepQuality, "sleepQuality");
  }

  findSleepDataByDate(id, date) {
    return this.sleepData.find((data) => id === data.userID && date === data.date);
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
    var totalSleepQuality = this.getAverageOfValues(this.sleepData, "sleepQuality");
    return totalSleepQuality;
  }

  getUserSleepObject(date, userRepo, sleepProperty) {
    let timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
    let userSleepObject = userRepo.combineRankedUserIDsAndAveragedData(this.sleepData, date, sleepProperty, timeline);
    return userSleepObject;
  }

  getUserNames(userSleepObject, userRepo) {
    return Object.keys(userSleepObject).filter((key) => {
      return this.getAverageOfValues(userSleepObject[key]) > 3;
    }).map((sleeper) => {
      return userRepo.getDataFromID(parseInt(sleeper)).name;
    })
  }

  determineBestSleepers(date, userRepo) {
    let timeline = userRepo.chooseWeekDataForAllUsers(this.sleepData, date);
    let userSleepObject = userRepo.isolateUsernameAndRelevantData(this.sleepData, date, "sleepQuality", timeline);
    return this.getUserNames(userSleepObject, userRepo)
  }

  determineSleepWinnerForWeek(date, userRepo) {
    let sleepRankWithData = this.getUserSleepObject(date, userRepo, "sleepQuality");
    return this.getWinnerNamesFromList(sleepRankWithData, userRepo);
  }

  determineSleepHoursWinnerForDay(date, userRepo) {
    let sleepRankWithData = this.getUserSleepObject(date, userRepo, "hoursSlept")
    console.log(sleepRankWithData);
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
