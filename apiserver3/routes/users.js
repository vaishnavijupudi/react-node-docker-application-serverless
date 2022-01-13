const connection = require("./sql_connection");
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {

    console.log("user query");
    //code for users
      var email  = req.body.email;
      connection.query("SELECT r.name FROM registrationdata r, userstate u WHERE  u.email = r.email AND u.state = 'online' and u.email != ?",[email],(err, result) => {
      if (err) {
        console.log(err);
      }
      if (result.length > 0) {
        console.log(result);
        res.send({
          users: result,
          message: "Users who are online",
        });
        return;
      } else {
        res.send({
          message: "Other users are offline",
        });
        return;
      }
    });
  });
 


module.exports = router;
