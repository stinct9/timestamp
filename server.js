var express = require("express");
var bodyParser = require('body-parser');

var app = express();

//app.use(bodyParser.json());

function returnUnix(unix) {
    
    var locale = "en-us";
    var date = new Date(unix*1000);
    var day = date.getDay() + 1;
    var month = date.toLocaleString(locale, { month: "long" });
    var year = date.getFullYear();
    
    var natural = month+" "+day+", "+year
    
    //console.log(year+month+year);

    var doc = {
    unix : unix,
    natural : natural
    };
    
    return doc;
}

app.get('/:data', function (req, res) {
    //console.log(req);
    var data = req.params.data;
    
    var nodata = {
      unix : null,
      natural : null
    };
    
    if ((new Date(data*1000)).getTime() > 0) {
        res.send(JSON.stringify(returnUnix(data)));
    }
    
    if (Date.parse(data) > 0) {
        var data = Date.parse(data)/1000;
        res.send(JSON.stringify(returnUnix(data)));
    }
    
    else if (isNaN(Date.parse(data))) {
        //console.log(true);
        res.end(JSON.stringify(nodata));
    }


});

app.get('*', function (req, res) {
    
    //console.log(body.originalUrl);
    
    var url = req.url;
    console.log(req);
    
    res.send(null);
   
});

app.listen(8080, function () {
   console.log('App listening on port 8080'); 
});