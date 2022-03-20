chartIt();

async function chartIt() {
      const data = await getData();
      const ctx = document.getElementById('chart').getContext('2d');
      const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                  labels: data.xs,
                  datasets: [{
                        label: 'Anzahl Infizierter im Kanton SG',
                        data: data.ys,
                        fill: false,
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)'
                  }]
            },
            options: {
                  scales: {
                        yAxes: [{
                              ticks: {
                                    callback: function(value, index, values) {
                                          return value;
                                    }
                              }
                        }]
                  }
            }
      });
}

async function getData() {
      const totals = [];
      const xs = [];
      const ys = [];
      const api_url = 'https://covid19-rest.herokuapp.com/api/openzh/v1/country/CH';
      let response = await fetch(api_url);

      let data = await response.json();

      console.log('Output data: ', data);
      document.getElementById("current_hosp_fwd").innerHTML =data.totals.current_hosp_fwd;
      document.getElementById("ncumul_tested_fwd").innerHTML =data.totals.ncumul_tested_fwd
      document.getElementById("current_icu_fwd").innerHTML =data.totals.current_icu_fwd;
      document.getElementById("ncumul_released_fwd").innerHTML =data.totals.ncumul_released_fwd;
      document.getElementById("ncumul_deceased_fwd").innerHTML =data.totals.ncumul_deceased_fwd;


      data.records.forEach((d) => {
            if(d.abbreviation_canton_and_fl === "SG") {
                  x_data = formatDate(d.date);
                  xs.push(x_data);

                  y_data = +d.ncumul_conf;
                  ys.push(y_data);
            }
      });

      function formatDate(date) {
            var d = new Date(date),
             month = '' + (d.getMonth() + 1),
             day = '' + d.getDate(),
             year = d.getFullYear();

            if (month.length < 2)
             month = '0' + month;
            if (day.length < 2)
             day = '0' + day;

            return [year, month, day].join('-');
      }
      return {
            xs,
            ys
      };
}
