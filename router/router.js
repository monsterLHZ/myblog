/*var multipart = require('connect-multiparty'); //在处理模块中引入第三方解析模块 
var multipartMiddleware = multipart();*/
let fs=require('fs');
let db=require('../db/db.js');
module.exports=(app)=>{
	app.post('/updateimg/:image',(req,res)=>{
		let img=req.body.img.split(',')[1];
		fs.writeFile('F:/myblog/img/'+req.body.name, img, 'base64',(err)=>{
			if(err){
				console.log(err);
				res.sendStatus(400);	
			}else{
				res.sendStatus(200);
			}
		});
	});

	app.post('/publish',(req,res)=>{
		let data=req.body;
		if(db.publish(data)){
			res.sendStatus(200);
		}else {
			res.sendStatus(400);
		}
	});

	app.get('/getlist',(req,res)=>{
		db.findlist(res);
	});

	app.get('/blog/:id',(req,res)=>{
		db.findblog(req.params.id,res);
	});
}