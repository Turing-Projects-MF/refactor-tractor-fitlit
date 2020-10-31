import './css/base.scss';
import './css/style.scss';

import './images/person walking on path.jpg';
import './images/The Rock.jpg';

let userData;
let hydrationData;
let sleepData;
let activityData;

import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import UserRepo from './User-repo';
import $ from 'jquery';

import domDisplay from './dom-display';
import apiRequest from './api-request';

let userRepo;
let hydrationRepo;
let sleepRepo;
let activityRepo;
let userActivityInput = $('#user__activity__input');
let userHydrationInput = $('#user__hydration__input');
let userSleepInput = $('#user__sleep__input');
let currentUser;

const recievedUserData = apiRequest.getUserData();
const recievedSleepData = apiRequest.getSleepData();
const recievedActivityData = apiRequest.getActivityData();
const recievedHydrationData = apiRequest.getHydrationData();

Promise.all([recievedUserData, recievedSleepData, recievedActivityData, recievedHydrationData])
  .then(value => {
    userData = value[0];
    sleepData = value[1];
    activityData = value[2];
    hydrationData = value[3];
    startApp()
  })
  .catch(error => console.log(error))

$("#user__activities").on("change", displayActivityInput);
$('.user__input__button').on("click", updateUserInformation);

function startApp() {
  createUserRepo();
  createUserData();
  let userNowId = pickUser();
  currentUser = getUserById(userNowId, userRepo);
  let today = makeToday(userRepo, userNowId, hydrationData);
  let randomHistory = makeRandomDate(userRepo, userNowId, hydrationData);
  domDisplay.displayRandomUserHistory(randomHistory);
  console.log(randomHistory)
  generateInitialInfo(userNowId, activityRepo, userRepo, today, randomHistory, currentUser);
  generateActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, currentUser);
}

function updateUserInformation() {
  let value = $('#user__activities').val();
  switch (value) {
  case 'Hydration':
    recordUserHydrationData();
    break;
  case 'Sleep':
    recordUserSleepData();
    break;
  case 'Walking':
    recordUserActityData();
    break;
  default:
    break;
  }
}

function getTodaysDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  return today = yyyy + '/' + mm + '/' + dd;
}

function recordUserActityData() {
  fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "userID": currentUser.id,
      "date": getTodaysDate(),
      "numSteps": $('#number__of__steps').val(),
      "minutesActive": $('#active__minutes').val(),
      "flightsOfStairs": $('#flights_stairs').val()
    }),
  })
    .then(response => response.json())
    .catch(error => console.log(error))
}

function recordUserSleepData() {
  fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "userID": currentUser.id,
      "date": getTodaysDate(),
      "hoursSlept": $('#hours__slept').val(),
      "sleepQuality": $('#sleep__quality').val()
    }),
  })
    .then(response => response.json())
    .catch(error => console.log(error))
}

function recordUserHydrationData() {
  fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "userID": currentUser.id,
      "date": getTodaysDate(),
      "numOunces": $('#total__water').val()
    }),
  })
    .then(response => response.json())
    .catch(error => console.log(error))
}

function displayActivityInput() {
  if (this.value === 'Hydration') {
    displayUserHydrationInput();
    return this.value;
  } else if (this.value === 'Sleep') {
    displayUserSleepInput();
    return this.value;
  } else if (this.value === 'Walking') {
    displayUserActivityInput();
    return this.value;
  }
}

function displayUserActivityInput() {
  userActivityInput.removeClass('hidden');
  userHydrationInput.addClass('hidden');
  userSleepInput.addClass('hidden');
}

function displayUserHydrationInput() {
  userHydrationInput.removeClass('hidden');
  userActivityInput.addClass('hidden');
  userSleepInput.addClass('hidden');
}

function displayUserSleepInput() {
  userSleepInput.removeClass('hidden');
  userHydrationInput.addClass('hidden');
  userActivityInput.addClass('hidden');
}

function generateInitialInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow) {
  addInfoToSidebar(userNow, userRepo);
  domDisplay.addFriendGameInfo(userNowId, activityRepo, userRepo, today, randomHistory, userNow);
}

function generateActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow) {
  let winnerNow = makeWinnerID(activityRepo, userNow, today, userRepo);
  addActivityInfo(userNowId, activityRepo, today, userRepo, randomHistory, userNow, winnerNow);
  domDisplay.addHydrationInfo(userNowId, hydrationRepo, today, userRepo, randomHistory);
  domDisplay.addSleepInfo(userNowId, sleepRepo, today, userRepo, randomHistory);
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
  userData.forEach(dataItem => {
    let user = new User(dataItem);
    array.push(user);
  });
}

function pickUser() {
  return Math.floor(Math.random() * 50);
}

function getUserById(id, listRepo) {
  return listRepo.getDataFromID(id);
}

function addInfoToSidebar(user, userStorage) {
  domDisplay.displaySidebarDetails(user);
  domDisplay.displayUserSidebar(user, userStorage);
}

function makeToday(userStorage, id, dataSet) {
  const sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  console.log(sortedArray)
  return sortedArray[0].date;
}

function makeRandomDate(userStorage, id, dataSet) {
  const sortedArray = userStorage.makeSortedUserArray(id, dataSet);
  return sortedArray[Math.floor(Math.random() * sortedArray.length + 1)].date;
}

function addActivityInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
  addTodayStepInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId);
  domDisplay.addWeeklyStepInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId);
}

function addTodayStepInfo(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId) {
  domDisplay.addUserTodayStepDetails(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId);
  domDisplay.addUserAvgStepDetails(id, activityInfo, dateString, userStorage, laterDateString, user, winnerId);
}

function makeWinnerID(activityInfo, user, dateString, userStorage) {
  return activityInfo.getWinnerId(user, dateString, userStorage);
}
