var Bugsnag = require('@bugsnag/js')
Bugsnag.start({apiKey: '672af45b350d56810ad71abe9a7c1abe'})
var express = require('express')
var jwt = require('jsonwebtoken')
var jwtDecode = require('jwt-decode');
var app = express()
var ObjectId = require('mongodb').ObjectId
var crypto   = require('crypto');
var stripe = require('stripe')('sk_test_5zi2Xjgttzn7usKp3R7gTM8p');
var datad = require('./data');
var async = require('async');
var request = require('request');
var sleep = require('sleep');
var error = require('./error');

var atatus = require("atatus-nodejs");
var mysql = require('mysql');
var redis = require('redis');
var async = require("async");
const cron = require("node-cron");

var connection = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'secret',
  database: 'todoapp'
});

var client = require('redis').createClient({
      host : '127.0.0.1',
      port : 6379,
      // no_ready_check: true,
      password: 'test'
});


app.get('/back', function(req, res, next) {
    // atatus.startBackgroundTransaction("Atatus test new");
    sleep.sleep(3);
    async.waterfall([
        // function(callback) {
        //     connection.query("SELECT * FROM authors", (err, res) => {
        //         if (err) {
        //           console.log("error: ", err);
        //           result(null, err);
        //           return;
        //         }
        //         console.log("customers: ", res);
        //         callback(null, "data");
        //     });
        // },
        // function(arg1, callback) {
        //     req.db.collection('P_users').find().sort({"_id": -1}).toArray(function(err, result) {
        //         //if (err) return console.log(err)
        //         if (err) {
        //             req.flash('error', err)
        //         } else {
        //             console.log(result);
        //             callback(null, arg1);
        //         }
        //     });
        // },
        function(callback) {
            client.set('my test keysss', 'my test value', redis.print);
            client.hset("nameeeee", "field", "value", callback);
            client.get('my test keysss', function(error, result) {
              if (error) throw error;
              console.log('GET result ->', result)
              callback(null);
            });
        }
    ], function (err, result) {
        if(err) {
            console.err(err);
        }
        // atatus.endTransaction();
        res.send("customers: ");
    });
});

app.get('/saran', async function(req, res, next) {
    atatus.startBackgroundTransaction("Atatus test");
    sleep.sleep(3);
    connection.query("SELECT * FROM authors", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("customers: ", res);
    });

    req.db.collection('P_users').find().sort({"_id": -1}).toArray(function(err, result) {
        //if (err) return console.log(err)
        if (err) {
            req.flash('error', err)
            res.render('user/list', {
                title: 'User List',
                data: ''
            })
        } else {
            console.log(result);
        }
    });

    client.set('my test key', 'my test value', redis.print);
    client.get('my test key', function(error, result) {
      if (error) throw error;
      console.log('GET result ->', result)
    });
    atatus.endTransaction();
    console.log("----------------------------------------------")
    res.send("customers: ");
});


app.get('/error', function(req, res, next){

    // for (var i = 0; i <= 20; i++) {
    //   console.log("----====");
    //   atatus.notifyError("error message" + i + 322321321);
    // }
    // assertionError();
    // Sentry.captureException(assertionError());

  // RangeError
    // require('net').connect(-1);
    // Sentry.captureException(require('net').connect(-1));

  // Reference Error
    // test("sefjdsfs");
    // Sentry.captureException(test("sefjdsfs"));

    // require('url').parse(() => { });
    // Sentry.captureException(require('url').parse(() => { }));

  // Syntax error
    throw new SyntaxError('Hello', 'someFile.js', 10);
    // Sentry.captureException(SyntaxError('Hello', 'someFile.js', 10))

    // res.status(401).send("error");
})



// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    // var span = atatus.startSpan("Processing data");
    // fetch and sort users collection by id in descending order
    // sleep.sleep(30);
    req.db.collection('P_users').find().sort({"_id": -1}).toArray(function(err, result) {
        //if (err) return console.log(err)
        if (err) {
            req.flash('error', err)
            res.render('user/list', {
                title: 'User List',
                data: ''
            })
        } else {
            // render to views/user/list.ejs template file
            res.render('user/list', {
                title: 'User List',
                data: result
            })
        }
    })
    // span.end();
})

app.get('/getname', function(req, res, next) {
    // var span = atatus.startSpan("Processing data");
    // fetch and sort users collection by id in descending order
    sleep.sleep(30);
    var o_idd = new ObjectId("5f06d81661c4e724f381363c")
    req.db.collection('P_users').find({"_id": o_idd }).sort({"_id": -1}).toArray(function(err, result) {
        //if (err) return console.log(err)
        if (err) {
            req.flash('error', err)
            res.render('user/list', {
                title: 'User List',
                data: ''
            })
        } else {
            // render to views/user/list.ejs template file
            res.send(result);
        }
    })
    // span.end();
})


// SHOW ADD USER FORM
app.get('/add', function(req, res, next){
    // render to views/user/add.ejs
    // res.status(401).send("401")
    // datad.forEach(function (name) {
    //     console.log(":::::::",name)
    // });

    // error.CustomError("test data");
    // atatus.startBackgroundTransaction("add data");

    // Your code here.
    // atatus.endTransaction();

    res.render('user/add', {
        title: 'Add New User',
        name: '',
        age: '',
        email: ''
    })
})

// ADD NEW USER POST ACTION
app.post('/add', function(req, res, next){

    req.assert('name', 'Name is required').notEmpty()           //Validate name
    req.assert('age', 'Age is required').notEmpty()             //Validate age
    req.assert('email', 'A valid email is required').isEmail()  //Validate email
    sleep.sleep(3)
    atatus.setUserContext({ id: 1242, name: "testdata", email: "test@atatus.com"});
    var errors = req.validationErrors()

    // sleep.sleep(2000);

    if( !errors ) {   //No errors were found.  Passed Validation!

        /********************************************
         * Express-validator module

        req.body.comment = 'a <span>comment</span>';
        req.body.username = '   a user    ';

        req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
        req.sanitize('username').trim(); // returns 'a user'
        ********************************************/
        var user = {
            name: req.sanitize('name').escape().trim(),
            age: req.sanitize('age').escape().trim(),
            email: req.sanitize('email').escape().trim()
        }
        // console.log("++++++++", user);

        // sleep.sleep(15);
        req.db.collection('P_users').insert(user, function(err, result) {
            if (err) {
                req.flash('error', err)

                // render to views/user/add.ejs
                res.render('user/add', {
                    title: 'Add New User',
                    name: user.name,
                    age: user.age,
                    email: user.email
                })
            } else {
                req.flash('success', 'Data added successfully!')

                // redirect to user list page
                res.redirect('/users')

                // render to views/user/add.ejs
                /*res.render('user/add', {
                    title: 'Add New User',
                    name: '',
                    age: '',
                    email: ''
                })*/
            }
        })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        /**
         * Using req.body.name
         * because req.param('name') is deprecated
         */
        res.render('user/add', {
            title: 'Add New User',
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        })
    }
})

// SHOW EDIT USER FORM ,  sleep: 1, secs: 10
app.get('/edit/(:id)', function(req, res, next){
    var o_id = new ObjectId(req.params.id)
    req.db.collection('P_users').find({"_id": o_id }).toArray(function(err, result) {
        if(err) return console.log(err)

        // if user not found
        if (!result) {
            req.flash('error', 'User not found with id = ' + req.params.id)
            res.redirect('/users')
        }
        else { // if user found
            // render to views/user/edit.ejs template file
            res.render('user/edit', {
                title: 'Edit User',
                //data: rows[0],
                id: result[0]._id,
                name: result[0].name,
                age: result[0].age,
                email: result[0].email
            })
        }
    })
})

// EDIT USER POST ACTION
app.put('/edit/(:id)', function(req, res, next) {
    req.assert('name', 'Name is required').notEmpty()           //Validate name
    req.assert('age', 'Age is required').notEmpty()             //Validate age
    req.assert('email', 'A valid email is required').isEmail()  //Validate email

    var errors = req.validationErrors()

    if( !errors ) {   //No errors were found.  Passed Validation!

        /********************************************
         * Express-validator module

        req.body.comment = 'a <span>comment</span>';
        req.body.username = '   a user    ';

        req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
        req.sanitize('username').trim(); // returns 'a user'
        ********************************************/
        var user = {
            name: req.sanitize('name').escape().trim(),
            age: req.sanitize('age').escape().trim(),
            email: req.sanitize('email').escape().trim()
        }

        var o_id = new ObjectId(req.params.id)
        req.db.collection('P_users').update({"_id": o_id}, user, function(err, result) {
            if (err) {
                req.flash('error', err)

                // render to views/user/edit.ejs
                res.render('user/edit', {
                    title: 'Edit User',
                    id: req.params.id,
                    name: req.body.name,
                    age: req.body.age,
                    email: req.body.email
                })
            } else {
                req.flash('success', 'Data updated successfully!')

                res.redirect('/users')

                // render to views/user/edit.ejs
                /*res.render('user/edit', {
                    title: 'Edit User',
                    id: req.params.id,
                    name: req.body.name,
                    age: req.body.age,
                    email: req.body.email
                })*/
            }
        })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        /**
         * Using req.body.name
         * because req.param('name') is deprecated
         */
        res.render('user/edit', {
            title: 'Edit User',
            id: req.params.id,
            name: req.body.name,
            age: req.body.age,
            email: req.body.email
        })
    }
})

// DELETE USER
app.delete('/delete/(:id)', function(req, res, next) {
    var o_id = new ObjectId(req.params.id)
    req.db.collection('P_users').remove({"_id": o_id}, function(err, result) {
        if (err) {
            req.flash('error', err)
            // redirect to users list page
            res.redirect('/users')
        } else {
            req.flash('success', 'User deleted successfully! id = ' + req.params.id)
            // redirect to users list page
            res.redirect('/users')
        }
    })
})

app.get('/statuscode', function(req, res, next){
    // For Debugging.
    var myArray = [400, 402, 403, 404, 500, 502, 506, 510]
    status = myArray[Math.floor(Math.random() * myArray.length)];

    res.status(status).send("fashfdagsdhagfshj");
})

app.get('/val', (req, res, next) => {
    connection.query("SELECT * FROM pet", (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("customers: ", res);
    });
    res.redirect('/users')
})

app.get ('/parallellexternalcall', function(req, res, next) {

        async.series([
            function(callback) {
                // setTimeout(function() {
                    request("http://52.202.2.199/delay/10", function(error, response, body) {
                        console.log("one");
                        callback(null, 'one');
                    });
                // }, 4000);
            },
            function(callback) {
                // setTimeout(function() {
                    request("http://3.232.168.170/delay/5", function(error, response, body) {
                        console.log("two");
                        callback(null, 'two');
                    });
                // }, 4000);
            },
            // function(callback) {
            //     setTimeout(function() {
            //         request("https://httpbin.org/post", function(error, response, body) {
            //             console.log("three");
            //             callback(null, 'three');
            //         });
            //     }, 4000);
            // },
            // function(callback) {
            //     setTimeout(function() {
            //         request("https://httpbin.org/post", function(error, response, body) {
            //             console.log("four");
            //             callback(null, 'four');
            //         });
            //     }, 4000);
            // },
            // function(callback) {
            //     setTimeout(function() {
            //         request("https://httpbin.org/post", function(error, response, body) {
            //             console.log("five");
            //             callback(null, 'five');
            //         });
            //     }, 4000);
            // },
            // function(callback) {
            //     setTimeout(function() {
            //         request("https://httpbin.org/post", function(error, response, body) {
            //             console.log("six");
            //             callback(null, 'six');
            //         });
            //     }, 4000);
            // },
            // function(callback) {
            //     setTimeout(function() {
            //         request("https://httpbin.org/post", function(error, response, body) {
            //             console.log("seven");
            //             callback(null, 'seven');
            //         });
            //     }, 4000);
            // },
            // function(callback) {
            //     setTimeout(function() {
            //         request("https://httpbin.org/post", function(error, response, body) {
            //             console.log("eight");
            //             callback(null, 'eight');
            //         });
            //     }, 4000);
            // },
            // function(callback) {
            //     setTimeout(function() {
            //         request("https://httpbin.org/post", function(error, response, body) {
            //             console.log("nine");
            //             callback(null, 'nine');
            //         });
            //     }, 4000);
            // },
            // function(callback) {
            //     setTimeout(function() {
            //         request("https://httpbin.org/post", function(error, response, body) {
            //             console.log("ten");
            //             callback(null, 'ten');
            //         });
            //     }, 4000);
            // }
        ],
        // optional callback
        function(err, results) {
            console.log("result", results);
            res.send("Job finished");
            // the results array will equal ['one','two'] even though
            // the second function had a shorter timeout.
        });



})


// cron.schedule("* * * * *", function() {
//     atatus.startBackgroundTransaction("running a task every minute");
//     connection.query("SELECT * FROM pet", (err, res) => {
//         if (err) {
//           console.log("error: ", err);
//           result(null, err);
//           return;
//         }
//         console.log("customers: ", res);
//     });
//     sleep.sleep(3);

//     connection.query("INSERT INTO pet (name, owner, species, sex, birth, death) VALUES('saran', 'fizer', 'test', 'M', 19950916, '20200916');", (err, res) => {
//         if (err) {
//           console.log("error: ", err);
//           result(null, err);
//           return;
//         }
//         console.log("customers: ", res);
//     });

//     sleep.sleep(3)
//     console.log("running a task every minute");
//     atatus.endTransaction();
// });




module.exports = app
