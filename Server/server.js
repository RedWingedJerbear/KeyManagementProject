// Set up
var //cors = require('cors');
    config = require('./config.js'),
    express  = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'), // pull information from HTML POST (express4)
    app      = express(),                  // create our app w/ express]
    apiRouter = express.Router(),
    connection = mongoose.connect(config.database, {useMongoClient: true}),
    keyrequests = require('./models/keyrequests');



//Configuration
app.use(function(req, res, next)
{
    /* Allow access from any requesting client */
    res.setHeader('Access-Control-Allow-Origin', '*');

    /* Allow access for any of the following Http request types */
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');

    /* Set the Http request header */
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
    next();
});
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', apiRouter);

//API routes
apiRouter.get('/requests', function (req, res) {
    console.log("Getting Requests");
    keyrequests.find({}, function(err, recs)
    {
        if(err){
            console.dir(err);
        }
        res.json({records: recs});
    });
});

apiRouter.post('/home', function (req, res) {
    console.log(req.body);
    var department =  req.body.department,
        email = req.body.email,
        name = req.body.name,
        id = req.body.id,
        number = req.body.number,
        keys = req.body.keys,
        authorized = false,
        date = Date.now();

    keyrequests.create({
        request_date : date,
        request_department : department,
        request_email : email,
        request_name : name,
        request_919 : id,
        request_number : number,
        request_keys : keys,
        request_authorized : authorized},
    function(err, keyrequest) {
        if(err){
            console.dir(err);
        }
     res.json({message: 'success'});
    });
    console.log('Request Received');
});

apiRouter.put('/requests/:recordID', function(req, res) {
    keyrequests.findByID({_id: req.params.recordID}, function(err, recs)
    {
        if(err){
            console.dir(err);
        }
        else{
            recs.date = req.body.date || recs.request_date;
            recs.department = req.body.department || recs.department;
            recs.email = req.body.email || recs.email;
            recs.name = req.body.name || recs.name;
            recs.id = req.body.id || recs.id;
            recs.number = req.body.number || recs.number;
            recs.keys = req.body.keys || recs.keys;
            recs.authorized = req.body.authorized || recs.authorized;

            recs.save(function(err,recs){
                if(err){
                    res.status(500).send(err)
                }
                res.json({records: recs});
            });
        }
    });
});

apiRouter.delete('/requests/:recordID', function (req, res) {
    keyrequests.findByIdAndRemove({_id: req.params.recordID}, function (err, recs) {
        if(err){
            console.dir(err);
        }
        res.json({records: recs});
    });
});
app.listen(config.port);
console.log("App listening on port 8080");