'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer'),
	bodyParser = require('body-parser'),
	path = require('path');
var upload = multer({ dest: './uploads/'})
// require and use "multer"...

var app = express();
app.use(bodyParser.json())
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){ //upfile
  res.json({greetings: "Hello, API"});
});
app.post('/api/fileanalyse',upload.single('upfile'), function(req,res){
	console.log('{size: '+req.file+'}'); //form files
  var fsize = req.file.size;
  var fname = req.file.originalname;
  var ftype = req.file.mimetype;
	res.json({name:fname,type:ftype,size: fsize, });
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
