const app = require("express")();
const port = 8080;
const token = require("./lib/modules/token");
const register = require("./lib/modules/registerUser");
const cotacao = require("./lib/cotacao/api/cotacao");
const info = require("./lib/info/api/info");
const worldTime = require("./lib/fuso/api/worldTime");

app.get("/register/:user/:createtoken", (req, res) => {
  const user = req.params.user;
  const createToken = req.params.createtoken;
  if (user && createToken != null) {
    if (createToken == 1) {
      const userToken = token.generate_token();
      register.registerUser = { user: user, token: userToken };
      res.json({
        user: user,
        token: userToken,
      });
    } else {
      res.json({ token: "Error falid params" });
    }
  }
});

app.get("/login/:userLogin/:tokenLogin", (req, res) => {
  const userLogin = req.params.userLogin;
  const tokenLogin = req.params.tokenLogin;
  if (
    userLogin == register.registerUser.user &&
    tokenLogin == register.registerUser.token
  ) {
    res.json(register.registerUser);
  } else {
    res.send({ error: "User or token incorrect" });
  }
});

app.get("/login/:userLogin/:tokenLogin/:pais/:moeda/:area/:location", async (req, res) => {
  const userLogin = req.params.userLogin;
  const tokenLogin = req.params.tokenLogin;
  if (
    userLogin == register.registerUser.user &&
    tokenLogin == register.registerUser.token
  ) {
    const pais = req.params.pais;
    const moeda = req.params.moeda;
    const area = req.params.area;
    const location = req.params.location;


    const resultCot = await cotacao.cotGenerate(moeda).then((e) => {
      return e;
    });
    const resultInfo = await info.infoGenerate(pais).then((e) => {
      return e;
    });
    const resultTime = await worldTime.timeGenerate(area, location).then((e) => {
      return e;
    });
    const integration = {
      Informacoes: resultInfo,
      Cotacao: resultCot,
      Time: resultTime,
    };
    res.json(integration);
  } else {
    res.send({ error: "User or token incorrect" });
  }
});
app.listen(port, (e) => {
  console.log("Open");
});
