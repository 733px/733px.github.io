function createAlarm(time, left, top, onn, id, usingpx) {
  //what are u looking for
  var horseValue = Math.floor(time / 3600);
  var a = time % 3600;
  var minValue = Math.floor(a / 60);
  var secValue = a % 60;
  if (onn == "true") {
    var on = true;
  } else {
    var on = false;
  }

  var guiBG = document.createElement("button");
  if (usingpx == true) {
    guiBG.style.top = top + "px";
    guiBG.style.left = left + "px";
  } else {
    guiBG.style.top = top + "%";
    guiBG.style.left = left + "%";
  }
  guiBG.style.position = "fixed";
  guiBG.style.transform = "translate(-50%, -50%)";
  guiBG.style.backgroundColor = "#141414";
  guiBG.style.transition = "background-color 0.25s";
  guiBG.style.border = "2px solid white";
  guiBG.style.padding = "50px 150px";
  guiBG.style.borderRadius = "20px";
  document.body.appendChild(guiBG);

  var hours = document.createElement("input");
  hours.type = "text";
  hours.style.position = "absolute";
  hours.value = horseValue;
  hours.style.top = "50px";
  hours.style.left = "10px";
  hours.style.width = "25px";
  guiBG.appendChild(hours);

  var mins = document.createElement("input");
  mins.type = "text";
  mins.style.position = "absolute";
  mins.value = minValue;
  mins.style.top = "50px";
  mins.style.left = "50px";
  mins.style.width = "25px";
  guiBG.appendChild(mins);

  var secs = document.createElement("input");
  secs.type = "text";
  secs.style.position = "absolute";
  secs.value = secValue;
  secs.style.top = "50px";
  secs.style.left = "90px";
  secs.style.width = "25px";
  guiBG.appendChild(secs);

  var button = document.createElement("button");
  button.style.position = "absolute";
  button.style.color = "white";
  button.style.transition = "background-color 0.25s";
  button.style.top = "20px";
  button.style.left = "150px";
  button.style.width = "30%";
  button.style.height = "25%";
  button.style.backgroundColor = "#333333";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.fontSize = "15px";
  button.style.cursor = "pointer";
  button.innerHTML = "Type";
  button.style.backgroundColor = "#505050";
  guiBG.appendChild(button);

  button.addEventListener("click", function () {});

  var button = document.createElement("button");
  button.style.position = "absolute";
  button.style.color = "#000000";
  button.style.transition = "background-color 0.25s";
  button.style.top = "10px";
  button.style.left = "260px";
  button.style.width = "10%";
  button.style.height = "25%";
  button.style.backgroundColor = "#333333";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.fontSize = "15px";
  button.style.cursor = "pointer";
  button.innerHTML = "X";
  button.style.backgroundColor = "#505050";
  guiBG.appendChild(button);

  button.addEventListener("click", function () {
    on = false;
    document.body.removeChild(guiBG);
    localStorage.clear();
  });

  var button = document.createElement("button");
  button.style.position = "absolute";
  button.style.color = "white";
  button.style.transition = "background-color 0.25s";
  button.style.top = "60px";
  button.style.left = "150px";
  //what does going around in the source code grant you
  button.style.width = "30%";
  button.style.height = "25%";
  button.style.backgroundColor = "#333333";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.fontSize = "15px";
  button.style.cursor = "pointer";
  button.innerHTML = "Turn on";
  guiBG.appendChild(button);

  guiBG.style.backgroundColor = "#333333";
  button.style.backgroundColor = "#141414";
  button.addEventListener("click", function () {
    if (button.innerHTML == "Turn off") {
      button.innerHTML = "Turn on";
      guiBG.style.backgroundColor = "#333333";
      button.style.backgroundColor = "#141414";
      on = false;
    } else {
      // timer is on
      button.innerHTML = "Turn off";
      guiBG.style.backgroundColor = "#141414";
      button.style.backgroundColor = "#333333";

      var currentTime = new Date().getTime();
      var TimeS = Math.floor(currentTime / 1000);
      on = true;
    }
  });

  var topSaved = guiBG.style.top.split("%");
  var leftSaved = guiBG.style.left.split("%");
  var savedTime =
    parseInt(hours.value * 3600) +
    parseInt(mins.value * 60) +
    parseInt(secs.value);
  //
  //
  //

  var game = [
    "unixTime" + id,
    getInternationalTime(),
    "top" + id,
    topSaved,
    "left" + id,
    leftSaved,
    "savedTime" + id,
    savedTime,
    "id" + id,
    id,
    "on" + id,
    onn,
  ];

  localStorage.setItem("alarm" + id, game);

  var moveButton = document.createElement("button");
  moveButton.style.position = "fixed";
  moveButton.style.top = "20%";
  moveButton.style.left = "6.5%";
  moveButton.style.transform = "translate(-50%, -50%)";
  moveButton.style.backgroundColor = "#101010";
  moveButton.style.color = "white";
  moveButton.style.border = "none";
  moveButton.style.padding = "20px 20px";
  moveButton.style.borderRadius = "10px";
  moveButton.style.border = "2px solid white";
  moveButton.style.fontSize = "20px";
  moveButton.style.cursor = "all-scroll";
  moveButton.style.backgroundImage =
    "url('https://cdn4.iconfinder.com/data/icons/css-cursors/48/jee-03-512.png')";
  moveButton.style.backgroundSize = "cover";
  moveButton.innerHTML = "";
  document.body.appendChild(moveButton);

  guiBG.appendChild(moveButton);

  var isDragging = false;
  var offset = { x: 0, y: 0 };

  moveButton.addEventListener("mousedown", function (e) {
    isDragging = true;
  });

  document.addEventListener("mousemove", function (e) {
    if (isDragging) {
      guiBG.style.left = e.pageX - offset.x + 130 + "px";
      guiBG.style.top = e.pageY - offset.y + 30 + "px";
    }
  });

  moveButton.addEventListener("mouseup", function () {
    isDragging = false;
  });

  function updateText() {
    if (on === true) {
      var seconds = parseInt(secs.value);
      secs.value = seconds - 1;
      if (seconds <= 0) {
        secs.value = 59;
        mins.value--;
      }

      if (parseInt(mins.value) <= -1 && parseInt(hours.value) != 0) {
        mins.value = 59;
        hours.value--;
      }
      if (
        parseInt(hours.value) == 0 &&
        parseInt(mins.value) == 0 &&
        parseInt(secs.value) == 0
      ) {
        on = false;

        function playAudio() {
          var audio = new Audio(
            "https://cdn.glitch.global/73adda50-c99a-4ff7-b918-293460a1304c/mixkit-alarm-tone-996.wav?v=1709956726281"
          );
          if (button.innerHTML == "Turn on") {
            audio.muted = true;
            var count = count;
            count = 100000;
            return count;
          } else {
            audio.play();
          }
        }

        function playAudioMultipleTimes() {
          var count = 0;
          var intervalId = setInterval(function () {
            count = playAudio(count);
            count++;
            if (count >= 5) {
              clearInterval(intervalId);
            }
          }, 1000);
        }
        playAudioMultipleTimes();
      }
      if (parseInt(mins.value) < 0) {
        secs.value = "0";
        mins.value = "0";
        hours.value = "0";
        setInterval(function () {
          secs.value = ":()";
        }, 500);
        setInterval(function () {
          mins.value = ":()";
        }, 1000);
        setInterval(function () {
          hours.value = ":()       Set a New timer XucEbAf";
        }, 1500);
      }
    }
    //localStorage.setItem('name', amt);
    // clicks = parseInt(localStorage.getItem('clicks'));
    var topSaved = guiBG.style.top.split("%");
    var leftSaved = guiBG.style.left.split("%");
    var savedTime =
      parseInt(hours.value * 3600) +
      parseInt(mins.value * 60) +
      parseInt(secs.value);
    //
    //
    //

    var game = [
      "unixTime" + id,
      getInternationalTime(),
      "top" + id,
      topSaved,
      "left" + id,
      leftSaved,
      "savedTime" + id,
      savedTime,
      "id" + id,
      id,
      "on" + id,
      onn,
    ];
    localStorage.setItem("alarm" + id, game);
  }

  setInterval(updateText, 1000);
  return parseInt(id);
}

function getInternationalTime() {
  var currentTime = new Date().getTime();
  var unixTimeSeconds = Math.floor(currentTime / 1000);

  return unixTimeSeconds;
}
//
//loading that shit
//
var a = 0;
for (let i = 1; i < 1000; i++) {
  if (localStorage.getItem("alarm" + i) !== null) {
    var storedValue = localStorage.getItem("alarm" + i);
    a = storedValue.split(",");
    //trouble making it an array
    //createAlarm(1000, 50, 35, false, i, false);
    if (a[13] == "false") {
      var isOn = false;
    } else {
      var isOn = true;
    }
    var top = parseInt(a[3].split("px"));
    var left = parseInt(a[5].split("px"));
    createAlarm(
      parseInt(a[7]),
      parseInt(a[5].split("px")),
      parseInt(a[3].split("px")),
      isOn,
      i,
      true
    );
    if (a[3].includes("%")) {
      createAlarm(
        parseInt(a[7]),
        parseInt(a[5].split("%")),
        parseInt(a[3].split("%")),
        isOn,
        i,
        false
      );
    }
  }
}

//
//
//
//
//
var alarmButton = document.createElement("button");
alarmButton.style.position = "absolute";
alarmButton.style.color = "white";
alarmButton.style.top = "20px";
alarmButton.style.left = "100px";
alarmButton.style.width = "100px";
alarmButton.style.height = "25px";
alarmButton.style.border = "none";
alarmButton.style.borderRadius = "5px";
alarmButton.style.fontSize = "15px";
alarmButton.style.cursor = "pointer";
alarmButton.innerHTML = "New Alarm";
alarmButton.style.backgroundColor = "#111111";
document.body.appendChild(alarmButton);

alarmButton.addEventListener("click", function () {
  for (let i = 1; i < 1000; i++) {
    if (localStorage.getItem("alarm" + i) === null) {
      createAlarm(1000, 50, 35, false, i, false);
      i = 1000000;
    }
  }
});

function deleteAllAlarms(){
  
    document.body.removeChild(guiBG);
    localStorage.clear();
  reload();
}
var deleteAlarmButton = document.createElement("button");
deleteAlarmButton.style.position = "absolute";
deleteAlarmButton.style.color = "white";
deleteAlarmButton.style.top = "20px";
deleteAlarmButton.style.left = "250px";
deleteAlarmButton.style.width = "250px";
deleteAlarmButton.style.height = "25px";
deleteAlarmButton.style.border = "none";
deleteAlarmButton.style.borderRadius = "5px";
deleteAlarmButton.style.fontSize = "15px";
deleteAlarmButton.style.cursor = "pointer";
deleteAlarmButton.innerHTML = "Delete Alarms";
deleteAlarmButton.style.backgroundColor = "#111111";
document.body.appendChild(deleteAlarmButton);

deleteAlarmButton.addEventListener("click", function () {  var guiBG = document.createElement("button");
  if (usingpx == true) {
    guiBG.style.top = top + "px";
    guiBG.style.left = left + "px";
  } else {
    guiBG.style.top = top + "%";
    guiBG.style.left = left + "%";
  }
  guiBG.style.position = "fixed";
  guiBG.style.transform = "translate(-50%, -50%)";
  guiBG.style.backgroundColor = "#141414";
  guiBG.style.transition = "background-color 0.25s";
  guiBG.style.border = "2px solid white";
  guiBG.style.padding = "50px 150px";
  guiBG.style.borderRadius = "20px";
  document.body.appendChild(guiBG);

  var hours = document.createElement("input");
  hours.type = "text";
  hours.style.position = "absolute";
  hours.value = horseValue;
  hours.style.top = "50px";
  hours.style.left = "10px";
  hours.style.width = "25px";
  guiBG.appendChild(hours);

  var mins = document.createElement("input");
  mins.type = "text";
  mins.style.position = "absolute";
  mins.value = minValue;
  mins.style.top = "50px";
  mins.style.left = "50px";
  mins.style.width = "25px";
  guiBG.appendChild(mins);

  var secs = document.createElement("input");
  secs.type = "text";
  secs.style.position = "absolute";
  secs.value = secValue;
  secs.style.top = "50px";
  secs.style.left = "90px";
  secs.style.width = "25px";
  guiBG.appendChild(secs);

  var button = document.createElement("button");
  button.style.position = "absolute";
  button.style.color = "white";
  button.style.transition = "background-color 0.25s";
  button.style.top = "20px";
  button.style.left = "150px";
  button.style.width = "30%";
  button.style.height = "25%";
  button.style.backgroundColor = "#333333";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.fontSize = "15px";
  button.style.cursor = "pointer";
  button.innerHTML = "Type";
  button.style.backgroundColor = "#505050";
  guiBG.appendChild(button);

  button.addEventListener("click", function () {});

  var button = document.createElement("button");
  button.style.position = "absolute";
  button.style.color = "#000000";
  button.style.transition = "background-color 0.25s";
  button.style.top = "10px";
  button.style.left = "260px";
  button.style.width = "10%";
  button.style.height = "25%";
  button.style.backgroundColor = "#333333";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.fontSize = "15px";
  button.style.cursor = "pointer";
  button.innerHTML = "X";
  button.style.backgroundColor = "#505050";
  guiBG.appendChild(button);

  button.addEventListener("click", function () {
    on = false;
    document.body.removeChild(guiBG);
    localStorage.clear();
  });

  var button = document.createElement("button");
  button.style.position = "absolute";
  button.style.color = "white";
  button.style.transition = "background-color 0.25s";
  button.style.top = "60px";
  button.style.left = "150px";
  //what does going around in the source code grant you
  button.style.width = "30%";
  button.style.height = "25%";
  button.style.backgroundColor = "#333333";
  button.style.border = "none";
  button.style.borderRadius = "5px";
  button.style.fontSize = "15px";
  button.style.cursor = "pointer";
  button.innerHTML = "Turn on";
  guiBG.appendChild(button);

  guiBG.style.backgroundColor = "#333333";
  button.style.backgroundColor = "#141414";
});
