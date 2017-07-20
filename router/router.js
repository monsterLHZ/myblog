/*var multipart = require('connect-multiparty'); //在处理模块中引入第三方解析模块 
var multipartMiddleware = multipart();*/
let fs = require('fs');
let db = require('../db/db.js');
let path=require('path');
module.exports = (app) => {
    app.post('/updateimg/:image', (req, res) => {
        let img = req.body.img.split(',')[1];
        fs.writeFile('./img/' + req.body.name, img, 'base64', (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(400);
            } else {
                res.sendStatus(200);
            }
        });
    });

    app.post('/publish', (req, res) => {
        if (req.session.user) {
            let data = req.body;
            //console.log(data.id);
            if (data.id) {
                db.changedata(data, (err) => {
                    if (err) {
                        // statement
                        res.status(400).json(err);
                    } else {
                        res.sendStatus(200);
                    }
                });
            } else {
                if (db.publish(data)) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(400);
                }
            }

        } else {
            res.status(400).json({ info: '你没有发表权限' });
        }

    });

    app.get('/getlist', (req, res) => {
        db.findlist(res);
    });

    app.get('/blog/:id', (req, res) => {
        db.findblog(req.params.id, res);
    });

    app.post('/login', (req, res) => {
        db.finduser(req.body, (data) => {
            if (data) {
                req.session.user = data._id;
                res.redirect('/update');
            } else {
                res.redirect('/');
            }
        });
    });

    app.get('/update', (req, res) => {
        let read = fs.createReadStream(path.join(__dirname,'../userhtml/update.html'));
        if (req.session.user) {
            read.on('data', (chunk) => {
                res.write(chunk);
            });
            read.on('end', () => {
                res.end();
            });
        } else {
            res.redirect('/');
        }
    });

    app.get('/login', (req, res) => {
        res.redirect('/login.html');
    });

    app.get('/delete/:id', (req, res) => {
        db.deleteblog(req.params.id, (err) => {
            if (err) {
                res.status(400).json(err);
            } else {
                res.redirect('/');
            }
        });
    });

    app.get('*', (req, res) => {
        res.redirect('/');
    });
}