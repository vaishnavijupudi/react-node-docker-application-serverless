const moment = require("moment");
var connection = require("./sql_connection");
var express = require('express');
var router = express.Router();


router.post('/', (req, res) => {
    //code for login
    const email = req.body.email;
    const password = req.body.password;

    connection.query("SELECT * FROM registrationdata WHERE email = ? AND password = ? ", 
    [email, password], (err, result) => {
      
      if(err){
        console.log(err);
      }

      if(result && result.length > 0){
        console.log(result[0].email);
        res.send({
          message: "login sucessful",
          ...result[0],
        });

        var myTimestamp = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
        const email = result[0].email;

        connection.query("SELECT * from userstate where email = ?", [email], (err, result) => {

          if(err){
            console.log(err);
          }
          if (result.length <= 0) {
            let userstate = {
              email,
              state: "online",
              timestamp: myTimestamp,
              
            };
            connection.query("INSERT INTO userstate SET ?", userstate, (err) => {
              console.log("in insert");
              if (err) {
                return;
              } else {
                return;
              }
            });
          }
          else {
            let userstate = {
              email,
              state: "online",
              timestamp: myTimestamp,
              
            };
            connection.query("UPDATE userstate SET ? where email = ?", [userstate, email], (err) => {
              if (err) {
                return;
              } else {
                return;
              }
            });
          }
        });
      }else{
        res.send({
          message: "Wrong credentials"
        });
      }
    }
    );
  });

module.exports = router;