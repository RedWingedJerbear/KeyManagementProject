// Set up
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
apiRouter = express.Router();
keyrequests = require('./models/keyrequests');


//Configuration
mongoose.connect(config.database, {useMongoClient: true});
app.use('/api, apiRouter');
app.listen(config.port);
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Authorization");
    next();
});

//API routes
apiRouter.get('/keyrequests', function (req, res) {
    keyrequests.find({completed:false}, function(err, recs)
    {
        if(err){
            console.dir(err);
        }
        res.json({records: recs});
    });
});

apiRouter.post('/home', function (req, res) {

    var date = Date.now(),
    department = req.body.department,
    email = req.body.email,
    name = req.body.name,
    id = req.body.id,
    number = req.body.number,
    keys = req.body.keys,
    authorized = false;

    keyrequests.create({
        request_date : date,
        request_department : department,
        request_email : email,
        request_name : name,
        request_919 : id,
        request_number : number,
        request_keys : keys,
        request_authorized : authorized},
    function(err, small) {
        if(err){
            console.dir(err);
        }
     res.json({message: 'success'});
    });
});

apiRouter.put('/keyrequests/:recordID', function(req, res) {
    keyrequests.findByID({_id: req.params.recordID}, function (err, recs) {
        if(err){
            console.dir(err);
        }
        else{
            request_date = req.body.date || recs.request_date;
            request_department = req.body.department || recs.request_department;
            request_email = req.body.email || recs.request_email;
            request_name = req.body.name || recs.request_name;
            request_919 = req.body.id || recs.request_919;
            request_number = req.body.number || recs.request_number;
            request_keys = req.body.keys || recs.request_keys;
            request_authorized = req.body.authorized || recs.request_authorized;

            recs.save(function(err,recs){
                if(err){
                    res.status(500).send(err)
                }
                res.json({records: recs});
            });
        }
    });
});

apiRouter.delete('/keyrequests/:recordID', function (req, res) {
    keyrequests.findByIdAndRemove({_id: req.params.recordID}, function (err, recs) {
        if(err){
            console.dir(err);
        }
        res.json({records: recs});
    });
});
console.log("App listening on port 8080")