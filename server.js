const express = require('express')
var admin = require("firebase-admin");
const app = express()
const port = 3000

app.use (express.static("./"))
app.set('view engine', 'html');
exports.index = function(req, res){
  res.render('index');
};

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

function eventScreen(){
    //var events = document.getElementById("event");
    ref.once('value').then(function(data) {
        data.forEach(function (snapshot) {
            //esto me entrega las descripciones2 de todos los eventos
            events.innerHTML
            var ev = snapshot.val().descripcion2;
            //console.log(ev);
        });
        
    });
}

eventScreen();













app.get('/', (req, res) => res.send('Hello World!'))

app.get('/Home', function (req, res) {
    res.send('estas en home!')
  })

  app.get('/about', function (req, res) {
    res.send('estas en about')
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))