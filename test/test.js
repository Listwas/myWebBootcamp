test = document.getElementById("test");

let date = (new Date()).toTimeString();


date_to_time = date.slice(1, 9);
get_time = date_to_time.split(":")
let hours = date.slice(1,2)
let minutes = date.slice(3,5)
let seconds = date.slice(6,8)

test.innerHTML = get_time;