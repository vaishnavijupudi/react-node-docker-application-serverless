var connection = require("./sql_connection");
var express = require('express');
var router = express.Router();


router.post('/', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const gender = req.body.gender;
    connection.query("INSERT INTO registrationdata(name,password,email,gender) VALUES (?,?,?,?)", 
    [name, password, email,gender] ,(err) => {
      if (err) {
        res.send({
          error: err,
          message: "user not created",
        });
        return;
      } else {
        res.send({
          message: "user created sucessfully",
        });
        return;
      }
    }
    );
  });

  

module.exports = router;