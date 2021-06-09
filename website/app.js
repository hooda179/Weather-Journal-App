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

btn.addEventListener("click",async () => {
    const value = zipCode.value;
    const url = `http://api.openweathermap.org/data/2.5/weather?zip=${value}&appid=${apiKey}&units=metric`;

    if(!value){
        alert("Please, enter zip code!");
    }else {
        // recieve data from openWeatherMap api 
        const respond = await fetch(url);
        const data = await respond.json();
        try {
            // add data to our end point 
            const feelings = document.getElementById("feelings").value;
            const temp = data.main.temp;
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

            // recieve data from end point 
            const res = await fetch("/all");
            const weatherData = await res.json();

            date.textContent = weatherData.date;
            temperature.textContent = weatherData.temp;
            content.textContent = weatherData.feeling;
        }
        catch(error){
            alert(data.message);
        }    
    }
})