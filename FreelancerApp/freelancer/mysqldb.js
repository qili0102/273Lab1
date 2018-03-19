var mysql = require('mysql');
var jwt = require('jsonwebtoken');
// var config = require('./config');

// Simple mysql connection
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'freelance'
//   });

// connection.connect(function(err){
// if(!err) {
//     console.log("Database is connected ... nn");
// } else {
//     console.log("Error connecting database ... nn");
// }
// });

//MySQL Connection Pool
var pool = mysql.createPool({
    connectionLimit:10,
    host: '127.0.0.1',
    user:'root',
    database:'freelance',
    debug: false
});

const db_name='freelance';
const users_table = 'users';
const projects_table = 'projects';
const bids_table = 'bids';

const select_user_query_by_email="select * from "+users_table+" where email = ?";
const select_project_by_id="select * from "+projects_table+" where id = ?";
const select_bid_by_id = "select * from "+bids_table+" where id = ?";
const select_project_by_user="select * from "+projects_table+" where post_user = ?";
const select_bid_by_user='select * from ' + bids_table +' join '+projects_table +' on bids.project = projects.id' +
' where user = ?';
const select_open_project="select * from "+projects_table+" where status = 'open'";

const insert_user = "INSERT INTO "+users_table+" (`email`, `username`, `password`, `img_path`, `desc`, `skills`, `post_prj`, `bid_prj`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
const insert_project = "INSERT INTO "+projects_table+" (`title`, `desc`, `file_path`, `skills`, `budget_range`, `post_user`, `status`, `bid_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
const insert_bid = "INSERT INTO "+bids_table+" (`user`, `project`, `price`, `period`, `won`) VALUES (?, ?, ?, ?, ?)";

const update_user = "UPDATE "+users_table+" SET username=?, password=?, img_path=?, desc=?, skills=?, post_prj=?, bid_prj=? WHERE email=?";
const update_project = "UPDATE "+projects_table+" SET title=?, desc=?, file_path=?, skills=?, budget_range=?, post_user=?, status=?, bid=? WHERE id=?";
const update_bids = "UPDATE "+bids_table+" SET user=?, project=?, price=?, period=?, won=? WHERE id=?";

const get_avg_bid="SELECT AVG(price) AS avgbid FROM "+bids_table+" WHERE project=?";

exports.getUser=function (email, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("db connection failed");
            res.status(400).send('db failed');
            return;
        }else{
            console.log("db connected");
            connection.query(select_user_query_by_email,[email], function (err, results) {
                connection.release();
                if (!err) {
                    console.log(results[0]);
                    res.status(200).send(results[0]);
                }else{
                    res.status(400).send('not geting the right user');
                    return;
                }
            });
            connection.on('error', function (err) {
                res.status(400).send('Error on db operation');
                return;
            })
        }
    })
};

exports.getProject=function (id, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("db connection failed");
            res.status(400).send('db failed');
            return;
        }else{
            console.log("db connected");
            connection.query(select_project_by_id,[id], function (err, results) {
                connection.release();
                if (!err) {
                    console.log(results[0]);
                    res.status(200).send(results[0]);
                }else{
                    res.status(400).send('project getting error');
                    return;
                }
            });
            connection.on('error', function (err) {
                res.status(400).send('Error on db operation');
                return;
            })
        }
    })
};

exports.getProjectByUser=function (email, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("db connection failed");
            res.status(400).send('db failed');
            return;
        }else{
            console.log("db connected");
            connection.query(select_project_by_user,[email], function (err, results) {
                connection.release();
                if (!err) {
                    console.log(results);
                    res.status(200).send(results);
                }else{
                    res.status(400).send('project getting error');
                    return;
                }
            });
            connection.on('error', function (err) {
                res.status(400).send('Error on db operation');
                return;
            })
        }
    })
};

exports.getOpenProject=function (res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("db connection failed");
            res.status(400).send('db failed');
            return;
        }else{
            console.log("db connected");
            connection.query(select_open_project, function (err, results) {
                connection.release();
                if (!err) {
                    console.log(results);
                    res.status(200).send(results);
                }else{
                    res.status(400).send('project getting error');
                    return;
                }
            });
            connection.on('error', function (err) {
                res.status(400).send('Error on db operation');
                return;
            })
        }
    })
};

exports.getBidsByUser=function (email, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("db connection failed");
            res.status(400).send('db failed');
            return;
        }else{
            console.log("db connected");
            connection.query(select_bid_by_user,[email], function (err, results) {
                connection.release();
                if (!err) {
                    console.log(results);
                    res.status(200).send(results);
                }else{
                    res.status(400).send('project getting error');
                    return;
                }
            });
            connection.on('error', function (err) {
                res.status(400).send('Error on db operation');
                return;
            })
        }
    })
};

exports.getBid=function (id, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("db connection failed");
            return;
        }else{
            console.log("db connected");
            connection.query(select_bid_by_id,[id], function (err, results) {
                connection.release();
                if (!err) {
                    console.log(results[0]);
                    res.status(200).send(results[0]);
                }
                else{
                    res.status(400).send('bid getting failure');
                    return;
                }
            });
            connection.on('error', function (err) {
                res.status(400).send('Error on db operation');
                return;
            })
        }
    })
};

exports.getAvgBid=function (project, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("db connection failed");
            res.status(400).send('db failed');
            return;
        }else{
            console.log("db connected");
            connection.query(get_avg_bid,[project], function (err, results) {
                connection.release();
                if (!err) {
                    console.log(results[0]);
                    res.status(200).send(results[0]);
                }else{
                    res.status(400).send('cannot get the avg bid');
                    return;
                }
            });
            connection.on('error', function (err) {
                res.status(400).send('Error on db operation');
                return;
            })
        }
    })
};

exports.addUser=function (email, username, password, img_path, desc, skills, post_prj, bid_prj, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("db connection failed");
            res.status(500).send('db failed');
            return;
        }else{
            console.log("db connected" + insert_user);
            connection.query(insert_user,[email, username, password, img_path, desc, skills, post_prj, bid_prj], function (err, results) {
                connection.release();
                if (!err) {
                    console.log("inserted");
                    // var token = jwt.sign({email:email},config.secret, {
                    //     expiresIn: 86400 //expires in 24 hours
                    // });
                    // res.status(201).send({auth: true, token: token});
                    res.status(201).send("inserted");
                }
                else{
                    res.status(400).send('insert failed'+err.message);
                    return;
                }
            });
            connection.on('error', function (err) {
                res.status(400).send('Error on db operation');
                return;
            })
        }
    })
};

exports.addProject=function (title, desc, file_path, skills, budget_range, post_user, status, bid_id, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("db connection failed");
            res.status(400).send('db failed');
            return;
        }else{
            console.log("db connected");
            connection.query(insert_project,[title, desc, file_path, skills, budget_range, post_user, status, bid_id], function (err, results) {
                connection.release();
                if (!err) {
                    console.log("inserted");
                    res.status(201).send('inserted');
                }
                else{
                    res.status(400).send('add project failed');
                    return;
                }
            });
            connection.on('error', function (err) {
                res.status(400).send('Error on db operation');
                return;
            })
        }
    })
};

exports.addBid=function (user, project, price, period, won, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("db connection failed");
            res.status(400).send('db failed');
            return;
        }else{
            console.log("db connected");
            connection.query(insert_bid,[user, project, price, period, won], function (err, results) {
                connection.release();
                if (!err) {
                    console.log("inserted");
                    res.status(201).send('inserted');
                }else{
                    res.status(400).send('bid inserted fail');
                    return;
                }
            });
            connection.on('error', function (err) {
                res.status(400).send('Error on db operation');
                return;
            })
        }
    })
};

exports.updateUser=function (email, username, password, img_path, desc, skills, post_prj, bid_prj, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("db connection failed");
            res.status(400).send('db failed');
            return;
        }else{
            console.log("db connected");
            connection.query(update_user,[username, password, img_path, desc, skills, post_prj, bid_prj, email], function (err, results) {
                connection.release();
                if (!err) {
                    console.log("updated");
                    res.status(202).send('updated');
                }else{
                    res.status(400).send('updated failed');
                    return;
                }
            });
            connection.on('error', function (err) {
                res.status(400).send('Error on db operation');
                return;
            })
        }
    })
};

exports.updateProject=function (id, title, desc, file_path, skills, budget_range, post_user, status, bid_id, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("db connection failed");
            res.status(400).send('db connect failed');
            return;
        }else{
            console.log("db connected");
            connection.query(insert_project,[title, desc, file_path, skills, budget_range, post_user, status, bid_id, id], function (err, results) {
                connection.release();
                if (!err) {
                    console.log("updated");
                    res.status(202).send('updated');
                }else{
                    res.status(400).send('updated failed');
                    return;
                }
            });
            connection.on('error', function (err) {
                res.status(400).send('Error on db operation');
                return;
            })
        }
    })
};

exports.updateBid=function (id, user, project, price, period, won, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("db connection failed");
            res.status(400).send('db connect failed');
            return;
        }else{
            console.log("db connected");
            connection.query(update_bids,[user, project, price, period, won, id], function (err, results) {
                connection.release();
                if (!err) {
                    console.log("updated");
                    res.status(202).send('updated');
                }else{
                    res.status(400).send('updated failed');
                    return;
                }
            });
            connection.on('error', function (err) {
                res.status(400).send('Error on db operation');
                return;
            })
        }
    })
};