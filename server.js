const express = require("express");
const bodyParser = require("body-parser");


var firebase= require("firebase");
let email, password;

const firebaseConfig = {
  apiKey: "AIzaSyA9QUa1JhgDG972GTexvYVYP01-9qNN5wI",
  authDomain: "meetus-4fad2.firebaseapp.com",
  databaseURL: "https://meetus-4fad2.firebaseio.com",
  projectId: "meetus-4fad2",
  storageBucket: "",
  messagingSenderId: "23628738784",
  appId: "1:23628738784:web:b7b8db8b5adb640599e085",
  measurementId: "G-D431M19JG7"
};
firebase.initializeApp(firebaseConfig);


var admin = require("firebase-admin");
//const path = require("path");
const app = express();
var port = process.env.PORT || 3000;

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

var db = admin.database();
var ref = db.ref("/");



ref.once("value", function(data) {
  nombre1 = data.val().event1.nombre;
  nombre2 = data.val().event2.nombre;
  nombre3 = data.val().event3.nombre;
  desc1 = data.val().event1.descripcion1;
  desc12 = data.val().event2.descripcion1;
  desc13 = data.val().event3.descripcion1;
  desc2 = data.val().event1.descripcion2;
  desc22 = data.val().event2.descripcion2;
  desc23 = data.val().event3.descripcion2;



//Lista de eventos
eventsList = [
  {
    nombre: nombre1,
    descripcion:desc1,
    img: "img1.png"
  },
  {
    nombre:nombre2,
    descripcion:desc12,
    img:"img2.jpeg"
  },
  {
    nombre:nombre3,
    descripcion:desc13,
    img:"img3.jpeg"
  }
];
});
// As an admin, the app has access to read and write all data, regardless of Security Rules


/*
ref.once('value').then(function(data) {
    data.forEach(function (data) {
        console.log(data.val().nombre)
        //Lista de eventos
        eventsList = [
          {
            nombre: data.val().nombre,
            descripcion:data.val().descripcion1,
            img: "img1.png"
          },
        ];
    });
  console.log(eventsList);  
});*/



app.get("/", (req, res) => res.render("index"));

app.post("/event", function(req, res) {
  let {email,password} = req.body;
  console.log(email, password);
  firebase.auth().signInWithEmailAndPassword(email, password).then(() =>{
    res.redirect("/event");
  })
  .catch(error =>{
    console.log("login incorrecto");
  });
});

app.post("/coment", function(req,res){
  let {user,comment} = req.body;
  console.log(user,comment);
  cont=0
  ref.child('comments').push().set({
        user: user,
        comment: comment
    });
  cont+=1;
  res.redirect("/event");
})


app.get("/event", (req, res) => {
  res.render("event", { eventos: eventsList});
});

app.get("/event_1", (req, res) => res.render("event_1"));

app.get("/event_2", (req, res) => res.render("event_2"));

app.get("/event_3", (req, res) => res.render("event_3"));


app.post("/registrar", function(req,res){
  let {email, password, passwordrepeat} = req.body;
  console.log(email, password,passwordrepeat);
  firebase.auth().createUserWithEmailAndPassword(email, password).then(() =>{
    res.redirect("event");
  }).catch(function(error) {
    console.log("registro incorrecto");
  });
  
})


app.get("/registrar", (req, res) => res.render("registrar"));

app.get("/user", (req, res) => res.render("user"));

app.listen(port, function () {
  console.log(`Example app listening on port !`);
 });
