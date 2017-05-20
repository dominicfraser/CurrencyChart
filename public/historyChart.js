var HistoryChart = function(currency, rateArray){
  var container = document.querySelector("#history-chart")

  var dates = []
  setDates(dates);

  var chart = new Highcharts.Chart({
    chart: {
      type: "area",
      renderTo: container
    },
    title: {
      text: "Historical Rates"
    },
    series: [
      {
        name: currency,
        data: rateArray
      }
    ],
    yAxis: {
        type: 'logarithmic',
    },
    xAxis: {
      categories: dates
    }
  });

  document.getElementsByClassName("highcharts-credits")[0].innerHTML = "Dominic"

};

var setDates = function(datesArray){
  var today = new Date();
  var todaym1 = new Date();
  var todaym2 = new Date();
  var todaym3 = new Date();
  var todaym4 = new Date();
  var todaym5 = new Date();
  var todaym6 = new Date();


  var todayUTC = today.toISOString().substring(0,10);

  todaym1.setDate((today.getDate()-1));
  todaym1UTC = todaym1.toISOString().substring(0,10);

  todaym2.setDate((today.getDate()-2));
  todaym2UTC = todaym2.toISOString().substring(0,10);

  todaym3.setDate((today.getDate()-3));
  todaym3UTC = todaym3.toISOString().substring(0,10);

  todaym4.setDate((today.getDate()-4));
  todaym4UTC = todaym4.toISOString().substring(0,10);

  todaym5.setDate((today.getDate()-5));
  todaym5UTC = todaym5.toISOString().substring(0,10);

  todaym6.setDate((today.getDate()-6));
  todaym6UTC = todaym6.toISOString().substring(0,10);

  datesArray.push(todaym6UTC);
  datesArray.push(todaym5UTC);
  datesArray.push(todaym4UTC);
  datesArray.push(todaym3UTC);
  datesArray.push(todaym2UTC);
  datesArray.push(todaym1UTC);
  datesArray.push(todayUTC);
}