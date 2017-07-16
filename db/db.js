let mongoose = require('mongoose');
mongoose.Promise = global.Promise; //有可能是权限问题，如果没有这个会给警告
var db = mongoose.createConnection('localhost', 'blog'); //创建一个数据库连接
db.on('error', console.error.bind(console, '连接错误:'));
db.once('open', function() {
    //一次打开记录
});
let userSchema = new mongoose.Schema({
    name: { type: String, unique: true }, //定义一个属性name，类型为String,只能唯一（unique）
    psw: String
});

let blogSchema = new mongoose.Schema({
    title: String, //blog标题
    des: String, //blog描述
    type: String, //blog 类型
    time: String, //blog发表时间
    click: Number, //blog浏览次数
    text: String, //blog内容(markdown格式);
});

let userModel = db.model('userinfo', userSchema); //定义用户表
let blogModel = db.model('bloginfo', blogSchema); //定义博客表

function newuser(data) { //新建用户

}

function finduser(data) { //查找用户

}

module.exports = {
    newuser: (data) => { //新建用户

    },
    finduser: (data) => { //查找用户

    },
    publish: (data) => { //发表博客
        let blog = new blogModel({ title: data.title, des: data.des,type:data.type,time:data.date,click:0,text:data.textdes }); //实例化一行数据
        console.log(blog);
        blog.save((err)=>{
        	console.log(err);
        }); //插入数据
        return true;
    }
};