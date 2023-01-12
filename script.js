//Global Variables

var resultCity=document.querySelector("#resultCity");
var currentTemp=$("#currentTemp");
var currentWind=$("#currentWind");
var currentHumidity=$("#currentHumidity");
var 
apiKey="46f48b1c2591f014d5caac1646b6d3ff"



//This function will be populating the results of the weather
function populateResults(result) {
    
   console.log(result[0])
   currentTemp.append("Temp: "+ result[0].temp + " &#176;F");
   currentHumidity.append("Humidity: " + result[0].humidity + "%");
   currentWind.append("Wind: " + result[0].wind + " MPH ");
   resultCity.textContent = result[0].city;
   
   for (var i = 1; i <= 5; i++) {
    $("#day"+i+" > .date").append(result[i].date.toString().substring(0,16))
    $("#day"+i+" > .Temp").append("Temp: "+ result[i].temp + " &#176;F");
    $("#day"+i+" > .wind").append("wind: "+ result[i].wind + " MPH ");
    $("#day"+i+" > .Humidity").append("Humidity: "+ result[i].humidity + " % ");
   } 


    
}

//The function will be getting the general weather data.
function fetchlonlat(city){
    var requestUrl= "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid=" + apiKey + "&contentType=json"
     return fetch(requestUrl).then(function(response) {
        return response.json();
    })
    .then(function(response) {
        
        
        var cityLon = response[0].lon;
        var cityLat = response[0].lat;

        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=imperial&cnt=40`)
           
            .then(function(response) {
                
                return response.json();
            })
      
            .then(function(response){
                
                var result ={ 
                0:{
                     date : new Date(response.list[0].dt*1000),
                    temp : response.list[0].main.temp,
                    wind : response.list[0].wind.speed,
                    humidity : response.list[0].main.humidity,},
                1:{
                     date : new Date(response.list[8].dt*1000),
                    temp : response.list[8].main.temp,
                    wind : response.list[8].wind.speed,
                    humidity : response.list[8].main.humidity,},
                2:{
                     date : new Date(response.list[16].dt*1000),
                    temp : response.list[16].main.temp,
                    wind : response.list[16].wind.speed,
                    humidity : response.list[16].main.humidity,},
                3:{
                     date : new Date(response.list[24].dt*1000),
                    temp : response.list[24].main.temp,
                    wind : response.list[24].wind.speed,
                    humidity : response.list[24].main.humidity,},
                4:{
                     date : new Date(response.list[32].dt*1000),
                temp : response.list[32].main.temp,
                wind : response.list[32].wind.speed,
                humidity : response.list[32].main.humidity,},
                5:{
                     date : new Date(response.list[39].dt*1000),
                temp : response.list[39].main.temp,
                wind : response.list[39].wind.speed,
                humidity : response.list[39].main.humidity,},
                
                
                }
                
                result.city = response.city.name
             
                 populateResults(result);

                
            })

   
  })

}
var result= fetchlonlat("San Francisco")
