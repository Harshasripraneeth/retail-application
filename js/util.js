var hsdata = null; 

//helps us in handling table in search hshd.
function onSearch(hnum){
    $('#rstable').removeClass('hide');
    if ( $.fn.DataTable.isDataTable('#rstable') ) {
        $('#rstable').DataTable().destroy();
        $('#rstable tbody').empty();
    }
    drawSearchGrid(hnum);
}

//helps us to get data.
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
            console.log("error in getData: "+e);
        }
    });
    return data;
}

//helps us to draw table in search hshd.
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

//helps us to handle table in sample hshd.
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
