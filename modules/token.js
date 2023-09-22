function generate_token(min = 1000, max = 9000) {
  let aleatorio = Number.parseInt(Math.random() * (max - min) + min);
  const token = aleatorio;
  return token
}
module.exports = {generate_token};
