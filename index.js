//code for analog clock to show current time
setInterval(clock, 1000);
var hourHand = document.getElementById('hour');
var minuteHand = document.getElementById('minute');
var secondHand = document.getElementById('second');

var dateElemeent = document.getElementById('date');

function clock() {

    const currentDate = new Date();

    //setting date in analog clock
    dateElemeent.innerHTML = currentDate.toDateString();

    //getting ratio to move hands accordingly
    const ratioForSecond = currentDate.getSeconds() / 60;
    const rationForMin = (ratioForSecond + currentDate.getMinutes()) / 60;
    const ratioForHour = (rationForMin + currentDate.getHours()) / 12;

    moveHandsOfClock(hourHand, ratioForHour);
    moveHandsOfClock(minuteHand, rationForMin);
    moveHandsOfClock(secondHand, ratioForSecond);


}
const COMPLETE_ROTAION = 360;
function moveHandsOfClock(handElement, rotationRatio) {
    handElement.style.setProperty('--rotation', rotationRatio * COMPLETE_ROTAION);
}
clock();


//code for creation of alarm
//boolean to reset alarm
let STOP_ALARM = false;

addAlarmBtn = document.getElementById("add-alarm-btn");
clearAlarmBtn = document.getElementById("clear-alarm-btn");
alarmForm = document.getElementById("alarm-form");
alarmDescription = document.getElementById("alarm-desrciption");

addAlarmBtn.addEventListener('click', () => {
    alarmForm.style.display = "block";

    clearAlarmBtn.style.display = "block";

    addAlarmBtn.style.display = "none";

});

let ALARM_IS_CLEAR = false;
let FIRST_STOP_ALARM_THEN_CLEAR = true;

clearAlarmBtn.addEventListener('click', () => {
    if (FIRST_STOP_ALARM_THEN_CLEAR == true) {
        addAlarmBtn.style.display = "block";
        clearAlarmBtn.style.display = "none";
        alarmDescription.style.display = "none";
        alarmForm.style.display = "none";
        ALARM_IS_CLEAR = true;
    }


})

var setAlarmBtn = document.getElementById("set-alarm");
setAlarmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    setAlarm();
    alarmDescription.style.display = "block";
    alarmForm.style.display = "none";
})


function setAlarm() {
    var hourInput = document.getElementById('hour-input');
    var minuteInput = document.getElementById('minute-input');
    var zoneInput = document.getElementById('zone-input');

    let hours = parseInt(hourInput.value);
    let minute = parseInt(minuteInput.value);
    let zone = zoneInput.value;
    if (hours < 1 || hours > 12) {
        alert("Wrong hours input given");
        return;
    }
    if (minute < 0 || minute > 60) {
        alert("Wrong minute input given");
        return;
    }
    if (zone == null) {
        alert("Forgot to select zone");
        return;
    }

    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minute < 10) {
        minute = "0" + minute;
    }

    let alarmTimeString = " " + hours + ":" + minute + " " + zone;

    alarmDescription.innerHTML = "Alarm is set for " + alarmTimeString;

    startAlarm(hours, minute, zone);

    alarmTimeString = "";
    hourInput.value = '';
    minuteInput.value = '';
    zoneInput.value = '';

}

//code to check if alarm time equals current time

function startAlarm(alarmHours, alarmMinute, alarmZone) {
    STOP_ALARM = false;

    let alarmInterval = setInterval((alarmHours, alarmMinute, alarmZone) => {
        if (ALARM_IS_CLEAR == true) {
            clearInterval(alarmInterval);
            ALARM_IS_CLEAR = false;
            return;
        }
        let currentTime = new Date();
        let currentHours = currentTime.getHours();
        let currentMinute = currentTime.getMinutes();


        let currentTimeString = '';
        if (currentHours < 10) {
            console.log(currentHours)
            currentHours = "0" + currentHours;
        }
        if (currentMinute < 10) {
            console.log(currentMinute);
            currentMinute = "0" + currentMinute;
        }
        currentHours = "" + currentHours;
        currentMinute = "" + currentMinute;

        currentTimeString = currentHours + currentMinute;



        let alarmTimeString = '';

        console.log(alarmZone);

        if (alarmZone == "AM" && alarmHours == 12) {
            alarmHours = "00";
        } else if (alarmZone == "PM" && alarmHours == 12) {
            alarmHours = alarmHours;
        } else if (alarmZone == "PM") {
            alarmHours = parseInt(alarmHours);
            alarmHours += 12;
        }

        alarmHours = "" + alarmHours;
        alarmMinute = "" + alarmMinute;
        alarmTimeString = alarmHours + alarmMinute;

        console.log("current time string    " + currentTimeString);
        console.log("alarm time string    " + alarmTimeString);

        if (alarmTimeString === currentTimeString) {
            document.getElementById('alarm-time').style.display = "block";
            //play music
            let alarmSong = document.getElementById('alarm-song');
            alarmSong.play();
            FIRST_STOP_ALARM_THEN_CLEAR = false;

        }
        if (STOP_ALARM == true) {
            document.getElementById('alarm-time').style.display = "none";
            //stop music
            let alarmSong = document.getElementById('alarm-song');
            alarmSong.pause();
            FIRST_STOP_ALARM_THEN_CLEAR = true;
        }


    }, 1000, alarmHours, alarmMinute, alarmZone);

}

let alarmStopBtn = document.getElementById('stop-btn');
alarmStopBtn.addEventListener('click', () => {
    STOP_ALARM = true;
    //stop music
});













