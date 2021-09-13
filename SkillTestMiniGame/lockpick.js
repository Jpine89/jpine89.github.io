let key_to_press, g_start, g_end, animation_loop; 
let canvas = document.getElementById("canvas"), ctx = canvas.getContext("2d");
let W = canvas.width, H = canvas.height, degrees = 0, new_degrees = 0, time = 0; 
let color = "#ffffff", bgcolor = "#404b58", bgcolor2 = "#41a491", streak = 0, max_streak = 0; 
let bounce = false;

// $( document ).ready(function() {
//     init();
// });

function init() 
{ 
    console.log(degrees);
    ctx.clearRect(0, 0, W, H), 
    ctx.beginPath(), 
    ctx.strokeStyle = bgcolor, 
    ctx.lineWidth = 20, 
    ctx.arc(W / 2, H / 2, 100, 0, 2 * Math.PI, !1), 
    ctx.stroke(); 
    ctx.beginPath(), 
    ctx.strokeStyle = bgcolor2, 
    ctx.lineWidth = 20, 
    ctx.arc(W / 2, H / 2, 100, g_start - 90 * Math.PI / 180, g_end - 90 * Math.PI / 180, !1), 
    ctx.stroke(); 
    let e = degrees * Math.PI / 180; 
    ctx.beginPath(), 
    ctx.strokeStyle = color, ctx.lineWidth = 20, 
    ctx.arc(W / 2, H / 2, 100, 0 - 90 * Math.PI / 180, e - 90 * Math.PI / 180, !1),
    ctx.stroke();
    ctx.fillStyle = color, 
    ctx.font = "100px sans-serif"; 
    let t = ctx.measureText(key_to_press).width; 
    ctx.fillText(key_to_press, W / 2 - t / 2, H / 2 + 35) ;
} 

function draw() 
{ 
    void 0 !== typeof animation_loop && clearInterval(animation_loop), 
    document.querySelector(".stats .streak").innerHTML = streak, 
    document.querySelector(".stats .max-streak").innerHTML = max_streak, 
    g_start = getRandomInt(20, 40) / 10, 
    g_end = getRandomInt(5, 10) / 10, 
    g_end = g_start + g_end, 
    degrees = 0,
    new_degrees = 360, 
    key_to_press = "" + getRandomInt(1, 4), 
    time = 5 * getRandomInt(1, 3), 
    animation_loop = setInterval(animate_to, time) 
} 

function animate_to() 
{ 
    if (degrees < 2 && bounce)
        return console.log("Failed: timeout!"), void wrong();
    if (degrees >= new_degrees)
        bounce = true;
    if (!bounce)
        degrees += 2, init() 
    else
        degrees -= 2, init() 


    
} 

function correct() 
{ 
    document.querySelector(".stats").classList.remove("wrong"), 
    streak > max_streak && (max_streak = streak), 
    streak++, draw() 
} 

function wrong() 
{ 
    document.querySelector(".stats").classList.add("wrong"), 
    streak > max_streak && (max_streak = streak), 
    streak = 0, draw() 
} 

function getRandomInt(min, max) {
min = Math.ceil(min);
max = Math.floor(max);
return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}


document.addEventListener("keydown", (function (e) 
{ 
    let t = e.key; 
    if (["1", "2", "3", "4"].includes(t)) 
    if (t === key_to_press) 
    { 
        let e = 180 / Math.PI * g_start, 
        t = 180 / Math.PI * g_end; 
        degrees < e ? (console.log("Failed: Too soon!"), wrong()) : degrees > t ? (console.log("Failed: Too late!"), wrong()) : (console.log("Success!"), correct()) 
    } 
    else console.log("Failed: Pressed " + t + " instead of " + key_to_press), wrong() 
})), draw();