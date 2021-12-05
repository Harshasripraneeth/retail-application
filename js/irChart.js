var irData = getData("/users/getIncomeRangeData");
var ildata = [];
$.each(irData.labels, function(i, el){
    if($.inArray(el, ildata) === -1) ildata.push(el);
});
console.log("ildata--"+ildata);
var ixdata = irData.data;
var ds = getPieDataset(ixdata);
console.log("ds--"+ds);
var irconfig = {
    type: 'pie',
    data: {
        labels: ildata,
        datasets: [ds],
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Spend Percecntage by Income Range'
        }
    }
};

var irctx = $("#ircanvas").get(0).getContext("2d");
var irchart = new Chart(irctx, irconfig);