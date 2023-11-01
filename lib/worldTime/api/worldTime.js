const axios = require("axios");
const { json } = require("body-parser");

async function timeGenerate(location) {
  const url = `http://worldtimeapi.org/api/timezone/America/${location}`;
  try {
    const response = await axios.get(url);
    const dados = await response.data;

    const tratado = {
      timezone: dados.timezone,
      dateTime: dados.datetime,
      dayOfWeek: dados.day_of_week,
      dayOfYear: dados.day_of_year,
      fuso: dados.utc_offset,
    }
    return tratado;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  timeGenerate,
};
