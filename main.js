button = document.getElementById("button_click").addEventListener("click", click_count);
reset_button = document.getElementById("reset_clicks")
click_update = document.getElementById("click")

let saved_clicks = localStorage.getItem("clicks")

function click_count() {
    click_update.innerHTML = ++saved_clicks;
    localStorage.setItem("clicks", saved_clicks);
     
}

function reset_clicks() {
    saved_clicks = click_update.innerHTML = 0;
    localStorage.removeItem("clicks")
    localStorage.setItem("clicks", saved_clicks)
}

click_update.innerHTML = saved_clicks;

// displaying text on the server

verse_display = document.getElementById("verse");

async function balls() {
    const response = await fetch("/verse");
    const result = await response.text();

    text = result.replace("dolor", "dolores")
    verse_display.innerHTML = text;
}

balls()


// timer logic
timer = document.getElementById("display_timer");

let hours = 0;
let minutes = 0;
let seconds = 0;
let started = 0;
let my_interval;
let time;


function handleDate() {
    exit_date = new Date(localStorage.getItem("date"))
    console.log(localStorage.getItem("started"))
    if (localStorage.getItem("started") === "1") {
        started = 1;
        let current_date = (new Date());
        let result = current_date - exit_date;
        result /= 1000;

        hours = Math.floor(result / 3600);
        minutes = Math.floor((result - hours * 3600) / 60);
        seconds = Math.floor((result - (hours * 3600 + minutes * 60)));
        
    } else {display_time();}   
}

function start_timer() {
    is_started(started+1)
    if (started === 1) {
        let start_date = (new Date()).toString();
        localStorage.setItem("date", start_date);
        clearInterval(my_interval)
        my_interval = setInterval(timer_running, 1000);
    } else {pause_timer()}
}

function pause_timer() {
    is_started(0)
    started = 0;
    clearInterval(my_interval)
}

function is_started(n) {
    started = n;
    localStorage.setItem("started", n);
}

function reset_timer() {
    hours = 0;
    minutes = 0;
    seconds = 0;
    is_started(0);
    display_time();
    pause_timer();
}

function timer_running() {
    console.log(started)
    if (started >= 1) {
        if (seconds >= 60) {
            minutes++
            seconds = 0
        } 
        else if (minutes >= 60) {
            hours++
            minutes = 0
        } else {seconds += 1;}
    }
    display_time();
}

function display_time() {
    hours_string = hours.toString().padStart(2, '0');
    minutes_string = minutes.toString().padStart(2, '0');
    seconds_string = seconds.toString().padStart(2, '0');

    time = `${hours_string}:${minutes_string}:${seconds_string}`;
    timer.innerHTML = time;
}

document.getElementById("start_timer")
document.getElementById("pause_timer")
document.getElementById("reset_timer")


my_interval = setInterval(timer_running, 1000);
