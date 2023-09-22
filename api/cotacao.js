const axios = require("axios");
function gerarCotacao(moeda) {
  let moedaConvercao = moeda + "-BRL";
  const url = `https://economia.awesomeapi.com.br/last/${moedaConvercao}`;
  axios.get(url).then((e) => {
    const dados = e.data;
    console.log(dados);
  });
}
module.exports = gerarCotacao;
