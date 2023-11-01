const axios = require("axios");
async function cotGenerate(moeda){
    const url = `https://economia.awesomeapi.com.br/last/${moeda}`
    try{
        const response = await axios.get(url);
        const dados = await response.data;
        return dados
    }catch(error){
        console.log(error)
    }
}
module.exports = {
    cotGenerate
}