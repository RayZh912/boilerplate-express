let express = require('express');
let bodyParser = require('body-parser'); 
let app = express();

// 从 .env 文件加载环境变量
require('dotenv').config();

console.log("Hello World");


// 日志中间件函数
app.use((req, res, next) => {
    const logString = `${req.method} ${req.path} - ${req.ip}`;
    console.log(logString);
    next(); // 调用下一个中间件/路由处理器
});



app.use(bodyParser.urlencoded({ extended: false }));


// 为根路由提供 index.html 文件
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});


// 从 "public" 目录提供静态文件
app.use("/public", express.static(__dirname + "/public"));


// 处理 /json 路由
app.get("/json", (req, res) => {
    // 检查 MESSAGE_STYLE 环境变量
    const message = "Hello json";
    if (process.env.MESSAGE_STYLE === 'uppercase') {
        res.json({ message: message.toUpperCase() });
    } else {
        res.json({ message: message });
    }
});


// 处理 /now 路由，添加当前时间的中间件
app.get('/now', function(req, res, next) {
    req.time = new Date().toString(); // 设置当前时间到请求对象
    next(); // 调用下一个中间件/处理器
}, function(req, res) {
    res.json({ time: req.time }); // 返回 JSON 对象
});


app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({ echo: word });
});


app.get("/name", function(req, res) {
    var firstName = req.query.first;
    var lastName = req.query.last;

    // OR you can destructure and rename the keys
    var { first: firstName, last: lastName } = req.query;

    // Use template literals to form a formatted string
    res.json({ name: `${firstName} ${lastName}` });
});



app.post("/submit", (req, res) => {
    res.json({ name: req.body.name, age: req.body.age });
});



app.post("/name", function(req, res) {
    // Handle the data in the request
    var string = req.body.first + " " + req.body.last;
    res.json({ name: string });
});















 module.exports = app;
