const startButton = document.querySelector("#start");
const stopButton = document.querySelector('#stop');
const displayBox = document.querySelector("#display");
var countdownTimer;

var secondsDays = 0;
var secondsHours = 0;
var secondsMinutes = 0;

function display(seconds) {
    // calculate (and subtract) whole days
    var days = Math.floor(seconds / 86400);
    seconds -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(seconds / 3600) % 24;
    seconds -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(seconds / 60) % 60;
    seconds -= minutes * 60;

    // what's left is seconds
    var remainingSeconds = seconds % 60; 
    
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

    var daysDisplay = document.createElement('div');
    daysDisplay.setAttribute("id", "day_display");
    daysDisplay.setAttribute("class", "display");
    daysDisplay.textContent = `${days} days`;
    displayBox.appendChild(daysDisplay);

    var hoursDisplay = document.createElement('div');
    hoursDisplay.setAttribute("id", "hour_display");
    hoursDisplay.setAttribute("class", "display");
    hoursDisplay.textContent = `${hours} hours`;
    displayBox.appendChild(hoursDisplay);

    var minutesDisplay = document.createElement('div');
    minutesDisplay.setAttribute("id", "minute_display");
    minutesDisplay.setAttribute("class", "display");
    minutesDisplay.textContent = `${minutes} minutes`;
    displayBox.appendChild(minutesDisplay);

    var secondsDisplay = document.createElement('div');
    secondsDisplay.setAttribute("id", "second_display");
    secondsDisplay.setAttribute("class", "display");
    secondsDisplay.textContent = `${remainingSeconds} seconds`;
    displayBox.appendChild(secondsDisplay);
};

function startTimer() {
    stopTimer();
    
    var days = document.getElementById("day");
    var hours = document.getElementById("hour");
    var minutes = document.getElementById("minute");

    var secondsDays = 86400 * days.value;
    var secondsHours = 3600 * hours.value;
    var secondsMinutes = 60 * minutes.value;

    var totalSeconds = secondsDays + secondsHours + secondsMinutes;
    
    countdownTimer = setInterval(function(){
        if(totalSeconds <= 0) {
            clearInterval(countdownTimer);
            display(totalSeconds);
        } else {
            display(totalSeconds);
        }
        totalSeconds -= 1;
    }, 1000);
};

function stopTimer() {
    clearInterval(countdownTimer);
};

// startButton.addEventListener('click', startTimer);
// stopButton.addEventListener('click', stopTimer);