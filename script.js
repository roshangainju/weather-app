const temperatureData = document.querySelector(".weather1")
const cityData = document.querySelector(".weather2 p")
const dateData = document.querySelector(".weather2 span")
const emojiData = document.querySelector(".weather3 p img")
const weatherData = document.querySelector(".weather3 span")
const searchField =  document.querySelector(".searchField")
const form = document.querySelector("form")
const btn = document.querySelector("button")

let city="kathmandu"

const fetchData = async (city) => {
    try {
        const url=`https://api.weatherapi.com/v1/current.json?key=5b27a6ef3547402582e62007222306&q=${city}&aqi=no`
        const response = await fetch(url)
        const data = await response.json() 
        const {
            location:{name, localtime},
            current:{temp_f,
            condition:{text,icon}}
        } = data

        updateData(temp_f, name, localtime, icon, text)    
    } catch (error) {
        alert("Enter verfied Location")
    }
}

const updateData = (temp, city, date, emoji, condition) => {
    let exactTime = date.split(" ")[1]
    let exactDate = date.split(" ")[0]
    let exactDay = getDay(new Date(exactDate).getDay())

    temperatureData.innerText = `${temp}°F`;
    cityData.innerText = city;
    emojiData.src = emoji;
    weatherData.innerText = condition;
    dateData.innerText = `${exactDay} - ${exactDate} - ${exactTime}`
}

const getDay = (num) =>{
    switch (num) {
        case 0:
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


btn.addEventListener("click", submitData)


function submitData(e){
    e.preventDefault()
    city=searchField.value
    fetchData(city)
}

fetchData(city)