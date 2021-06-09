/* Global Variables */
const btn = document.getElementById("generate");
const zipCode = document.getElementById("zip");
let date = document.getElementById("date");
let temperature = document.getElementById("temp");
let content = document.getElementById("content");
const apiKey = "d82658548f63a4e3a221948a732608da";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1 +'.'+ d.getDate()+'.'+ d.getFullYear();

// add a click event to generate weather state
btn.addEventListener("click",async () => {
    const value = zipCode.value;
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${value}&appid=${apiKey}&units=metric`;

    respondData(url).then((data) => {
        postData(data);
    }).then(() =>{
        updateUI();
    }).catch((error)=>{
        console.log(error);
    })
        
    
})

// declaring the functions 
async function respondData(url){
    const respond = await fetch(url);
    const data = await respond.json();
    try {
        return data;
    }
    catch(error) {
        console.log("error: " , data.message);
    }
}

async function postData(data){
    const temp = data.main.temp;
    const feelings = document.getElementById("feelings").value;
    await fetch("/addData",{
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date: newDate,
            temp: temp,
            feeling: feelings
        })
    })
}

async function updateUI(){
    const res = await fetch("/all");
    const weatherData = await res.json();
    try {
        date.textContent = weatherData.date;
        temperature.textContent = weatherData.temp;
        content.textContent = weatherData.feeling;
    }
    catch(error){
        console.log("error: ", error);
    }
    
}