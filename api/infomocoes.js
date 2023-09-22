const axios = require("axios");
const cotacao = require("./cotacao");

function informacoesLocalidade(pais) {
  let localidade = pais;
  const url = `http://servicodados.ibge.gov.br/api/v1/paises/${localidade}`;
  axios.get(url).then((response) => {
    const dados = response.data;
    const dadosLocalidadePais = dados.map((e) => {
      return {
        nome: e.nome.abreviado,
        lingua: e.linguas[0].nome,
        historico: e.historico,
        moeda: e?.["unidades-monetarias"]?.[0].id?.["ISO-4217-ALPHA"],
      };
    });
    const moeda = dadosLocalidadePais[0].moeda;
    cotacao(moeda);
    console.log(dadosLocalidadePais);
  });
}
informacoesLocalidade("US")
module.exports = informacoesLocalidade;
