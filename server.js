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

//Lista de eventos
const eventsList = [
  {
    nombre: "Fiestas de la Cosecha 2019",
    descripcion:
      "Las Fiestas de la Cosecha Pereira 2019 estarán de infarto con 20 conciertos en diferentes lugares de la ciudad.",
    img: "img1.png"
  },
  {
    nombre: "SPACELAB Y SUS ROBOTS",
    descripcion:
      "Regresa @Spacelab &amp; friends, baile robotico. Este proximo 7 de septiembre en el @TunnelPereira",
    img: "img2.jpeg"
  },
  {
    nombre: "URBAN FEST",
    descripcion:
      "OPEN WEEKEND 13 y 14 abril clases espectaculares y lo más esperado: BATALLAS con $3'000.000 en premios",
    img: "img3.jpeg"
  }
];

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("/");

ref.once("value", function(data) {
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
  res.render("event", { eventos: eventsList });
});

app.get("/event_1", (req, res) => res.render("event_1"));

app.get("/event_2", (req, res) => res.render("event_2"));

app.get("/event_3", (req, res) => res.render("event_3"));

app.get("/registrar", (req, res) => res.render("registrar"));

app.get("/user", (req, res) => res.render("user"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
