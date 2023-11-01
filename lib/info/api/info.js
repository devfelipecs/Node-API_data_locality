const axios = require("axios");

async function infoGenerate(pais) {
  const url = `http://servicodados.ibge.gov.br/api/v1/paises/${pais}`;
  try{
    const reponse = await axios.get(url);
    const dados = await reponse.data;
    const dadosLocalidade =await dados.map((e) => {
      return {
        nome: e.nome.abreviado,
        lingua: e.linguas[0].nome,
        historico: e.historico,
        moeda: e?.["unidades-monetarias"]?.[0].id?.["ISO-4217-ALPHA"],
      };
    });
    return dadosLocalidade;
  }catch(error){
    console.log(error);
  }
}
module.exports ={
    infoGenerate
}
