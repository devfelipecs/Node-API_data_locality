const express = require("express");
const expressApp = require("express")();
const bodyParser = require("body-parser");

const token = require("./modules/token");
const register = require("./modules/registerUser");
const localidade = require("./api/infomocoes");
const port = 8080;

expressApp.use(bodyParser.urlencoded({ extended: false }));

expressApp.get("/register/:user/:createtoken", (req, res) => {
  const user = req.params.user;
  const createToken = req.params.createtoken;
  if (user && createToken != null) {
    if (createToken == 1) {
      const userToken = token.generate_token();
      register.registerUser = { user: user, token: userToken };
      res.send({
        user: user,
        token: userToken,
      });
    } else {
      res.send({ token: "Error falid params" });
    }
  }
});

expressApp.get("/login/:userLogin/:tokenLogin", (req, res) => {
  const userLogin = req.params.userLogin;
  const tokenLogin = req.params.tokenLogin;
  if (userLogin == register.registerUser.user) {
    if (tokenLogin == register.registerUser.token) {
      res.send(register.registerUser);
    }else{
      res.send({error: "User or token incorrect"});
    }
  }
});


expressApp.listen(port, (e) => {
  console.log("Open");
});
