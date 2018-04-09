// Set up
var cors = require('cors');
    config = require('./config.js'),
    express  = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'), // pull information from HTML POST (express4)
    app      = express(),                  // create our app w/ express]
    apiRouter = express.Router(),
    connection = mongoose.connect(config.database, {useMongoClient: true}),
    keyrequests = require('./models/keyrequests');



//Configuration

app.use(cors());
app.use('/api', apiRouter);
app.listen(config.port);
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));

app.use(function(req, res, next)
{
    /* Allow access from any requesting client */
    res.setHeader('Access-Control-Allow-Origin', '*');

    /* Allow access for any of the following Http request types */
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');

    /* Set the Http request header */
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});

//API routes
apiRouter.get('/requests', function (req, res) {
    keyrequests.find({completed:false}, function(err, recs)
    {
        if(err){
            console.dir(err);
        }
        res.json({records: recs});
    });
});

apiRouter.post('/home', function (req, res) {
    console.log(req);
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
    function(err, small) {
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
console.log("App listening on port 8080");