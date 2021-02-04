// require('appoptics-apm')
// require('newrelic')
// var atatus = require('/Users/apple/development/git/atatus/atatus-nodejs-agent/index.js');
// It must be placed above all other 'require' statements
var atatus = require("atatus-nodejs");
atatus.start({
    licenseKey: "lic_apm_fead382ef874492d944aeddecafab5b8",
    appName: "tech info",
    notifyHost: 'localhost',
    notifyPort: '8091',
    useSSL: false,
});
var request = require("request")
const { Gitlab } = require('@gitbeaker/node');
// atatus.start({
//     licenseKey: 'lic_apm_b5dde13f3b6b4435a1705b61912fb19f',
//     appName: 'Node error App',
//     notifyHost: 'localhost',
//     notifyPort: '8091',
//     useSSL: false,
//     notifyInterval: 10,
//     // logLevel: 'debug',
//     // ignoreUrls: [
//     //   '/users/add',
//     //   '/statuscode',
//     // ]
// });
// atatus.setUserContext({ id: 1212, name: "saran", email: "saran@atatus.com"});
// It must be placed above all other 'require' statements
// var atatus = require("atatus-nodejs");
// atatus.start({
//     licenseKey: "lic_apm_6e49699e38c8498f9a29a05b1adc0182",
//     appName: "activate nodejs",
// });

// It must be placed above all other 'require' statements
// var atatus = require("atatus-nodejs");
// atatus.start({
//     licenseKey: "lic_apm_b5dde13f3b6b4435a1705b61912fb19f",
//     appName: "Activate project2",
//     notifyHost: '192.168.43.194',
//     notifyPort: '8091',
//     useSSL: false,
// });
// var atatus = require("atatus-nodejs");
// atatus.start({
//     licenseKey: "lic_apm_6e49699e38c8498f9a29a05b1adc0182",
//     appName: "activate nodejs",
//     // logLevel: 'debug',
// });

// import * as Sentry from '@sentry/node';

// var Sentry = require('@sentry/node');
// or using CommonJS
// const Sentry = require('@sentry/node');
// Sentry.init({ dsn: 'https://4a9ff3118a9c4ddc951ef2111305d8cc@o385202.ingest.sentry.io/5217548'});

var express = require('express')
var app = express()
var jwt = require('express-jwt');
var timeout = require('connect-timeout');
var cors = require('cors');
const cron = require("node-cron");
const { database } = require('./routes/keys.js');


app.use(cors({
  'origin': 'www.atatus.com',
  'methods': 'PUT,POST',
}));



app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', "www.atatus.com");
  res.header('Access-Control-Allow-Methods', 'PUT,POST');
  res.header('Access-Control-Allow-Headers', 'content-type');
  next();
});


var expressMongoDb = require('express-mongo-db');
/**
 * Store database credentials in a separate config.js file
 * Load the file/module and its values
 * For MongoDB, we basically store the connection URL in config file
 */
var config = require('./config')
app.use(expressMongoDb(process.env.MONGO_URL || config.database.url));

// app.use(session({
//   store: new MySQLStore(database)
// }));

/**
 * setting up the templating view engine
 */
app.set('view engine', 'ejs')

/**
 * import routes/index.js
 * import routes/users.js
 */
var index = require('./routes/index')
var users = require('./routes/users')

/**
 * Express Validator Middleware for Form Validation
 */
var expressValidator = require('express-validator')
app.use(expressValidator())

/**
 * body-parser module is used to read HTTP POST data
 * it's an express middleware that reads form's input
 * and store it as javascript object
 */
var bodyParser = require('body-parser')
/**
 * bodyParser.urlencoded() parses the text as URL encoded data
 * (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body.
 */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// var err = new Error('Ups, something broke!')

// apm.captureError(err)

// var transaction = apm.startTransaction(['tranlocal'][err, 'type'])
var err = new Error('Ups, something broke!')






/**
 * This module let us use HTTP verbs such as PUT or DELETE
 * in places where they are not supported
 */
var methodOverride = require('method-override')

/**
 * using custom logic to override method
 *
 * there are other ways of overriding as well
 * like using header & using query value
 */
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

// schedule tasks to be run on the server
// cron.schedule("* * * * *", function() {
//   atatus.startBackgroundTransaction("running a task every minute");
//   console.log("running a task every minute");
//   atatus.endTransaction();
// });
// app.get('/test', function(req, res, next){
//   atatus.startBackgroundTransaction("test background2");
//   console.log("Data.....");
//   atatus.endTransaction();
//   res.send("fashfdagsdhagfshj");
// });

// curl --request POST --header "PRIVATE-TOKEN: UQwg9_K11NzsHz_Cvbgb" "https://gitlab.com/api/v4/projects/22226059/issues?title=testdata&labels=bug"

app.get('/gitlab', async function(req, res, next) {
  var sample = {
    data:{ type: 'gitlab',
     projectType: 'apm',
     accountId: '5c7ccf13be52f2428cd4f14b',
     projectId: '5fa12a839689ad95565c45dd',
     errorId: '5fa12a839689ad95565c45dd:25b3a065355538a72b9c74087e7ef9e6',
     message: 'test is not defined',
     timestamp: '',
     backTraces: 'Error: test is not defined\nFile "routes\\users.js" at line 31, col 0 in global.<anonymous>\nFile "node_modules\\express\\lib\\router\\layer.js" at line 95, col 0 in handle\nFile "node_modules\\express\\lib\\router\\route.js" at line 137, col 0 in next\nFile "node_modules\\express\\lib\\router\\route.js" at line 112, col 0 in dispatch\nFile "node_modules\\atatus-nodejs\\lib\\instrumentation\\modules\\express.js" at line 60, col 0 in handle\nFile "node_modules\\express\\lib\\router\\layer.js" at line 95, col 0 in handle\nFile "node_modules\\express\\lib\\router\\index.js" at line 281, col 0 in <anonymous>\nFile "node_modules\\express\\lib\\router\\index.js" at line 335, col 0 in process_params\nFile "node_modules\\express\\lib\\router\\index.js" at line 275, col 0 in next\nFile "node_modules\\express\\lib\\middleware\\init.js" at line 40, col 0 in expressInit\nFile "node_modules\\atatus-nodejs\\lib\\instrumentation\\modules\\express.js" at line 60, col 0 in handle\nFile "node_modules\\express\\lib\\router\\layer.js" at line 95, col 0 in handle\nFile "node_modules\\express\\lib\\router\\index.js" at line 317, col 0 in trim_prefix\nFile "node_modules\\express\\lib\\router\\index.js" at line 284, col 0 in <anonymous>\nFile "node_modules\\express\\lib\\router\\index.js" at line 335, col 0 in process_params\nFile "node_modules\\express\\lib\\router\\index.js" at line 275, col 0 in next\nFile "node_modules\\express\\lib\\middleware\\query.js" at line 44, col 0 in query\nFile "node_modules\\atatus-nodejs\\lib\\instrumentation\\modules\\express.js" at line 60, col 0 in handle\nFile "node_modules\\express\\lib\\router\\layer.js" at line 95, col 0 in handle\nFile "node_modules\\express\\lib\\router\\index.js" at line 317, col 0 in trim_prefix\nFile "node_modules\\express\\lib\\router\\index.js" at line 284, col 0 in <anonymous>\nFile "node_modules\\express\\lib\\router\\index.js" at line 335, col 0 in process_params\nFile "node_modules\\express\\lib\\router\\index.js" at line 275, col 0 in next\nFile "node_modules\\express\\lib\\router\\index.js" at line 174, col 0 in handle\nFile "node_modules\\express\\lib\\application.js" at line 174, col 0 in handle\nFile "node_modules\\express\\lib\\application.js" at line 230, col 0 in mounted_app\nFile "node_modules\\atatus-nodejs\\lib\\instrumentation\\modules\\express.js" at line 60, col 0 in handle\nFile "node_modules\\express\\lib\\router\\layer.js" at line 95, col 0 in handle\nFile "node_modules\\express\\lib\\router\\index.js" at line 317, col 0 in trim_prefix\nFile "node_modules\\express\\lib\\router\\index.js" at line 284, col 0 in <anonymous>\nFile "node_modules\\express\\lib\\router\\index.js" at line 335, col 0 in process_params\nFile "node_modules\\express\\lib\\router\\index.js" at line 275, col 0 in next\nFile "node_modules\\atatus-nodejs\\lib\\instrumentation\\modules\\express.js" at line 56, col 0 in arguments.(anonymous function)\nFile "node_modules\\express\\lib\\application.js" at line 233, col 0 in <anonymous>\nFile "node_modules\\express\\lib\\router\\index.js" at line 635, col 0 in <anonymous>\nFile "node_modules\\express\\lib\\router\\index.js" at line 260, col 0 in next\nFile "node_modules\\express\\lib\\middleware\\init.js" at line 40, col 0 in expressInit\nFile "node_modules\\atatus-nodejs\\lib\\instrumentation\\modules\\express.js" at line 60, col 0 in handle\nFile "node_modules\\express\\lib\\router\\layer.js" at line 95, col 0 in handle\nFile "node_modules\\express\\lib\\router\\index.js" at line 317, col 0 in trim_prefix\nFile "node_modules\\express\\lib\\router\\index.js" at line 284, col 0 in <anonymous>\nFile "node_modules\\express\\lib\\router\\index.js" at line 335, col 0 in process_params\nFile "node_modules\\express\\lib\\router\\index.js" at line 275, col 0 in next\nFile "node_modules\\express\\lib\\middleware\\query.js" at line 44, col 0 in query\nFile "node_modules\\atatus-nodejs\\lib\\instrumentation\\modules\\express.js" at line 60, col 0 in handle\nFile "node_modules\\express\\lib\\router\\layer.js" at line 95, col 0 in handle\nFile "node_modules\\express\\lib\\router\\index.js" at line 317, col 0 in trim_prefix\nFile "node_modules\\express\\lib\\router\\index.js" at line 284, col 0 in <anonymous>\nFile "node_modules\\express\\lib\\router\\index.js" at line 335, col 0 in process_params\nFile "node_modules\\express\\lib\\router\\index.js" at line 275, col 0 in next\nFile "node_modules\\express\\lib\\router\\index.js" at line 174, col 0 in handle\nFile "node_modules\\express\\lib\\application.js" at line 174, col 0 in handle\nFile "node_modules\\express\\lib\\application.js" at line 230, col 0 in mounted_app\nFile "node_modules\\atatus-nodejs\\lib\\instrumentation\\modules\\express.js" at line 60, col 0 in handle\nFile "node_modules\\express\\lib\\router\\layer.js" at line 95, col 0 in handle\nFile "node_modules\\express\\lib\\router\\index.js" at line 317, col 0 in trim_prefix\n',
     timeStart: '2020-11-04T09%3A50%3A28%2B00%3A00',
     timeEnd: '2020-11-04T10%3A25%3A28%2B00%3A00',
     errorUrl: 'http://localhost:8080/accounts/5c7ccf13be52f2428cd4f14b/apm/5fa12a839689ad95565c45dd/errors/5fa12a839689ad95565c45dd:25b3a065355538a72b9c74087e7ef9e6/details?timeDur=custom&timeStart=2020-11-04T09%3A50%3A28%2B00%3A00&timeEnd=2020-11-04T10%3A25%3A28%2B00%3A00',
     description: 'Atatus: View error details in http://localhost:8080/accounts/5c7ccf13be52f2428cd4f14b/apm/5fa12a839689ad95565c45dd/errors/5fa12a839689ad95565c45dd:25b3a065355538a72b9c74087e7ef9e6/details?timeDur=custom&timeStart=2020-11-04T09%3A50%3A28%2B00%3A00&timeEnd=2020-11-04T10%3A25%3A28%2B00%3A00' },
  channel:
   { enabled: true,
     labels: 'bug',
     projectId: '22226059',
     apiToken: 'UQwg9_K11NzsHz_Cvbgb',
     url: 'https://gitlab.com/'
   }
 };

  var projectId = sample.channel.projectId;
  var token = sample.channel.apiToken;
  var payload = {
    title: sample.data.message,
    labels: sample.channel.labels,
    description: ("#### Stacktrace\n```\n" + (sample.data.backTraces || '').substring(0, 2000) + "\n```\n\n\n" + sample.data.description),
  }
    request.post({
        url: sample.channel.url+"api/v4/projects/"+projectId+"/issues",
        json: true,
        body: payload,
        headers: {
            'PRIVATE-TOKEN': token
        }
    }, function(err, response, body) {

        if (err || (response && response.statusCode >= 400)) {
            // console.log(response);
            return callback(new Error((err && err.message) ||
                            (body && body.message) ||
                            'Creating alert in OpsGenie has been failed!'));
        }

        console.log(body);
        res.send("fashfdagsdhagfshj");
    });
})

app.get('/data', function(req, res, next){

  res.send("fashfdagsdhagfshj");

});

app.post('/data/view/', function(req, res, next){
  res.send("fashfdagsdhagfshj");
});

app.get('/data/view/app', function(req, res, next){
  res.send("fashfdagsdhagfshj");
});

app.post('/anything/test', function(req, res, next){
  res.send("fashfdagsdhagfshj");
});

app.get('/data/view/app/value', function(req, res, next){
  res.send("fashfdagsdhagfshj");
});

app.get('/statuscode', function(req, res, next){
    // For Debugging.
    var myArray = [400, 402, 403, 404, 500, 502, 506]
    // var myArray = [403, 404, 500]
    status = myArray[Math.floor(Math.random() * myArray.length)];


    // atatus.notifyError(new Error("error message"), {
    //     tags: ['new-user', 'signup'],
    //     customData: { name: 'John Doe', country: 'US' }
    // });
    if (req.query.fail) {
      res.status(status);
    } else if (req.query.failwithex) {
      console.log("failwithex")
      res.status(status);
      mydata[1].add();
    } else {
      console.log("---------------------")
      // assertionError();
      // require('net').connect(-1);
      res.status(status);
      // newrelic.noticeError("You are not eligible for the gift");
    }

    res.send("fashfdagsdhagfshj");
})


app.get('/custom', function(req, res, next){
  console.log("data")
  atatus.setUserContext({ id: 1212, name: "saran", email: "saran@atatus.com"});
  // res.send("fashfdagsdhagfshj");
  atatus.notifyError("eror data");
  res.status(401).send("error");
})


// app.use(function (req, res, next) {
//   throw new Error('Test error')
// })


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

function assertionError(){
  const assert = require('assert');

  // Generate an AssertionError to compare the error message later:
  const { message } = new assert.AssertionError({
    actual: 1,
    expected: 2,
    operator: 'strictEqual'
  });

  // Verify error output:
  try {
    assert.strictEqual(1, 2);
  } catch (err) {
    assert(err instanceof assert.AssertionError);
    assert.strictEqual(err.message, message);
    assert.strictEqual(err.name, 'AssertionError');
    assert.strictEqual(err.actual, 1);
    assert.strictEqual(err.expected, 2);
    assert.strictEqual(err.code, 'ERR_ASSERTION');
    assert.strictEqual(err.operator, 'strictEqual');
    assert.strictEqual(err.generatedMessage, true);
  }
}

/**
 * This module shows flash messages
 * generally used to show success or error messages
 *
 * Flash messages are stored in session
 * So, we also have to install and use
 * cookie-parser & session modules
 */
var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(flash())
app.use('/', index)
app.use('/users', users)


app.listen(3400, function(){
  console.log('Server running at port 3400: http://127.0.0.1:3400')
})
// atatus.notifyError(new Error("Something went badly wrong"), {
//   tags: ['new-user', 'signup'],
//   customData: { name: 'John Doe', country: 'US' }
// });
// // atatus.notifyError(new Error("easy to went badly wrong"), {
// //   tags: ['ols-user', 'login'],
// //   customData: { name: 'joe', country: 'Uk' }
// // });
// // atatus.notifyError(new Error(" wrong"), {
// //   tags: ['ols-user', 'login'],
// //   customData: { name: 'joe', country: 'Uk' }
// // });
