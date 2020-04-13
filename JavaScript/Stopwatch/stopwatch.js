//Assuming that everytime we called for geolocation, the user allows. Who wouldn't want to see their lat and lng?
//Also I assume that the user have connections everytime they hit start. I could have implemented this without recording the location. But I guess it's too late.

//While testing this, I notice if you hit start and it was running. If you hit space, the start will be "clicked" again? Fix by isOn variable
let object = new stopWatch();
let isOn = false;
let timeStart= 0;
let timeStop = 0;
let timeLaststop = 0;
let timeBeginning = true;
let timeCounting = 0;
let timeElapsed = 0;
//Function for Start, called function stopWatch.start
function start() {
if( !isOn )
{
object.start();
object.addCoordinateStart();
clocktimer = setInterval("realTime(timer)", 1); //Another alternative could be using requestAnimationFrame();
isOn = true;
}
}
//Function for stop, called function stopWatch.Stop
function stop() {
  if( isOn ){
  object.stop();
  object.addCoordinateStop();
  clearInterval(clocktimer);
  isOn = false;
  }
};
//Function for reset, called function stopWatch.reset
function reset() {
object.reset();
};

//This function runs in real time to display the live time.
function realTime(timer) {
	timer.innerHTML = timeToString( object.getTime() );
}
//Function that return a string corresponding with the time, this could be extended further to hours, months, years.
function timeToString(time) {

    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;

  time = time % (60 * 60 * 1000);
  minutes = Math.floor( time / (60 * 1000) );
  time = time % (60 * 1000);
  seconds = Math.floor( time / 1000 );
  milliseconds = time % 1000;

  
    if ( minutes.toString().length < 2 ) {
      minutes = '0' + minutes;
    }

    if ( seconds.toString().length < 2 ) {
      seconds = '0' + seconds;
    }

    while ( milliseconds.toString().length < 3 ) {
      milliseconds = '0' + milliseconds;
    }
    return minutes + ':' + seconds + '.' + milliseconds;
  }  
//Stop watch object starts here.
function stopWatch () {
//Function to get current time.
let timeNow = function (){
return ( new Date() ).getTime();
}
//--------------Initialize timeStart and make timestart equal to timeLastStop---------------------
 this.start = function() {
  if( timeBeginning )
  {
    timeStart = timeNow();
  }
  else{
   timeStart = timeLaststop ;
   timeCounting = timeNow();
  }
};
//-----------Record timeStop, store timePassed and store timeLastStop------------------
this.stop = function() {
timeStop = timeNow();
if( timeBeginning )
{
timeElapsed = timeStop - timeStart;
timeLaststop = timeElapsed;
}else{
  timeElapsed = timeStop - timeCounting;
  timeLaststop = timeStart + timeElapsed;
}
};
//----------Reset time table and ---------------
reset = function() {
let numberOfRows = document.querySelector("#table1").rows.length;
for(let i= 0; i < numberOfRows-1;i++)
{
  table1.deleteRow( 1 );
}
storageLocal.clear();
dataObject = [];
cachedData = [];
clearInterval( clocktimer );
isOn = false;
};

//----------Get real Time function-----------------
this.getTime = function() {
    if( timeBeginning )
    {
      return timeNow() - timeStart;
    }else{
      return timeNow() + timeStart - timeCounting;
    }
};
//This add coordinate into the table at the start
this.addCoordinateStart = function() {
//Maybe there is a way to requestAlwaysAuthorization? Because this makes me asks the user to allow everytime they clicked start or stop.
//Because google api is fast, I can do add rows and coordinate inside this function, otherwise I would move it outside.
//Fast but not fast enough. This is why I get miliseconds of time differences between the actual timer :( I could've put this as a separate function...
navigator.geolocation.getCurrentPosition(function( position ) {
let pos = {
lat: position.coords.latitude,
lng: position.coords.longitude
};
//Adding table row now
let table = document.getElementById("table1");
let row = table.insertRow( 1 );
let timeStart1 = row.insertCell( 0 );
let coordinateStart = row.insertCell( 1 );
let timeZoneNow = row.insertCell( 2 );
if(timeBeginning)
  {
  timeStart1.innerHTML = "00:00.000";
  }
  else {
  timeStart1.innerHTML = this.timeToString( timeLaststop );
  }
coordinateStart.innerHTML = pos.lat + "," + pos.lng;
//Adding timezone... 
let requestString = "http://api.timezonedb.com/v2.1/get-time-zone?key=L2P7AG84V1GC&format=json&by=position&lat=" + pos.lat + "&lng=" + pos.lng;

 let request = new XMLHttpRequest()

   request.open( "GET", requestString )
   request.send();

//Sometimes this api took super long, so user can stop the action and nothing will appeared.
let requestTimeZone;
request.addEventListener( "readystatechange", function() {
    if ( this.readyState === 4 ) {
        if ( request.status === 200 ) {
          requestTimeZone = JSON.parse( request.responseText );
          timeZoneNow.innerHTML = requestTimeZone.zoneName;
        }
        else {
          timeZoneNow.innerHTML = "NoFound/Rejected";
            console.error( request.statusText );
        }
    }else{
      return false;
    }

});

}, null);
}

//Again, the slight delay from google api geolocation can be why there is miliseconds differences.
this.addCoordinateStop = function() {
navigator.geolocation.getCurrentPosition(function(position) {
let pos = {
lat: position.coords.latitude,
lng: position.coords.longitude
};
//Adding table row now
let table = document.getElementById("table1");
let row = table.rows[ 1 ];
let timeWatchStop = row.insertCell( 3 );
let coordinateStop = row.insertCell( 4 );
let timeElapsed1 = row.insertCell( 5 );
let timeZoneNow = row.insertCell( 6 );
timeWatchStop.innerHTML = this.timeToString( timeLaststop );
coordinateStop.innerHTML = pos.lat + "," + pos.lng;
timeElapsed1.innerHTML = this.timeToString( timeElapsed );


let requestString = "http://api.timezonedb.com/v2.1/get-time-zone?key=L2P7AG84V1GC&format=json&by=position&lat=" + pos.lat + "&lng=" + pos.lng;

 let request = new XMLHttpRequest()

   request.open( "GET", requestString )
   request.send();

//Sometimes this api took super long, so user can stop the action and nothing will appeared.
let requestTimeZone;
request.addEventListener( "readystatechange", function() {
    if ( this.readyState === 4 ) {
        if ( request.status === 200 ) {
          requestTimeZone = JSON.parse(request.responseText);
          timeZoneNow.innerHTML = requestTimeZone.zoneName;
          addDataToLocalStorage( row.cells[0].innerHTML, row.cells[1].innerHTML, row.cells[2].innerHTML, timeWatchStop.innerHTML, pos.lat, pos.lng,timeElapsed1.innerHTML, timeZoneNow.innerHTML );
        }
        else {
          timeZoneNow.innerHTML = "NoFound/Rejected";
            console.error( request.statusText );
            addDataToLocalStorage( row.cells[0].innerHTML, row.cells[1].innerHTML, row.cells[2].innerHTML, timeWatchStop.innerHTML, pos.lat, pos.lng,timeElapsed1.innerHTML, "NoFound/Rejected" );
        }
    }else{
      return false;
    }

});

timeBeginning = false;
}, null );
}    
}
