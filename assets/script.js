let searchEL = document.getElementById('search-btn');
let capitolEL = document.querySelectorAll('.capitol-btn');




displayWeatherData = (data) => { 
    document.getElementById('city-name').innerText = data.city.name;
    document.getElementById('minTemp0').innerText = 'Low of ' + data.list[0].main.temp_min.toFixed(0) + ' °F';
    document.getElementById('maxTemp0').innerText = 'High of ' + data.list[0].main.temp_max.toFixed(0) + ' °F';
    const listNum = [0, 8, 16, 24, 32, 39];
    listNum.forEach((num, index) => {
        document.getElementById('date' + index).innerText = data.list[num].dt_txt.split(' ')[0];
        document.getElementById('temp' + index).innerText = 'Current Temperature: ' + data.list[num].main.temp.toFixed(0) + ' °F';
        document.getElementById('humidity' + index).innerText = 'Humidity: ' + data.list[num].main.humidity + '%';
        document.getElementById('wind' + index).innerText = 'Wind Speed: ' + data.list[num].wind.speed + ' mph';
        document.getElementById('icon' + index).src = 'https://openweathermap.org/img/wn/' + data.list[num].weather[0].icon + '.png';
    
    });
};

function getWeatherData(chosenCity) {
    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${chosenCity}&appid=28d152345e91987cbfc03a794bbf7131&units=imperial`
    ) .then(function(response) {
        return response.json();
    })
    .then(function(data){
        console.log(data);
        console.log('Done');
        displayWeatherData(data);
    })
}



searchEL.addEventListener('click', function(){
    let chosenCity = document.getElementById('city-input').value;
    console.log(chosenCity);
    getWeatherData(chosenCity);

    // Save search history
    searchHistory.push(chosenCity);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
});

capitolEL.forEach(function(btn) {
    btn.addEventListener('click', function(){
        let chosenCity = this.innerText;
        console.log(chosenCity);
        getWeatherData(chosenCity);
    });
});

document.addEventListener('DOMContentLoaded', function(){
    let chosenCity = 'Atlanta';
    console.log("Atlanta is the default city for this app.");
    getWeatherData(chosenCity);

    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    let searchHistoryEl = document.getElementById('search-history-list');
    
    let searchInput = document.getElementById('city-input');
    let searchHistoryDropdown = document.getElementById('search-history-dropdown');
    
    searchInput.addEventListener('mouseover', function() {
        searchHistoryDropdown.style.display = 'block';
    });

    searchInput.addEventListener('mouseout', function() {
        searchHistoryDropdown.style.display = 'none';
    });

   searchHistory.forEach((chosenCity) => {
        let listItem = document.createElement('li');
        listItem.textcontent = chosenCity;
        searchHistoryEl.appendChild(listItem);

        listItem.addEventListener('click', function(){
            getWeatherData(chosenCity);
        })
    });
});


