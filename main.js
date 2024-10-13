button = document.getElementById("button_click").addEventListener("click", click_count);
click_update = document.getElementById("click")

let saved_clicks = localStorage.getItem("clicks")

function click_count() {
    click_update.innerHTML = ++saved_clicks;
    localStorage.setItem("clicks", saved_clicks);
     
}

click_update.innerHTML = saved_clicks;