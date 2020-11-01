import $ from 'jquery';

let domDisplay = {

  displaySidebarDetails(user) {
    $('#sidebarName').text(user.name);
    $('#headerText').text(`${user.getFirstName()}'s Activity Tracker`);
    $('#stepGoalCard').text(`Your daily step goal is ${user.dailyStepGoal}.`);
  },

  displayUserSidebar(user, userStorage) {
    $('#userAddress').text(user.address);
    $('#userEmail').text(user.email);
    $('#userStridelength').text(`Your stridelength is ${user.strideLength} meters.`);
    $('#friendList').prepend(domDisplay.makeFriendHTML(user, userStorage));
  },

  makeFriendHTML(user, userStorage) {
    return user.getFriendsNames(userStorage).map(friendName => `<li class='historical__list__listItem'>${friendName}</li>`).join('');
  },

  addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {
    $('#hydrationToday').prepend(`<p>You drank</p><p><span class="number">${hydrationInfo.calculateDailyOunces(id, dateString)}</span></p><p>oz water today.</p>`);
    $('#hydrationAverage').prepend(`<p>Your average water intake is</p><p><span class="number">${hydrationInfo.calculateAverageOunces(id, hydrationInfo.hydrationData)}</span></p> <p>oz per day.</p>`);
    $('#hydrationThisWeek').prepend(domDisplay.makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateFirstWeekOunces(userStorage, id)));
    $('#hydrationEarlierWeek').prepend(domDisplay.makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateRandomWeekOunces(laterDateString, id, userStorage)));
  },

  makeHydrationHTML(id, hydrationInfo, userStorage, method) {
    return method.map(drinkData => `<li class="historical__list__listItem">On ${drinkData}oz</li>`).join('');
  },

  addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
    $('#sleepToday').prepend(`<p>You slept</p> <p><span class="number">${sleepInfo.calculateDailySleep(id, dateString)}</span></p> <p>hours today.</p>`);
    $('#sleepQualityToday').prepend(`<p>Your sleep quality was</p> <p><span class="number">${sleepInfo.calculateDailySleepQuality(id, dateString)}</span></p><p>out of 5.</p>`);
    $('#avUserSleepQuality').prepend(`<p>The average sleep quality of all users is</p> <p><span class="number">${Math.round(sleepInfo.calculateAllUserSleepQuality()).toFixed(1)}</span></p><p>out of 5.</p>`);
    $('#sleepThisWeek').prepend(domDisplay.makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(dateString, id, userStorage)));
    $('#sleepEarlierWeek').prepend(domDisplay.makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(laterDateString, id, userStorage)));
  },

  makeSleepHTML(id, sleepInfo, userStorage, method) {
    return method.map(sleepData => `<li class="historical__list__listItem">On ${sleepData} hours</li>`).join('');
  },

  addWeeklyStepInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
    $('#userStepsThisWeek').prepend(domDisplay.makeStepsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, 'numSteps')));
    $('#userStairsThisWeek').prepend(domDisplay.makeStairsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, 'flightsOfStairs')));
    $('#userMinutesThisWeek').prepend(domDisplay.makeMinutesHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, 'minutesActive')));
    $('#bestUserSteps').prepend(domDisplay.makeStepsHTML(user, activityInfo, userStorage, activityInfo.userDataForWeek(winnerId, dateString, userStorage, 'numSteps')));
  },

  addUserTodayStepDetails(id, activityInfo, dateString, userStorage) {
    $('#userStairsToday').prepend(`<p>Stair Count:</p><p>You</><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'flightsOfStairs')}</span></p>`);
    $('#userStepsToday').prepend(`<p>Step Count:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'numSteps')}</span></p>`);
    $('#userMinutesToday').prepend(`<p>Active Minutes:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'minutesActive')}</span></p>`);
  },

  addUserAvgStepDetails(id, activityInfo, dateString, userStorage) {
    $('#avgStairsToday').prepend(`<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'flightsOfStairs')}</span></p>`);
    $('#avgStepsToday').prepend(`<p>Step Count:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'numSteps')}</span></p>`);
    $('#avgMinutesToday').prepend(`<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'minutesActive')}</span></p>`);
  },

  makeStepsHTML(id, activityInfo, userStorage, method) {
    return method.map(activityData => `<li class="historical__list__listItem">On ${activityData} steps</li>`).join('');
  },

  makeStairsHTML(id, activityInfo, userStorage, method) {
    return method.map(data => `<li class="historical__list__listItem">On ${data} flights</li>`).join('');
  },

  makeMinutesHTML(id, activityInfo, userStorage, method) {
    return method.map(data => `<li class="historical__list__listItem">On ${data} minutes</li>`).join('');
  },

  displayRandomUserHistory(randomDay) {
    document.querySelectorAll('.historicalWeek').forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomDay}`));
  },

  addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
    $('#friendChallengeListToday').prepend(domDisplay.makeFriendChallengeHTML(activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
    $('#streakList').prepend(domDisplay.makeStepStreakHTML(activityInfo.getStreak(userStorage, id, 'numSteps')));
    $('#streakListMinutes').prepend(domDisplay.makeStepStreakHTML(activityInfo.getStreak(userStorage, id, 'minutesActive')));
    $('#friendChallengeListHistory').prepend(domDisplay.makeFriendChallengeHTML(activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
    $('#bigWinner').prepend(`THIS WEEK'S WINNER! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`);
  },

  makeFriendChallengeHTML(method) {
    return method.map(friendChallengeData => `<li class="historical__list__listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
  },

  makeStepStreakHTML(method) {
    return method.map(streakData => `<li class="historical__list__listItem">${streakData}!</li>`).join('');
  }
};

export default domDisplay;
