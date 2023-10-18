const express = require("express");
const expressApp = require("express")();
const axios = require("axios");

const token = require("./modules/token");
const register = require("./modules/registerUser");
const port = 8080;

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
  if (
    userLogin == register.registerUser.user &&
    tokenLogin == register.registerUser.token
  ) {
    res.send(register.registerUser);
  } else {
    res.send({ error: "User or token incorrect" });
  }
});

expressApp.get("/login/:userLogin/:tokenLogin/cotacao/:moeda", (req, res) => {
  const userLogin = req.params.userLogin;
  const tokenLogin = req.params.tokenLogin;
  if (
    userLogin == register.registerUser.user &&
    tokenLogin == register.registerUser.token
  ) {
    let moedacot = req.params.moeda;
    let moedaConvercao = moedacot + "-BRL";
    const url = `https://economia.awesomeapi.com.br/last/${moedaConvercao}`;
    axios.get(url).then((e) => {
      let dados = e.data;
      res.json({ Cotacao: dados });
    });
  } else {
    res.send({ error: "User or token incorrect" });
  }
});

expressApp.get("/login/:userLogin/:tokenLogin/informacoes/:pais",(req, res) => {
    let pais = req.params.pais;
    const userLogin = req.params.userLogin;
    const tokenLogin = req.params.tokenLogin;
    if (
      userLogin == register.registerUser.user &&
      tokenLogin == register.registerUser.token
    ) {
      const url = `http://servicodados.ibge.gov.br/api/v1/paises/${pais}`;
      axios.get(url).then((e) => {
        const dados = e.data;
        const dadosLocalidade = dados.map((e) => {
          return {
            nome: e.nome.abreviado,
            lingua: e.linguas[0].nome,
            historico: e.historico,
            moeda: e?.["unidades-monetarias"]?.[0].id?.["ISO-4217-ALPHA"],
          };
        });
        res.json({
          nome: dadosLocalidade[0].nome,
          Idioma: dadosLocalidade[0].lingua,
          moeda: dadosLocalidade[0].moeda,
          resumoHistorico: dadosLocalidade[0].historico,
        });
      });
    } else {
      res.send({ error: "User or token incorrect" });
    }

  }
);

expressApp.listen(port, (e) => {
  console.log("Open");
});
