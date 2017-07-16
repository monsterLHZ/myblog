/*var multipart = require('connect-multiparty'); //在处理模块中引入第三方解析模块 
var multipartMiddleware = multipart();*/
let fs=require('fs');
module.exports=(app)=>{
	app.post('/updateimg/:image',(req,res)=>{
		let img=req.body.img.split(',')[1];
		fs.writeFile('F:/myblog/img/'+req.body.name, img, 'base64',(err)=>{
			if(err){
				console.log(err);
				res.sendStatus(404);	
			}else{
				res.sendStatus(200);
			}
		});
	});
}