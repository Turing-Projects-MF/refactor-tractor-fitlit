const chai = require('chai')
const spies = require('chai-spies');

chai.use(spies);

const expect = chai.expect;
const domDisplay = require('../src/dom-display');


describe('domDisplay', function() {
  let id,
      user,
      userStorage,
      activityInfo,
      hydrationInfo,
      sleepInfo,
      dateString,
      laterDateString,
      method,
      winnerId;

  before(function() {
    global.domDisplay = {};
    chai.spy.on(domDisplay, [
      'displaySidebarDetails',
      'displayUserSidebar',
      'makeFriendHTML',
      'addHydrationInfo',
      'makeHydrationHTML',
      'addSleepInfo',
      'makeSleepHTML',
      'addWeeklyStepInfo',
      'addUserTodayStepDetails',
      'addUserAvgStepDetails',
      'makeStepsHTML',
      'makeStairsHTML',
      'makeMinutesHTML',
      'addFriendGameInfo',
      'makeFriendChallengeHTML',
      'makeStepStreakHTML'
    ], () => {})
  });

    beforeEach(function() {
      id = 1;
      user = {};
      userStorage = [];
      activityInfo = [];
      hydrationInfo = [];
      sleepInfo = [];
      dateString = '';
      laterDateString = '';
      method = () => {};
      winnerId = 1;
  });

    it('should be able to display details on the sidebar', function() {
      domDisplay.displaySidebarDetails(user);

      expect(domDisplay.displaySidebarDetails).to.have.been.called(1);
      expect(domDisplay.displaySidebarDetails).to.have.been.called.with(user);
    });

    it('should be able to display user data on the sidebar', function() {
      domDisplay.displayUserSidebar(user, userStorage);

      expect(domDisplay.displayUserSidebar).to.have.been.called(1);
      expect(domDisplay.displayUserSidebar).to.have.been.called.with(user, userStorage);
    });

    it('should be able to display friends names', function() {
      domDisplay.makeFriendHTML(user, userStorage);

      expect(domDisplay.makeFriendHTML).to.have.been.called(1);
      expect(domDisplay.makeFriendHTML).to.have.been.called.with(user, userStorage);
    });

    it('should be able to add hydration info', function() {
      domDisplay.addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString);

      expect(domDisplay.addHydrationInfo).to.have.been.called(1);
      expect(domDisplay.addHydrationInfo).to.have.been.called.with(id, hydrationInfo, dateString, userStorage, laterDateString);
    });

    it('should be able to create a hydration html list item', function() {
      domDisplay.makeHydrationHTML(id, hydrationInfo, userStorage, method);

      expect(domDisplay.makeHydrationHTML).to.have.been.called(1);
      expect(domDisplay.makeHydrationHTML).to.have.been.called.with(id, hydrationInfo, userStorage, method);
    });

    it('should be able to add sleep info', function() {
      domDisplay.addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString);

      expect(domDisplay.addSleepInfo).to.have.been.called(1);
      expect(domDisplay.addSleepInfo).to.have.been.called.with(id, sleepInfo, dateString, userStorage, laterDateString);
    });

    it('should be to create a sleep html list item', function() {
      domDisplay.makeSleepHTML(id, sleepInfo, userStorage, method);

      expect(domDisplay.makeSleepHTML).to.have.been.called(1);
      expect(domDisplay.makeSleepHTML).to.have.been.called.with(id, sleepInfo, userStorage, method);
    });

    it('should be to add weekly step info', function() {
      domDisplay.addWeeklyStepInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId);

      expect(domDisplay.addWeeklyStepInfo).to.have.been.called(1);
      expect(domDisplay.addWeeklyStepInfo).to.have.been.called.with(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId);
    });

    it('should be to add todays user step details', function() {
      domDisplay.addUserTodayStepDetails(id, activityInfo, dateString, userStorage);

      expect(domDisplay.addUserTodayStepDetails).to.have.been.called(1);
      expect(domDisplay.addUserTodayStepDetails).to.have.been.called.with(id, activityInfo, dateString, userStorage);
    });

    it('should be to add average user step details', function() {
      domDisplay.addUserAvgStepDetails(id, activityInfo, dateString, userStorage);

      expect(domDisplay.addUserAvgStepDetails).to.have.been.called(1);
      expect(domDisplay.addUserAvgStepDetails).to.have.been.called.with(id, activityInfo, dateString, userStorage);
    });

    it('should be to create steps html list item', function() {
      domDisplay.makeStepsHTML(id, activityInfo, userStorage, method);

      expect(domDisplay.makeStepsHTML).to.have.been.called(1);
      expect(domDisplay.makeStepsHTML).to.have.been.called.with(id, activityInfo, userStorage, method);
    });

    it('should be to create stairs html list item', function() {
      domDisplay.makeStairsHTML(id, activityInfo, userStorage, method);

      expect(domDisplay.makeStairsHTML).to.have.been.called(1);
      expect(domDisplay.makeStairsHTML).to.have.been.called.with(id, activityInfo, userStorage, method);
    });

    it('should be to create minutes html list item', function() {
      domDisplay.makeMinutesHTML(id, activityInfo, userStorage, method);

      expect(domDisplay.makeMinutesHTML).to.have.been.called(1);
      expect(domDisplay.makeMinutesHTML).to.have.been.called.with(id, activityInfo, userStorage, method);
    });

    it('should be to add friends game info', function() {
      domDisplay.addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user);

      expect(domDisplay.addFriendGameInfo).to.have.been.called(1);
      expect(domDisplay.addFriendGameInfo).to.have.been.called.with(id, activityInfo, userStorage, dateString, laterDateString, user);
    });

    it('should be to create a friends challenge html list item', function() {
      domDisplay.makeFriendChallengeHTML(method);

      expect(domDisplay.makeFriendChallengeHTML).to.have.been.called(1);
      expect(domDisplay.makeFriendChallengeHTML).to.have.been.called.with(method);
    });

    it('should be to create a steps steak html list item', function() {
      domDisplay.makeStepStreakHTML(method);

      expect(domDisplay.makeStepStreakHTML).to.have.been.called(1);
      expect(domDisplay.makeStepStreakHTML).to.have.been.called.with(method);
    });
});
