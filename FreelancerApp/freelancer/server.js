var express = require('express');
var bodyParser = require('body-parser');
var db = require('./mysqldb');

var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.get('/index', function (req, res) {
//     console.log('index');
//     res.json({message:'something'});
//     console.log(res);
// });

app.post('/adduser', function(req, res){
    console.log("Adding user");
    console.log(req.body.email);
    db.addUser(req.body.email, req.body.username, 
        req.body.password, req.body.img_path,
        req.body.desc, req.body.skills, 
        req.body.post_prj,
        req.body.bid_prj, res
    );
});

app.post('/addproject', function(req, res){
    console.log("Adding project");
    db.addProject(req.body.title, 
        req.body.desc, 
        req.body.file_path, 
        req.body.skills, 
        req.body.budget_range, 
        req.body.post_user, 
        req.body.status, 
        req.body.bid_id, 
        res
    );
});

app.post('/addbid', function(req, res){
    console.log("Adding bid");
    db.addBid(req.body.user, 
        req.body.project, 
        req.body.price, 
        req.body.period, 
        req.body.won, 
        res
    );
});

app.post('/updateuser', function(req, res){
    console.log("update user");
    db.updateUser(req.body.email, req.body.username, 
        req.body.password, req.body.img_path,
        req.body.desc, req.body.skills, 
        req.body.post_prj,
        req.body.bid_prj, res
    );
});

app.post('/updateproject', function(req, res){
    console.log("update project");
    db.updateProject(
        req.body.id,
        req.body.title, 
        req.body.desc, 
        req.body.file_path, 
        req.body.skills, 
        req.body.budget_range, 
        req.body.post_user, 
        req.body.status, 
        req.body.bid_id, 
        res
    );
});

app.post('/updatebid', function(req, res){
    console.log("update bid");
    db.updateBid(
        req.body.id,
        req.body.user, 
        req.body.project, 
        req.body.price, 
        req.body.period, 
        req.body.won, 
        res
    );
});

app.post('/avgbid', function(req, res){
    console.log("average bid");
    db.getAvgBid(
        req.body.project, 
        res
    );
});

app.post('/getuser', function(req, res){
    console.log("get user");
    db.getUser(
        req.body.email, 
        res
    );
});

app.post('/getproject', function(req, res){
    console.log("get project");
    db.getProject(
        req.body.id, 
        res
    );
});

app.post('/getprojectbyuser', function(req, res){
    console.log("get project");
    db.getProjectByUser(
        req.body.email, 
        res
    );
});

app.post('/getopenproject', function(req, res){
    console.log("get project");
    db.getOpenProject(
        res
    );
});

app.post('/getbidbyuser', function(req, res){
    console.log("get bid");
    db.getBidsByUser(
        req.body.email, 
        res
    );
});

app.post('/getbid', function(req, res){
    console.log("get bid");
    db.getUser(
        req.body.id, 
        res
    );
});

app.get('/api/img/:path', function (req, res) {
    res.sendFile('public/img/'+req.param.path);
});

app.get('/api/file/:path', function (req, res) {
    res.sendFile('public/file/'+req.param.path);
});

//     app.post('/comfirm', function(req, res){
//         console.log("user login");
//         var username = req.body.username;
//         var password = req.body.password;
//         connection.query('SELECT * FROM users WHERE username=?', [username], function(err, result){
//             if(err){
//                 console.log("select query failure");
//                 res.status(404);
//             }else{
//                 if(result.length > 0 && result[0].password==password){
//                     res.status(200).send(result[0]);
//                 }
//                 else{
//                     if (result.length > 0 ) {
//                         res.status(203).send(result[0]);
//                     }
//                     else{
//                         res.status(204).send(result[0]);
//                     }
//                 }
//             }
//         });
//     });



app.listen(5000, function(){
    console.log('listening to this joint on port 5000');
});