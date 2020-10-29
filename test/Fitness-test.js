import { expect } from 'chai';

import Fitness from '../src/Fitness';

describe('Fitness', function() {
  it('should get average data of the provided data', function() {
    const sleepData = [{
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

    const fitness = new Fitness(sleepData);

    expect(fitness.getAverage(fitness.data, 'hoursSlept').toFixed(2)).to.eql('7.23')
  });

  it('should return user info by date and id', function() {

    let activityData = [{
        "userID": 1,
        "date": "2019/06/15",
        "numSteps": 3577,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 2,
        "date": "2019/06/14",
        "numSteps": 4294,
        "minutesActive": 138,
        "flightsOfStairs": 10
      },
      {
        "userID": 3,
        "date": "2019/06/13",
        "numSteps": 7402,
        "minutesActive": 116,
        "flightsOfStairs": 33
      },
      {
        "userID": 4,
        "date": "2019/06/12",
        "numSteps": 3486,
        "minutesActive": 114,
        "flightsOfStairs": 32
      },
      {
        "userID": 1,
        "date": "2019/06/14",
        "numSteps": 11374,
        "minutesActive": 213,
        "flightsOfStairs": 13
      },
      {
        "userID": 2,
        "date": "2019/06/13",
        "numSteps": 14810,
        "minutesActive": 287,
        "flightsOfStairs": 18
      },
      {
        "userID": 3,
        "date": "2019/06/12",
        "numSteps": 2634,
        "minutesActive": 107,
        "flightsOfStairs": 5
      },
      {
        "userID": 4,
        "date": "2019/06/11",
        "numSteps": 10333,
        "minutesActive": 114,
        "flightsOfStairs": 31
      },
      {
        "userID": 1,
        "date": "2019/06/02",
        "numSteps": 6389,
        "minutesActive": 41,
        "flightsOfStairs": 33
      },
      {
        "userID": 2,
        "date": "2019/06/03",
        "numSteps": 8015,
        "minutesActive": 106,
        "flightsOfStairs": 37
      },
      {
        "userID": 3,
        "date": "2019/06/19",
        "numSteps": 11652,
        "minutesActive": 20,
        "flightsOfStairs": 24
      },
      {
        "userID": 4,
        "date": "2019/06/15",
        "numSteps": 9256,
        "minutesActive": 108,
        "flightsOfStairs": 2
      },
      {
        "userID": 1,
        "date": "2019/06/16",
        "numSteps": 3578,
        "minutesActive": 140,
        "flightsOfStairs": 16
      },
      {
        "userID": 1,
        "date": "2019/06/17",
        "numSteps": 3579,
        "minutesActive": 141,
        "flightsOfStairs": 16
      },
      {
        "userID": 1,
        "date": "2019/06/18",
        "numSteps": 3580,
        "minutesActive": 142,
        "flightsOfStairs": 16
      }
    ];

    const fitness = new Fitness(activityData);

    expect(fitness.getUserInfoByDateAndId(1, "2019/06/15", activityData)).to.eql({
      userID: 1,
      date: '2019/06/15',
      numSteps: 3577,
      minutesActive: 140,
      flightsOfStairs: 16
    });
  });
})
