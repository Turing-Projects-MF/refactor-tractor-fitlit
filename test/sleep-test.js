import { expect } from 'chai';

import Sleep from '../src/Sleep';
import UserRepo from '../src/User-repo';
import User from '../src/User';

describe('Sleep', function() {
  let sleepData;
  let sleep;
  let user1;
  let user2;
  let user3;
  let user4;
  let user5;
  let user6;
  let users;
  let userRepo;

  beforeEach(function() {
    sleepData = [{
        "userID": 1,
        "date": "2017/06/15",
        "hoursSlept": 6.1,
        "sleepQuality": 2.2
      },
      {
        "userID": 2,
        "date": "2017/06/15",
        "hoursSlept": 7,
        "sleepQuality": 4.7
      },
      {
        "userID": 3,
        "date": "2017/06/15",
        "hoursSlept": 2,
        "sleepQuality": 3
      },
      {
        "userID": 4,
        "date": "2017/06/15",
        "hoursSlept": 5.4,
        "sleepQuality": 3
      },
      {
        "userID": 1,
        "date": "2018/07/15",
        "hoursSlept": 4.1,
        "sleepQuality": 3.6
      },
      {
        "userID": 2,
        "date": "2018/07/15",
        "hoursSlept": 9.6,
        "sleepQuality": 2.9
      },
      {
        "userID": 3,
        "date": "2018/07/15",
        "hoursSlept": 2,
        "sleepQuality": 3
      },
      {
        "userID": 4,
        "date": "2018/07/23",
        "hoursSlept": 8.1,
        "sleepQuality": 3.5
      },
      {
        "userID": 1,
        "date": "2019/05/30",
        "hoursSlept": 8.9,
        "sleepQuality": 2.2
      },
      {
        "userID": 2,
        "date": "2019/05/30",
        "hoursSlept": 4.4,
        "sleepQuality": 1.6
      },
      {
        "userID": 3,
        "date": "2019/05/30",
        "hoursSlept": 4,
        "sleepQuality": 1
      },
      {
        "userID": 4,
        "date": "2019/05/30",
        "hoursSlept": 8,
        "sleepQuality": 3.4
      },
      {
        "userID": 1,
        "date": "2019/08/22",
        "hoursSlept": 10.1,
        "sleepQuality": 1.8
      },
      {
        "userID": 2,
        "date": "2019/08/22",
        "hoursSlept": 6.9,
        "sleepQuality": 1.2
      },
      {
        "userID": 3,
        "date": "2019/08/22",
        "hoursSlept": 4,
        "sleepQuality": 1
      },
      {
        "userID": 4,
        "date": "2019/06/21",
        "hoursSlept": 6.1,
        "sleepQuality": 3.5
      },
      {
        "userID": 4,
        "date": "2019/06/20",
        "hoursSlept": 4.7,
        "sleepQuality": 4
      },
      {
        "userID": 4,
        "date": "2019/06/19",
        "hoursSlept": 10.1,
        "sleepQuality": 1.3
      },
      {
        "userID": 4,
        "date": "2019/06/18",
        "hoursSlept": 7.9,
        "sleepQuality": 1.6
      },
      {
        "userID": 4,
        "date": "2019/06/17",
        "hoursSlept": 5.9,
        "sleepQuality": 1.6
      },
      {
        "userID": 4,
        "date": "2019/06/16",
        "hoursSlept": 9.6,
        "sleepQuality": 1
      },
      {
        "userID": 4,
        "date": "2019/06/15",
        "hoursSlept": 9,
        "sleepQuality": 3.1
      },
      {
        "userID": 2,
        "date": "2019/06/21",
        "hoursSlept": 6.1,
        "sleepQuality": 3.5
      },
      {
        "userID": 2,
        "date": "2019/06/20",
        "hoursSlept": 4.7,
        "sleepQuality": 4
      },
      {
        "userID": 2,
        "date": "2019/06/19",
        "hoursSlept": 10.1,
        "sleepQuality": 3.3
      },
      {
        "userID": 2,
        "date": "2019/06/18",
        "hoursSlept": 7.9,
        "sleepQuality": 3.6
      },
      {
        "userID": 2,
        "date": "2019/06/17",
        "hoursSlept": 5.9,
        "sleepQuality": 3.6
      },
      {
        "userID": 2,
        "date": "2019/06/16",
        "hoursSlept": 9.6,
        "sleepQuality": 4
      },
      {
        "userID": 2,
        "date": "2019/06/15",
        "hoursSlept": 9,
        "sleepQuality": 3.1
      },
      {
        "userID": 5,
        "date": "2019/06/21",
        "hoursSlept": 9,
        "sleepQuality": 4
      },
      {
        "userID": 5,
        "date": "2019/06/20",
        "hoursSlept": 8,
        "sleepQuality": 4
      },
      {
        "userID": 5,
        "date": "2019/06/19",
        "hoursSlept": 10,
        "sleepQuality": 4
      },
      {
        "userID": 5,
        "date": "2019/06/18",
        "hoursSlept": 9,
        "sleepQuality": 4
      },
      {
        "userID": 5,
        "date": "2019/06/17",
        "hoursSlept": 8,
        "sleepQuality": 4
      },
      {
        "userID": 5,
        "date": "2019/06/16",
        "hoursSlept": 10,
        "sleepQuality": 4
      },
      {
        "userID": 5,
        "date": "2019/06/15",
        "hoursSlept": 9,
        "sleepQuality": 4
      }
    ];

    sleep = new Sleep(sleepData);
    user1 = new User({
      id: 1,
      name: "Alex Roth",
      address: "1234 Turing Street, Denver CO 80301-1697",
      email: "alex.roth1@hotmail.com",
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [2, 3, 4]
    });
    user2 = new User({
      id: 2,
      name: "Allie McCarthy",
      address: "1235 Turing Street, Denver CO 80301-1697",
      email: "allie.mcc1@hotmail.com",
      strideLength: 3.3,
      dailyStepGoal: 9000,
      friends: [1, 3, 4]
    });
    user3 = new User({
      id: 3,
      name: "The Rock",
      address: "1236 Awesome Street, Denver CO 80301-1697",
      email: "therock@hotmail.com",
      strideLength: 10,
      dailyStepGoal: 60000,
      friends: [1, 2, 4]
    });

    user4 = new User({
      id: 4,
      name: "Rainbow Dash",
      address: "1237 Equestria Street, Denver CO 80301-1697",
      email: "rainbowD1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });

    user5 = new User({
      id: 5,
      name: "Bugs Bunny",
      address: "1234 Looney Street, Denver CO 80301-1697",
      email: "BugsB1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });

    user6 = new User({
      id: 6,
      name: "Richmond",
      address: "1234 Looney Street, Denver CO 80301-1697",
      email: "BugsB1@hotmail.com",
      strideLength: 3.8,
      dailyStepGoal: 7000,
      friends: [1, 2, 3]
    });


    users = [user1, user2, user3, user4, user5, user6];
    userRepo = new UserRepo(users);
  });

  // it('should get average data of the provided data', function() {
  //   expect(sleep.getAverageOfValues(sleepData, "hoursSlept").toFixed(2)).to.eql('7.23');
  // });

  it('should filter sleep data by date', function() {
    expect(sleep.filterSleepDataPerDay(1, sleep.sleepData)).to.deep.eql([
      { userID: 1, date: '2017/06/15', hoursSlept: 6.1, sleepQuality: 2.2 },
      { userID: 1, date: '2018/07/15', hoursSlept: 4.1, sleepQuality: 3.6 },
      { userID: 1, date: '2019/05/30', hoursSlept: 8.9, sleepQuality: 2.2 },
      { userID: 1, date: '2019/08/22', hoursSlept: 10.1, sleepQuality: 1.8
      }
    ]);
  });

  it('should take in a list of data', function() {
    expect(sleep.sleepData[0]).to.deep.equal({
        "userID": 1,
        "date": "2017/06/15",
        "hoursSlept": 6.1,
        "sleepQuality": 2.2
      });
  });

  it('should find the average sleep hours per day for a user', function() {
    expect(sleep.calculateAverageSleep(3, sleep.sleepData)).to.equal(3);
  });

  it('should find sleep data by date', function() {
    expect(sleep.findSleepDataByDate(1, "2017/06/15")).to.deep.equal({
        "userID": 1,
        "date": "2017/06/15",
        "hoursSlept": 6.1,
        "sleepQuality": 2.2
      });
  });

  it('should find the average sleep quality per day for a user', function() {
    expect(sleep.calculateAverageSleepQuality(3, sleep.sleepData)).to.equal(2);
  });

  it('should find the sleep hours for a user on a specified date', function() {
    expect(sleep.calculateDailySleep(2, "2017/06/15")).to.equal(7);
  });

  it('should find the sleep quality for a user on a specified date', function() {
    expect(sleep.calculateDailySleepQuality(2, "2017/06/15")).to.equal(4.7);
  });

  it('should find sleep by day for that days week', function() {
    expect(sleep.calculateWeekSleep('2019/06/18', 4, userRepo)[0]).to.eql('2019/06/18: 7.9');
  })

  it('should find sleep quality by day for that days week', function() {
    expect(sleep.calculateWeekSleepQuality('2019/06/18', 4, userRepo)[0]).to.eql('2019/06/18: 1.6');
  })

  it('should calculate all users sleep quality', function() {
    expect(sleep.calculateAllUserSleepQuality().toFixed(2)).to.eql("2.98");
  })

  it('should return user names', function() {
    let sleepyObject = {
      '2': [
        3.5, 4, 3.3, 3.6,
        3.6, 4, 3.1
      ],
      '4': [
        3.5, 4, 1.3, 1.6,
        1.6, 1, 3.1
      ],
      '5': [
        4, 4, 4, 4,
        4, 4, 4
      ]
    }
    expect(sleep.getUserNames(sleepyObject, userRepo)).to.deep.eql([ 'Allie McCarthy', 'Bugs Bunny' ]);
  })

  it('should get a users sleep data', function() {
    expect(sleep.getUserSleepObject("2019/06/21", userRepo, "sleepQuality")).to.deep.eql([
       {
         "5": 4
       },
       {
         "2": 3.585714285714286
       },
       {
         "4": 2.3000000000000003
       }]);
  })

  it('should determine the best quality sleepers for a week', function() {
    expect(sleep.determineBestSleepers("2019/06/21", userRepo, 'sleepQuality')).to.eql(["Allie McCarthy", "Bugs Bunny"]);
  })

  it('should return person with best quality sleep for the week', function() {
    expect(sleep.determineSleepWinnerForWeek("2019/06/21", userRepo, 'sleepQuality')).to.deep.eql(["Bugs Bunny"]);
  })

  it('should return all qualifying users if best quality sleep is a tie', function() {
    sleepData = sleepData.push({
      "userID": 6,
      "date": "2019/06/15",
      "hoursSlept": 9,
      "sleepQuality": 4
    })
    expect(sleep.determineSleepWinnerForWeek("2019/06/21", userRepo, 'sleepQuality')).to.eql(["Bugs Bunny", "Richmond"]);
  })

  it('should return person with longest sleep for the day', function() {
    expect(sleep.determineSleepHoursWinnerForDay('2019/06/21', userRepo, 'hoursSlept')).to.eql(["Bugs Bunny"]);
  })

  it('should return all qualifying users if longest sleep is a tie', function() {
    sleepData = sleepData.push({
      "userID": 6,
      "date": "2019/06/21",
      "hoursSlept": 9,
      "sleepQuality": 4
    })
    expect(sleep.determineSleepHoursWinnerForDay('2019/06/21', userRepo, 'hoursSlept')).to.deep.eql(["Bugs Bunny", "Richmond"]);
  })
  //make this test fail when user is NOT best in week

  it('should return the best sleepers', function() {
    let sortedArray = [
      { '5': 9 },
      { '6': 9 },
      { '2': 7.614285714285714 },
      { '4': 7.614285714285714 }
    ]
    expect(sleep.getBestResults(sortedArray)).to.deep.equal([{ '5': 9 }, { '6': 9 }]);
  })

  it('should return best sleeper id', function() {
    let bestSleepers = [{ '5': 9 }, { '6': 9 }];
    expect(sleep.getSleepersIds(bestSleepers)).to.deep.equal([["5"], ["6"]]);
  })

  it('should return best sleeper names', function() {
    let sortedArray = [
      { '5': 9 },
      { '6': 9 }
    ]
    expect(sleep.getWinnerNamesFromList(sortedArray, userRepo)).to.deep.equal(["Bugs Bunny", "Richmond"]);
  })
});
