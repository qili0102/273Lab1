var mysql = require('mysql');

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

const insert_user = "INSERT INTO "+users_table+" (email, username, password, img_path, desc, skills, post_prj, bid_prj) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
const insert_project = "INSERT INTO "+projects_table+" (title, desc, file_path, skills, budget_range, post_user, status, bid_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
const insert_bid = "INSERT INTO "+bids_table+" (user, project, price, period, won) VALUES (?, ?, ?, ?, ?)";

const update_user = "UPDATE "+users_table+" SET username=?, password=?, img_path=?, desc=?, skills=?, post_prj=?, bid_prj=? WHERE email=?";
const update_project = "UPDATE "+projects_table+" SET title=?, desc=?, file_path=?, skills=?, budget_range=?, post_user=?, status=?, bid=? WHERE id=?";
const update_bids = "UPDATE "+bids_table+" SET user=?, project=?, price=?, period=?, won=? WHERE id=?";

const get_avg_bid="SELECT AVG(price) AS avgbid FROM "+bids_table+" WHERE project=?";

exports.getUser=function (email, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("db connection failed");
            return;
        }else{
            console.log("db connected");
            connection.query(select_user_query_by_email,[email], function (err, results) {
                connection.release();
                if (!err) {
                    console.log(results[0]);
                    res.send(results[0]);
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
            return;
        }else{
            console.log("db connected");
            connection.query(select_project_by_id,[id], function (err, results) {
                connection.release();
                if (!err) {
                    console.log(results[0]);
                    res.send(results[0]);
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
                    res.send(results[0]);
                }
            });
            connection.on('error', function (err) {
                res.status(400).send('Error on db operation');
                return;
            })
        }
    })
};

exports.getAvgBid=function (email, res) {
    pool.getConnection(function (err, connection) {
        if (err) {
            console.log("db connection failed");
            return;
        }else{
            console.log("db connected");
            connection.query(get_avg_bid,[email], function (err, results) {
                connection.release();
                if (!err) {
                    console.log(results[0]);
                    res.send(results[0]);
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
            return;
        }else{
            console.log("db connected");
            connection.query(insert_user,[email, username, password, img_path, desc, skills, post_prj, bid_prj], function (err, results) {
                connection.release();
                if (!err) {
                    console.log("inserted");
                    res.status(201);
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
            return;
        }else{
            console.log("db connected");
            connection.query(insert_project,[title, desc, file_path, skills, budget_range, post_user, status, bid_id], function (err, results) {
                connection.release();
                if (!err) {
                    console.log("inserted");
                    res.status(201);
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
            return;
        }else{
            console.log("db connected");
            connection.query(insert_bid,[user, project, price, period, won], function (err, results) {
                connection.release();
                if (!err) {
                    console.log("inserted");
                    res.status(201);
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
            return;
        }else{
            console.log("db connected");
            connection.query(update_user,[username, password, img_path, desc, skills, post_prj, bid_prj, email], function (err, results) {
                connection.release();
                if (!err) {
                    console.log("inserted");
                    res.status(202);
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
            return;
        }else{
            console.log("db connected");
            connection.query(insert_project,[title, desc, file_path, skills, budget_range, post_user, status, bid_id, id], function (err, results) {
                connection.release();
                if (!err) {
                    console.log("inserted");
                    res.status(201);
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
            return;
        }else{
            console.log("db connected");
            connection.query(update_bids,[user, project, price, period, won, id], function (err, results) {
                connection.release();
                if (!err) {
                    console.log("inserted");
                    res.status(201);
                }
            });
            connection.on('error', function (err) {
                res.status(400).send('Error on db operation');
                return;
            })
        }
    })
};