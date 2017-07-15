var express = require('express');
var app = express();

app.use(express.static(__dirname + '/view'));

/*app.get('/', function(req, res) {
    res.send('hello world');
});*/

app.listen(80,()=>{
	console.log('服务器已开启！');
});
