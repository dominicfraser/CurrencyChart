var app = function(){
  var inputElement = document.getElementById("search-query");
  inputElement.addEventListener('keydown', searchInput);

};

var searchInput = function(e){
  var inputElement = document.getElementById("search-query");
  var input = inputElement.value;
  var url = "http://api.fixer.io/latest?base=GBP";

  if (input === "") return;

  if (e.key === "Enter"){
    makeRequest(url, requestComplete); 
  }
};

var requestComplete = function(){
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var rates = JSON.parse(jsonString).rates;

  findRate(rates);
};

var findRate = function(ratesObject){
  var inputElement = document.getElementById("search-query");
  var input = inputElement.value;
  var rateP = document.getElementById("rate");
  rateP.innerHTML = ""
console.log(ratesObject)
  var foundRate = ratesObject[input.toUpperCase()];
  rateP.innerText = foundRate;

}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback)
  request.send();
}

window.addEventListener('load', app);
