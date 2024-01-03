// initiallizing all  constant element
const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p")
const dateField = document.querySelector(".weather2 span");
const emojiField = document.querySelector(".weather3 img");
const weatherField = document.querySelector(".weather3 span")
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

form.addEventListener("submit", search)

// default city
let city="kathmandu"

// function to fetch data from api
const fetchData = async (city)=>{
    try {
        const url=`https://api.weatherapi.com/v1/current.json?key=5b27a6ef3547402582e62007222306&q=${city}&aqi=no`
        const response = await fetch(url)
        const data = await response.json()

        // object destructuring
        const {
        current: {temp_c, 
        condition: {text,icon}},
        location: {name, localtime}
        } = data   

        // calling update function
        updateData(temp_c, name, icon, text, localtime)
    } catch (error) {
        alert("Error Location, cannot find the city")
    }    
}

// function to update data in dom
function updateData  (temperature, city, emoji, text, time) {
    const exactTime = time.split(" ")[1]
    const exactDate = time.split(" ")[0]
    const exactDay = getFullDay(new Date(exactDate).getDay())

    temperatureField.innerText=temperature;
    cityField.innerText=city;
    emojiField.src = emoji;
    weatherField.innerText = text 
    dateField.innerText=`${exactTime} - ${exactDay} - ${exactDate} `
}

// function to get full day from date
function getFullDay(num){
    switch (num) {
        case  0:
            return "Sunday"
            break;
        case 1:
            return "Monday"
            break;  
        case 2:
            return "Tuesday"
            break;
        case 3:
            return "Wednesday"
            break;
        case 4:
            return "Thursday"
            break;
        case 5:
            return "Friday"
            break;
        case 6:
            return "Saturday"
            break;  
        default:
            break;
    }
}

// function to search the city
function search(e){
    e.preventDefault()
    city = searchField.value
    fetchData(city)
}

fetchData(city)


// another weather api for to get weather data

// async function getData(){
//   let  response = await fetch("https://api.openweathermap.org/data/2.5/weather?q=mumbai&appid=6d83156e4e40ca97d0c6924b832fe00c")
//     let data = await response.json() 

//     console.log(data)
  
// }  

// getData()