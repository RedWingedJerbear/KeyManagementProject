// Set up
var //cors = require('cors');
    config = require('./config.js'),
    express  = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'), // pull information from HTML POST (express4)
    app      = express(),                  // create our app w/ express]
    apiRouter = express.Router(),
    promise =mongoose.Promise = global.Promise,
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
    keyrequests.findById({_id: req.params.recordID}, function(err, keyrequest)
    {
        if(err){
            console.dir(err);
        }
        else{
            keyrequest.date = keyrequest.request_date;
            keyrequest.department = req.body.department || keyrequest.request_department;
            keyrequest.email = req.body.email || keyrequest.request_email;
            keyrequest.name = req.body.name || keyrequest.request_name;
            keyrequest.id = req.body.id || keyrequest.request_id;
            keyrequest.number = req.body.number || keyrequest.request_number;
            keyrequest.keys = req.body.keys || keyrequest.request_keys;
            keyrequest.authorized = req.body.authorized || keyrequest.request_authorized;

            keyrequest.save(function(err,updatedKeyRequest){
                if(err){
                    res.status(500).send(err)
                }
                res.json({records: updatedKeyRequest});
            });
        }
    });
    console.log('Updated');
});

apiRouter.delete('/delete/:recordID', function (req, res) {
    keyrequests.findByIdAndRemove({_id: req.params.recordID}, function (err, recs) {
        if(err){
            console.dir(err);
        }
        res.json({records: recs});
    });
});
app.listen(config.port);
console.log("App listening on port 8080");