const connection = require("./sql_connection");
const express = require('express');
const router = express.Router();
const moment = require("moment");

router.post('/', (req, res) => {
  console.log("in logout query");
    var email  = req.body.email;
    console.log(email);
    var myTimestamp = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
    let userChange = {
      email,
      state: "offline",
      timestamp: myTimestamp,
      
    }; 
    console.log("in logout before query");
    console.log(email);
    connection.query("UPDATE userstate SET ? where email = ?", [userChange, email], (err) => {
      if (err) {
        return;
      } else {
        res.send({
          message: "User is offline",
        });
        return;
      }
    })
  });

  module.exports = router;