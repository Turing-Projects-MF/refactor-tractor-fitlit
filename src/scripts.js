import './css/base.scss';
import './css/style.scss';

import './images/person walking on path.jpg';
import './images/The Rock.jpg';

let userData;
let hydrationData;
let sleepData;
let activityData;
// import userData from './data/users';
// import hydrationData from './data/hydration';
// import sleepData from './data/sleep';
// import activityData from './data/activity';

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';
import $ from 'jquery';

let userRepo;
let hydrationRepo;
let sleepRepo;
let activityRepo;

const fetchedUserData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData')
  .then(response => response.json())
  .then(data => data.userData)
  .catch(error => console.log(error));

const fetchedSleepData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData')
  .then(response => response.json())
  .then(data => data.sleepData)
  .catch(error => console.log(error));

const fetchedActivityData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData')
  .then(response => response.json())
  .then(data => data.activityData)
  .catch(error => console.log(error));

const fetchedHydrationData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData')
  .then(response => response.json())
  .then(data => data.hydrationData)
  .catch(error => console.log(error));


Promise.all([fetchedUserData, fetchedSleepData, fetchedActivityData, fetchedHydrationData])
  .then(value => {
    userData = value[0];
    sleepData = value[1];
    activityData = value[2];
    hydrationData = value[3];
    startApp()
  })
  .catch(error => console.log(error))



function startApp() {
  createUserRepo();
  createUserData();
  let userNowId = pickUser();
  let userNow = getUserById(userNowId, userRepo);
  let today = makeToday(userRepo, userNowId, hydrationData);
  //today = 2019/09/22
  let randomHistory = makeRandomDate(userRepo, userNowId, hydrationData);
  displayRandomUserHistory(randomHistory);
  generateInitialInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
  generateActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow);
}

function generateInitialInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow) {
  addInfoToSidebar(userNow, userRepo);
  addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
}

function generateActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow) {
  let winnerNow = makeWinnerID(activityRepo, userNow, today, userRepo);
  addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
  addHydrationInfo(userNowId, hydrationRepo, today, userRepo, randomHistory);
  addSleepInfo(userNowId, sleepRepo, today, userRepo, randomHistory);
}

function displayRandomUserHistory(randomDay) {
  document.querySelectorAll('.historicalWeek').forEach(instance => instance.insertAdjacentHTML('afterBegin', `Week of ${randomDay}`));
}

function createUserRepo() {
  let userList = [];
  makeUsers(userList);
  userRepo = new UserRepo(userList);
}

function createUserData() {
  hydrationRepo = new Hydration(hydrationData);
  sleepRepo = new Sleep(sleepData);
  activityRepo = new Activity(activityData);
}

function makeUsers(array) {
  console.log(userData);
  userData.forEach(dataItem => {
    let user = new User(dataItem);
    array.push(user);
  })
}

function pickUser() {
  return Math.floor(Math.random() * 50);
}

function getUserById(id, listRepo) {
  return listRepo.getDataFromID(id);
}


function addInfoToSidebar(user, userStorage) {
  displaySidebarDetails(user)
  avStepGoalCard.innerText = `The average daily step goal is ${userStorage.calculateAverageStepGoal()}`;
  displayUserSidebar(user, userStorage)
}

function displaySidebarDetails(user) {
  $('#sidebarName').text(user.name);
  $('#headerText').text(`${user.getFirstName()}'s Activity Tracker`);
  $('#stepGoalCard').text(`Your daily step goal is ${user.dailyStepGoal}.`);
}


function displayUserSidebar(user, userStorage) {
  $('#userAddress').text(user.address);
  $('#userEmail').text(user.email);
  $('#userStridelength').text(`Your stridelength is ${user.strideLength} meters.`);
  $('#friendList').prepend(makeFriendHTML(user, userStorage));
}

function makeFriendHTML(user, userStorage) {
  return user.getFriendsNames(userStorage).map(friendName => `<li class='historical-list-listItem'>${friendName}</li>`).join('');
}

function makeWinnerID(activityInfo, user, dateString, userStorage) {
  return activityInfo.getWinnerId(user, dateString, userStorage)
}

function makeToday(userStorage, id, dataSet) {
  const sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[0].date;
}

function makeRandomDate(userStorage, id, dataSet) {
  const sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date

}

function addHydrationInfo(id, hydrationInfo, dateString, userStorage, laterDateString) {
  $('#hydrationToday').prepend(`<p>You drank</p><p><span class="number">${hydrationInfo.calculateDailyOunces(id, dateString)}</span></p><p>oz water today.</p>`)
  $('#hydrationAverage').prepend(`<p>Your average water intake is</p><p><span class="number">${hydrationInfo.calculateAverageOunces(id)}</span></p> <p>oz per day.</p>`)
  $('#hydrationThisWeek').prepend(makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateFirstWeekOunces(userStorage, id)));
  $('#hydrationEarlierWeek').prepend(makeHydrationHTML(id, hydrationInfo, userStorage, hydrationInfo.calculateRandomWeekOunces(laterDateString, id, userStorage)))
}


function makeHydrationHTML(id, hydrationInfo, userStorage, method) {
  return method.map(drinkData => `<li class="historical-list-listItem">On ${drinkData}oz</li>`).join('');
}

function addSleepInfo(id, sleepInfo, dateString, userStorage, laterDateString) {
  $('#sleepToday').prepend(`<p>You slept</p> <p><span class="number">${sleepInfo.calculateDailySleep(id, dateString)}</span></p> <p>hours today.</p>`)
  $('#sleepQualityToday').prepend(`<p>Your sleep quality was</p> <p><span class="number">${sleepInfo.calculateDailySleepQuality(id, dateString)}</span></p><p>out of 5.</p>`)
  $('#avUserSleepQuality').prepend(`<p>The average user's sleep quality is</p> <p><span class="number">${Math.round(sleepInfo.calculateAllUserSleepQuality() *100)/100}</span></p><p>out of 5.</p>`)
  $('#sleepThisWeek').prepend(makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(dateString, id, userStorage)))
  $('#sleepEarlierWeek').prepend(makeSleepHTML(id, sleepInfo, userStorage, sleepInfo.calculateWeekSleep(laterDateString, id, userStorage)))
}

function makeSleepHTML(id, sleepInfo, userStorage, method) {
  return method.map(sleepData => `<li class="historical-list-listItem">On ${sleepData} hours</li>`).join('');
}

//not current used in website
// function makeSleepQualityHTML(id, sleepInfo, userStorage, method) {
//   return method.map(sleepQualityData => `<li class="historical-list-listItem">On ${sleepQualityData}/5 quality of sleep</li>`).join('');
// }

function addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
  addTodayStepInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId);
  addWeeklyStepInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId)
}

function addTodayStepInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
  addUserTodayStepDetails(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId);
  addUserAvgStepDetails(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId);
}

function addWeeklyStepInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
  $('#userStepsThisWeek').prepend(makeStepsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "numSteps")))
  $('#userStairsThisWeek').prepend(makeStairsHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "flightsOfStairs")))
  $('#userMinutesThisWeek').prepend(makeMinutesHTML(id, activityInfo, userStorage, activityInfo.userDataForWeek(id, dateString, userStorage, "minutesActive")))
  $('#bestUserSteps').prepend(makeStepsHTML(user, activityInfo, userStorage, activityInfo.userDataForWeek(winnerId, dateString, userStorage, "numSteps")))
}

function addUserTodayStepDetails(id, activityInfo, dateString, userStorage) {
  $('#userStairsToday').prepend(`<p>Stair Count:</p><p>You</><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'flightsOfStairs')}</span></p>`)
  $('#userStepsToday').prepend(`<p>Step Count:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'numSteps')}</span></p>`)
  $('#userMinutesToday').prepend(`<p>Active Minutes:</p><p>You</p><p><span class="number">${activityInfo.userDataForToday(id, dateString, userStorage, 'minutesActive')}</span></p>`)
}

function addUserAvgStepDetails(id, activityInfo, dateString, userStorage) {
  $('#avgStairsToday').prepend(`<p>Stair Count: </p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'flightsOfStairs')}</span></p>`)
  $('#avgStepsToday').prepend(`<p>Step Count:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'numSteps')}</span></p>`)
  $('#avgMinutesToday').prepend(`<p>Active Minutes:</p><p>All Users</p><p><span class="number">${activityInfo.getAllUserAverageForDay(dateString, userStorage, 'minutesActive')}</span></p>`)
}

function makeStepsHTML(id, activityInfo, userStorage, method) {
  return method.map(activityData => `<li class="historical-list-listItem">On ${activityData} steps</li>`).join('');
}

function makeStairsHTML(id, activityInfo, userStorage, method) {
  return method.map(data => `<li class="historical-list-listItem">On ${data} flights</li>`).join('');
}

function makeMinutesHTML(id, activityInfo, userStorage, method) {
  return method.map(data => `<li class="historical-list-listItem">On ${data} minutes</li>`).join('');
}

function addFriendGameInfo(id, activityInfo, userStorage, dateString, laterDateString, user) {
  $('#friendChallengeListToday').prepend(makeFriendChallengeHTML(activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  $('#streakList').prepend(makeStepStreakHTML(activityInfo.getStreak(userStorage, id, 'numSteps')));
  $('#streakListMinutes').prepend(makeStepStreakHTML(activityInfo.getStreak(userStorage, id, 'minutesActive')));
  $('#friendChallengeListHistory').prepend(makeFriendChallengeHTML(activityInfo.showChallengeListAndWinner(user, dateString, userStorage)));
  $('#bigWinner').prepend(`THIS WEEK'S WINNER! ${activityInfo.showcaseWinner(user, dateString, userStorage)} steps`);
}

function makeFriendChallengeHTML(method) {
  return method.map(friendChallengeData => `<li class="historical-list-listItem">Your friend ${friendChallengeData} average steps.</li>`).join('');
}

function makeStepStreakHTML(method) {
  return method.map(streakData => `<li class="historical-list-listItem">${streakData}!</li>`).join('');
}

// startApp();
