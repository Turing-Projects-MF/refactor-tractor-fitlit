import Fitness from './Fitness'

class UserRepo extends Fitness {
  constructor(users) {
    super(users);
    this.users = users;
  }

  getDataFromID(id) {
    return this.users.find((user) => id === user.id);
  }

  getDataFromUserID(id, dataSet) {
    return this.filterDataByUserId(id, dataSet);
  }

  calculateAverageStepGoal(data, property) {
    return this.getAverage(data, property);
  }

  makeSortedUserArray(id, dataSet) {
    let selectedID = this.getDataFromUserID(id, dataSet);
    let sortedByDate = selectedID.sort((a, b) => new Date(b.date) - new Date(a.date));
    return sortedByDate;
  }

  getToday(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet)[0].date;
  }

  getFirstWeek(id, dataSet) {
    return this.makeSortedUserArray(id, dataSet).slice(0, 7);
  }

  getDateIndex(date, id, dataSet) {
    return this.makeSortedUserArray(id, dataSet)
      .indexOf(this.makeSortedUserArray(id, dataSet)
        .find((sortedItem) => (sortedItem.date === date)));
  }

  getWeekFromDate(date, id, dataSet) {
    let dateIndex = this.getDateIndex(date, id, dataSet);
    return this.makeSortedUserArray(id, dataSet).slice(dateIndex, dateIndex + 7);
  }

  chooseWeekDataForAllUsers(dataSet, date) {
    return dataSet.filter(dataItem => {
      return (new Date(date)).setDate((new Date(date)).getDate() - 7) <= new Date(dataItem.date) && new Date(dataItem.date) <= new Date(date);
    })
  }

  chooseDayDataForAllUsers(dataSet, date) {
    return dataSet.filter(dataItem => {
      return dataItem.date === date;
    });
  }

  isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod) {
    return listFromMethod.reduce((objectSoFar, dataItem) => {
      if (!objectSoFar[dataItem.userID]) {
        objectSoFar[dataItem.userID] = [dataItem[relevantData]];
      } else {
        objectSoFar[dataItem.userID].push(dataItem[relevantData]);
      }
      return objectSoFar;
    }, {});
  }

  rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod) {
    let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod);
    return Object.keys(sortedObjectKeys).sort((b, a) => {
      return (this.getAverage(sortedObjectKeys[a])) - (this.getAverage(sortedObjectKeys[b]));
    });
  }

  combineRankedUserIDsAndAveragedData(dataSet, date, relevantData, listFromMethod) {
    let sortedObjectKeys = this.isolateUsernameAndRelevantData(dataSet, date, relevantData, listFromMethod);
    let rankedUsersAndAverages = this.rankUserIDsbyRelevantDataValue(dataSet, date, relevantData, listFromMethod);
    return rankedUsersAndAverages.map(rankedUser => {
      return rankedUser = {
        [rankedUser]: this.getAverage(sortedObjectKeys[rankedUser])
      };
    });
  }
}

export default UserRepo;
