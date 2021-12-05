var msData = getData("/users/getMaritalData");
var bldata = [];
$.each(msData.labels, function(i, el){
    if($.inArray(el, bldata) === -1) bldata.push(el);
});
var bfmap = msData.data;
var bcd = getBarDataset(bfmap);
console.log("bcd---"+bcd);
var mconfig = {
    type: 'bar',
    data: {
        labels: bldata,
        datasets: bcd,
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Spend by Marital Status per Year',
        },
        scales: {
            xAxes: {
                scaleLabel: {
                    display: true,
                    labelString: 'MARITAL STATUS',
                },
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 3,
                } 
            },
            yAxes: {
                scaleLabel: {
                    display: true,
                    labelString: 'SPEND',
                },
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        console.log("ms y val ---"+value);
                        return yAxisLabels[(value*10).toLocaleString()+"K"]
                    }
                }
            }
        }
    }
};

var mctx = $("#mscanvas").get(0).getContext("2d");
var bchart = new Chart(mctx, mconfig);