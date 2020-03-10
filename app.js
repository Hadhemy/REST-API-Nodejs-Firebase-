var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
morgan = require('morgan'),
firebase = require("firebase");

var port = process.env.PORT || 8080;

// firebase setup
firebase.initializeApp({
	databaseURL: "https://nodejs-2853f.firebaseio.com",
	serviceAccount: "ServiceAccountKey.json"
});
var db = firebase.database();
var profilesRef = db.ref("profiles");



// app config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 


// middlware
app.use(morgan('dev'));  // log all requests to the console

// routes
app.get('/', function(req, res) {
	res.send('Hi WELCOME');
});
//api
var apiRouter = express.Router();  

// api : middlware 
apiRouter.use(function(req, res, next) {
	console.log("runing....");
	next();
});



apiRouter.route('/profiles')
	//create a profile
	.post(function(req, res) {
		// Firebase
		var profile = {};
		profile.firstName = req.body.fname;
		profile.lastName =req.body.lname;
		profile.Email = req.body.email;
		profilesRef.push({
			first_name: req.body.fname,
			last_name: req.body.lname,
			email_user: req.body.email
		}, function(err) {
			if (err) {
				res.send(err)
			} else {
				res.json({ message: "Success: profile created."})
			}
		});

	})
	.get(function(req, res) {
		// Firebase get all profiles
		profilesRef.once("value", function(snapshot, prevChildKey) {
			res.json(snapshot.val());
		})
	});

// Single profile Routes
// example of uid(user id) : -LypKWHqX8pCyp68iJUt

apiRouter.route('/profiles/:uid')//http://localhost:8080/api/profiles/-LypKWHqX8pCyp68iJUt

	.put(function(req, res) {
		// Firebase Update profile info


		var uid = req.params.uid,
			profile = {};

        // update only parameters sent in request(we can update just one parameter)
        
		if (req.body.fname) profile.first_name = req.body.fname;
		if (req.body.lname) profile.last_name = req.body.lname;
		if (req.body.email) profile.email_user = req.body.email;

		profilesRef.child(uid).update(profile, function(err) {
			if (err) {
				res.send(err);
			} else {
				res.json({message: "Success: profile information correctly updated."})
			}
		});

	})
	.delete(function(req, res) {
		// Firebase DELETE profile
		var uid = req.params.uid;

		profilesRef.child(uid).remove(function(err) {
			if (err) {
				res.send(err);
			} else {
				res.json({message: "Success: profile deleted."});
			}
		})
	});

// Register our routes - all routes prefixed with /api
app.use('/api', apiRouter);


//START THE SERVER
app.listen(port);
console.log('port: '+ port);








