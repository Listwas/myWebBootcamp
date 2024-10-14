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
start_button = document.getElementById("start_timer").addEventListener("click", start_timer);
pause_button = document.getElementById("pause_timer").addEventListener("click", pause_timer);
reset_button = document.getElementById("reset_timer").addEventListener("click", reset_timer);

timer = document.getElementById("display_timer");

let seconds = 0;
let minutes = 0;
let hours = 0;
let started;

setInterval(timer_running, 1000)
async function timer_running() {
    if (started === 1) {
        if (seconds >= 60) {
            minutes++
            seconds = 0
        } 
        else if (minutes >= 60) {
            hours++
            minutes = 0
        } else {seconds += 1;}
    } else {pause_timer()}

    timer.innerHTML = `${hours}:${minutes}:${seconds}`
    saved_seconds = hours*3600 + minutes*60 + seconds
    localStorage.setItem("time", saved_seconds)
}

function start_timer(){
    started++;
    if (started === 2) {
        pause_timer()
    }
}

function pause_timer() {
    started = 0;   
}

function reset_timer() {
    hours = 0;
    minutes = 0;
    seconds = 0;
}