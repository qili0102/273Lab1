var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'freelancer_user'
  });

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");
} else {
    console.log("Error connecting database ... nn");
}
});

app.get('/index', function (req, res) {
    console.log('index');
    res.json({message:'something'});
    console.log(res);
});

app.post('/adduser', function(req, res){
    console.log("Adding user");
    var username = req.body.username;
    var password = req.body.password;
    connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], function(err, result){
        if(err){
            console.log("insert failure");
            res.status(404);
        }else{
            console.log("inserted."+username+" "+password);
            res.status(200);
        }
    })}
    );

    app.post('/comfirm', function(req, res){
        console.log("user login");
        var username = req.body.username;
        var password = req.body.password;
        connection.query('SELECT * FROM users WHERE username=?', [username], function(err, result){
            if(err){
                console.log("select query failure");
                res.status(404);
            }else{
                if(result.length > 0 && result[0].password==password){
                    res.status(200).send(result[0]);
                }
                else{
                    if (result.length > 0 ) {
                        res.status(203).send(result[0]);
                    }
                    else{
                        res.status(204).send(result[0]);
                    }
                }
            }
        });
    });

app.listen(5000, function(){
    console.log('listening to this joint on port 5000');
});