const express = require('express')
var admin = require("firebase-admin");
const path = require("path");
const mustacheExpress = require('mustache-express');
const app = express()
const port = 3000


app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views',path.join(__dirname, 'views'));

/*
app.use (express.static("./"))
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));


exports.index = function(req, res){
  res.render('index');
};*/

app.get('/views', function(req, res){
  res.render('index.html', {yourdata: 'Hello from Mustache Template'});
});

var admin = require("firebase-admin");
//const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "pug");
app.use("/public", express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Fetch the service account key JSON file contents
var serviceAccount = require("./meetus-4fad2-firebase-adminsdk-zso7f-b260c4e1f8.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://meetus-4fad2.firebaseio.com/"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/");

ref.once('value', function(data) {
  var snapshot = data.val().event1.nombre;
  console.log(snapshot);
});

/*
ref.once('value').then(function(data) {
    data.forEach(function (snapshot) {
        console.log(snapshot.val().nombre);
    });
    
});*/

app.get("/", (req, res) => res.render("index"));

app.post("/event", function(req, res) {
  let { email, password } = req.body;
  console.log(email, password);

  //res.status(500).send("hola mundo");
  res.redirect("/event");
});

app.get("/event", (req, res) => {
  res.render("event");
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
