var app = function(){
  var url = "http://api.fixer.io/latest?base=GBP";
  makeRequest(url, populateDropDown);

  var inputElement = document.getElementById("search-query");
  inputElement.addEventListener("change", searchInput);

  ratesArray = [0,0,0,0,0,0,0]
  var chart = new HistoryChart("NONE", ratesArray);
};

var populateDropDown = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var rates = JSON.parse(jsonString).rates;

  var inputElement = document.getElementById("search-query");
  for(rate in rates){
    var option = document.createElement("option");
    option.innerText = rate
    inputElement.appendChild(option);
  }
}

var searchInput = function(e){
  var inputElement = document.getElementById("search-query");
  var input = inputElement.value;
  var url = "http://api.fixer.io/latest?base=GBP";

  if (input === "") return;

    makeRequest(url, findTodaysRate); 
};

var findTodaysRate = function(){
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var rates = JSON.parse(jsonString).rates;

  setRate(rates);
};

var setRate = function(ratesObject){
  var inputElement = document.getElementById("search-query");
  var input = inputElement.value;
  var rateP = document.getElementById("rate");
  rateP.innerHTML = ""
console.log(ratesObject)
  var foundRate = ratesObject[input.toUpperCase()];
  rateP.innerText = foundRate;
  ratesArray[6] = foundRate
  getHistoryChartArray(input.toUpperCase())
};

var getHistoryChartArray = function(currency){
  for(var i = 0; i < ratesArray.length-1; i++){
    var today = new Date();
    today.setDate((today.getDate()-(6-i)));

    var todayUTC = today.toISOString().substring(0,10);
    
    var url = "https://api.fixer.io/" + todayUTC + "/latest?base=GBP"

    getHistRate(url, currency, i)
    };
  var chart = new HistoryChart(currency, ratesArray);
};

var getHistRate = function(url, currency, index){
  makeRequest(url, function(){
    if(this.status !== 200) return;

    var jsonString = this.responseText;
    var ratesOb = JSON.parse(jsonString).rates;
    var foundRate = ratesOb[currency];
    console.log(index)
    ratesArray[index] = foundRate;
    var chart = new HistoryChart(currency, ratesArray);
  })
};

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback)
  request.send();
};

window.addEventListener('load', app);
