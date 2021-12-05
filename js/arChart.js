var arData = getData("/users/getAgeRangeData");
var ldata = [];
$.each(arData.labels, function(i, el){
    if($.inArray(el, ldata) === -1) ldata.push(el);
});
var fmap = arData.data;
var cd = getLineDataset(fmap);
//console.log("cd---"+cd);
var config = {
    type: 'line',
    data: {
        labels: ldata,
        datasets: cd,
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Spend by Age Range per Year',
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true,
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'AGE RANGE',
                },
                ticks: {
                    beginAtZero: true,
                },
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'SPEND'
                },
                ticks: {
                    beginAtZero: true,
                    steps: 20,
                    stepValue: 10,
                    max: 500,
                    callback: function(value, index, values) {
                        //console.log("act--"+value);
                        return (value).toLocaleString()+"K"
                    }
                }
            }]
        }
    }
};
var ctx = $("#arcanvas").get(0).getContext("2d");
var lchart = new Chart(ctx, config);