var express = require('express');
var bodyParser = require('body-parser');
var to_do_router = require('./to_do_router');
const app = express()
const port = process.env.port || 8086

//app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(upload.array())


//Use the Router on the sub route /movies
app.use('/api', to_do_router);



app.listen(port ,function(){

    console.log("server is running on:port 8086",'\n', 
                "1.POST:"+ "http://localhost:8086/api/todo/" ,'\n',
                "2.GET:" + "http://localhost:8086/api/todos" ,'\n',
                "3.GET:" + "http://localhost:8086/api/todo/1" ,'\n',
                "4.POST:" + "http://localhost:8086/api/todo/1/done" ,'\n',
                "5.DELETE:" + "http://localhost:8086/api/todo/2/delete" ,'\n',
    )
})