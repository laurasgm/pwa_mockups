const express = require("express");
const bodyParser = require("body-parser");

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
/*
ref.once('value', function(data) {
  var nombre1 = data.val().event2;
  console.log(nombre1);
});*/

//var events = document.getElementById("event");
ref.once("value").then(function(data) {
  data.forEach(function(snapshot) {
    //esto me entrega las descripciones2 de todos los eventos
    /*events.innerHTML +=
        `<div id = "event" class="container">
        <div class="intro"></div>
        <h3 class="text-center" style="margin: 10px;"><strong>Eventos</strong></h3>
        <div  class="row articles">
            <div class="col-sm-6 col-md-4 item"><a href="#"></a><img class="img-fluid" src="assets/img/img1.png" style="width: 325px;height: 215px;">
                <h3 class="name">${snapshot.val().nombre}</h3>
                <p class="description" style="font-size: 14PX;">${snapshot.val().descripcion1}</p><a class="action" href="event_1.html"><i class="fa fa-arrow-circle-right" style="color: #f4d847;"></i></a></div>`*/
    //var ev = snapshot.val().descripcion2;
    console.log(snapshot.val().nombre);

    //console.log(ev);
  });
});

/*app.get('/', (req, res) => res.send('Hello World!'))*/

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

app.get("/Home", function(req, res) {
  res.send("estas en home!");
});

app.get("/about", function(req, res) {
  res.send("estas en about");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
