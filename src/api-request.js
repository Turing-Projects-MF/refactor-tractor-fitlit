let apiRequest = {
  userInfo: getUserData(),
  sleepInfo: getSleepData(),
  hydrationInfo: getHydrationData(),
  activityInfo: getActivityData()
};
function getUserData() {
  return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData')
    .then(response => response.json())
    .then(data => data.userData)
    .catch(error => console.log(error));

}
function getSleepData() {
  return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData')
    .then(response => response.json())
    .then(data => data.sleepData)
    .catch(error => console.log(error));
}
function getActivityData() {
  return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData')
    .then(response => response.json())
    .then(data => data.activityData)
    .catch(error => console.log(error));

}
function getHydrationData() {
  return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData')
    .then(response => response.json())
    .then(data => data.hydrationData)
    .catch(error => console.log(error));
}

// Promise.all([apiRequest.userInfo, apiRequest.sleepInfo, apiRequest.activityInfo, apiRequest.hydrationInfo])
//   .then(value => {
//     userData = value[0];
//     sleepData = value[1];
//     activityData = value[2];
//     hydrationData = value[3];
//     startApp()
//   })
//   .catch(error => console.log(error))