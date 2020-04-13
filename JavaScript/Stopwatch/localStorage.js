//Create objects to store data in
let storageLocal = window.localStorage;
let dataObject = [];
let cachedData = storageLocal.getItem('stopWatchObject');

//if there is an object that is saved. Insert it to a new row.
if(cachedData) {
dataObject = JSON.parse(cachedData);
for(let i = 0; i < dataObject.length; i++) {
  insertCachedData(dataObject[i].startTime, dataObject[i].posPrev, dataObject[i].timeZoneBefore, dataObject[i].endTime, dataObject[i].eLat, dataObject[i].eLng, dataObject[i].totalE, dataObject[i].timeZoneAfter);
}
}
//Insert rows in localStorage to the main html page.
function insertCachedData(startTime, posPrev,timeZoneBefore, endTime, eLat,eLng,totalE,timeZoneAfter){

    let table = document.querySelector("#table1");
    let row = table.insertRow(1);
    let timeCachedStart = row.insertCell(0);
    let coordinateCachedStart = row.insertCell(1);
    let timeZoneStart = row.insertCell(2)
    let timeCachedStop = row.insertCell(3);
    let coordinateCachedStop = row.insertCell(4);
    let timeCachedElapsed = row.insertCell(5);
    let timeZoneStop = row.insertCell(6);
    
    timeCachedStart.innerHTML = startTime;
    coordinateCachedStart.innerHTML = posPrev;
    timeZoneStart.innerHTML = timeZoneBefore;
    timeCachedStop.innerHTML = endTime;
    coordinateCachedStop.innerHTML = eLat + "," + eLng;
    timeCachedElapsed.innerHTML = totalE;
    timeZoneStop.innerHTML = timeZoneAfter;
}
//This function is being called from stopwatchFunctionality.
function addDataToLocalStorage(startTime, posPrev,timeZoneBefore, endTime,eLat,eLng,totalE,timeZoneAfter) {

         dataObject.push({'startTime': startTime, 'posPrev': posPrev, 'timeZoneBefore':timeZoneBefore, 'endTime': endTime, 'eLat': eLat, 'eLng': eLng, 'totalE': totalE, 'timeZoneAfter':timeZoneAfter});
         storageLocal.setItem('stopWatchObject', JSON.stringify(dataObject));
         
}