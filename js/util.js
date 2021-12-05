var hsdata = null; 

function onSearch(hnum){
    $('#rstable').removeClass('hide');
    if ( $.fn.DataTable.isDataTable('#rstable') ) {
        $('#rstable').DataTable().destroy();
        $('#rstable tbody').empty();
    }
    drawSearchGrid(hnum);
}

function getData(surl) {
    var data= null;
    $.ajax({
        type: "GET",
        async: false,
        url: surl,
        dataType: "json",
        success: function (obj) { 
            data = obj;
        },
        error: function (e){ 
            console.log("error in getData--"+e);
        }
    });
    return data;
}

function drawSearchGrid(hnum) {
    $('#rstable').DataTable( {
        "ajax": "/users/hnum?hnum="+hnum,
        "columns": [
            { "data": "HSHD_NUM" },
            { "data": "BASKET_NUM" },
            { "data": "PURCHASE_DATE" },
            { "data": "PRODUCT_NUM" },
            { "data": "DEPARTMENT" },
            { "data": "COMMODITY" },
            { "data": "SPEND" },
            { "data": "UNITS" },
            { "data": "STORE_REGION" },
            { "data": "WEEK_NUM" },
            { "data": "YEAR" },
            { "data": "LOYALTY_FLAG" },
            { "data": "AGE_RANGE" },
            { "data": "MARITAL_STATUS" },
            { "data": "INCOME_RANGE" },
            { "data": "HOMEOWNER_DESC" },
            { "data": "HSHD_COMPOSITION" },
            { "data": "HH_SIZE" },
            { "data": "CHILDREN" }
        ],
        "language": {
            "searchPlaceholder": "Search by HSHD_NUM"
        },
        "scrollX": true,
        "searching": false,
        "initComplete":function(){onint();}
    } );
}

// helps us to intialize the event handlers
function onint(){
    $("#rstable_wrapper input[type='search']").off();

    $("#rstable_wrapper input[type='search']").on("keydown", function(evt){
        if(evt.keyCode == 13){
            var hnum = $("input[type='search']").val();
            $('#rstable').DataTable().ajax.url("/users/hnum?hnum="+hnum).load();
        }
    });
}

function drawGrid(id, url, jsonData) {
    $('#'+id).DataTable( {
       "ajax": url, 
        "columns": [
            { "data": "HSHD_NUM" },
            { "data": "BASKET_NUM" },
            { "data": "PURCHASE_DATE" },
            { "data": "PRODUCT_NUM" },
            { "data": "DEPARTMENT" },
            { "data": "COMMODITY" },
            { "data": "SPEND" },
            { "data": "UNITS" },
            { "data": "STORE_REGION" },
            { "data": "WEEK_NUM" },
            {"data": "YEAR"},
            { "data": "LOYALTY_FLAG" },
            { "data": "AGE_RANGE" },
            { "data": "MARITAL_STATUS" },
            { "data": "INCOME_RANGE" },
            { "data": "HOMEOWNER_DESC" },
            { "data": "HSHD_COMPOSITION" },
            { "data": "HH_SIZE" },
            { "data": "CHILDREN" }
        ],
        "processing": true,
        "scrollX": true,
        "searching": false
    } );
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


function getLineDataset(fmap) {
    var cdata = [];
    for (var key in fmap) {
        if (fmap.hasOwnProperty(key)) {
            var color = getRandomColor();
            var xdata = [];
            var v = fmap[key];
            v.forEach(function (ai) {
                xdata.push(Math.ceil(ai[1])/1000);
            });
            var d = {
                label: key,
                fill: false,
                backgroundColor: color,
                borderColor: color,
                data: xdata,
                showLine: true,
            }

            cdata.push(d);
        }
    }
    return cdata;
}


function getBarDataset(fmap) {
    var cdata = [];
    for (var key in fmap) {
        if (fmap.hasOwnProperty(key)) {
            var color = getRandomColor();
            console.log("color--"+color);
            var xdata = [];
            var v = fmap[key];
            v.forEach(function (ai) {
                xdata.push(Math.ceil(ai[1]/1000));
            });
            var d = {
                label: key,
                fill: false,
                backgroundColor: color,
                borderColor: color,
                data: xdata,
                borderWidth: 1
            }

            cdata.push(d);
        }
    }
    console.log("bardata---"+cdata);
    return cdata;
}

function getPieDataset(xdata) {
    var cdata = {};
    var xadata = [];
    var bc = [];
    xdata.forEach(function (ai) {
        xadata.push(ai.toPrecision(3));
        bc.push(getRandomColor()); 
    });
    cdata["data"] = xadata;
    cdata["backgroundColor"] = bc;
    console.log("pie-data xadata"+xadata);
    console.log("pie-data bc"+bc);
    console.log("pie-data"+JSON.stringify(cdata));
    return cdata;
}
   