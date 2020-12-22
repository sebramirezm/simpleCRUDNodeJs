//Imports
const express = require('express');
const {dbConn} = require('./database/dbconn.js');
const userController = require('./controller/userController.js');

const app = express();
app.use(express.json());

app.use(userController);

app.listen(3000, function() {
    console.log('Server runnign in port 3000')
  })


 //Encriptar Password
 //Sistema de login(user, pass) -> devuelve token(almacenar token) -- JWT
 //Proteger endpoints con token
 //