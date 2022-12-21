// const startButton = document.querySelector("#start");
// const stopButton = document.querySelector('#stop');
const displayBox = document.querySelector("#display");

let counter = null;
var totalSeconds = 0;

function getInputValues() {
    // gets input element object
    var days = document.getElementById("day");
    var hours = document.getElementById("hour");
    var minutes = document.getElementById("minute");

    if(days.value < 1 || hours.value > 23 || hours.value < 1 || minutes.value > 59 || minutes.value < 1) {
        alert("Incorrect input. Kindly enter at least one hour, one to 23 hours, and one to 59 minutes");
        location.reload();
    };

    // gets element object value and converts into seconds then gets total seconds
    var secondsDays = 86400 * days.value;
    var secondsHours = 3600 * hours.value;
    var secondsMinutes = 60 * minutes.value;
    totalSeconds = secondsDays + secondsHours + secondsMinutes;
    return totalSeconds;
}

function displayAll(seconds) {
    // calculate (and subtract) whole days
    var days = Math.floor(seconds / 86400);
    var dayName = "day";
    seconds -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(seconds / 3600) % 24;
    var hourName = "hour";
    seconds -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(seconds / 60) % 60;
    var minuteName = "minute";
    seconds -= minutes * 60;

    // what's left is seconds
    var remainingSeconds = seconds % 60;
    var secondName = "second" 
    
    // removes the previous intervals displayed if detected
    if (displayBox.childElementCount > 1) {
        var days1 = document.querySelector('#day_display');
        var hours1 = document.querySelector('#hour_display');
        var minutes1 = document.querySelector('#minute_display');
        var seconds1 = document.querySelector('#second_display');
        
        displayBox.removeChild(days1);
        displayBox.removeChild(hours1);
        displayBox.removeChild(minutes1);
        displayBox.removeChild(seconds1);
    }

    // displays each time interval in the display box
    displayTimes(days, dayName);
    displayTimes(hours, hourName);
    displayTimes(minutes, minuteName);
    displayTimes(remainingSeconds, secondName);
};

function displayTimes(timeValue, timeName) {
    var timeDisplay = document.createElement('div');
    timeDisplay.setAttribute("id", `${timeName}_display`);
    timeDisplay.setAttribute("class", "display");
    timeDisplay.textContent = `${timeValue} ${timeName}s`;
    displayBox.appendChild(timeDisplay);
};


function startTimer() {  
    if(totalSeconds == 0) {
        totalSeconds =  getInputValues();
    }
    // counter is given a value and totalSeconds is decremented
    counter = setInterval(function(){
        if(totalSeconds == 0) {
            endTime();
        }
        totalSeconds -= 1;
        displayAll(totalSeconds);
    }, 1000);
};

// when button is clicked this function is activated, stopping or starting
const startOrStop = () => {
    // if counter variable is not null, then the Interval is stopped and
    // counter is reset to null. When counter is null, the timer is started
    // from the current value of totalSeconds
    if (counter) {
        clearInterval(counter);
        counter = null;
    } else {
        startTimer();
    }
};

function endTime() {
        var endDisplay = document.createElement('div');
        endDisplay.setAttribute("id", `end_display`);
        endDisplay.setAttribute("class", "display");
        endDisplay.textContent = `Time is up, friendo...`;
        displayBox.appendChild(endDisplay);
}

module.exports = displayAll;