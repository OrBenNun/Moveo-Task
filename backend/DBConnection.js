require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const userName = process.env.DB_USER_NAME;
const password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${userName}:${password}@code-question-db.huadolf.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



module.exports = client;
