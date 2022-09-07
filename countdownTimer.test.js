/**
 * @jest-environment jsdom
 */

import displayAll from './countdownTimer';

test("Shows at least one day to be displayed", () => {
    document.body.innerHTML = `
    <div id="timer">
        <h1>Countdown Timer</h1>
    
        <div id="values">
            <div id="days">
                <label>Day</label>
                <input type="number" id="day" min="1">
            </div>

            <div id="hours">
                <label>Hour</label>
                <input type="number" id="hour" min="1" max="23">
            </div>

            <div id="minutes">
                <label>Minute</label>
                <input type="number" id="minute" min="1" max="59">
            </div>
        </div>
        <button id="start" onclick=startOrStop()>Start | Stop</button>
    </div>

    <div id="display">
        <h1>Time Left</h1>
    </div>`;
    
    require("./countdownTimer.js");

    const displayBox = document.querySelector("#display");

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

    displayAll(500000000);

    let days = document.getElementById("day_display");
    expect(days.textContent).toEqual('1 days');
});