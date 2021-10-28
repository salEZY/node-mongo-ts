require('dotenv').config()
export default {
  port: 8080,
  dbUri:
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@test.e84x8.mongodb.net/test?retryWrites=true&w=majority`,
  salt: 10,
};
