require("dotenv").config();

export default {
  port: 8080,
  dbUri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@test.e84x8.mongodb.net/test?retryWrites=true&w=majority`,
  salt: 10,
  accessTokenTtl: "15m",
  refreshTokenTtl: "1y",
  public_key: process.env.PUBLIC,
  secret_key: process.env.SECRET,
};
