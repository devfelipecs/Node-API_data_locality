const axios = require("axios");
const { json } = require("body-parser");

async function timeGenerate(location) {
  const url = `http://worldtimeapi.org/api/timezone/America/${location}`;
  try {
    const response = await axios.get(url);
    const dados = await response.data;
    return dados;
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  timeGenerate,
};
