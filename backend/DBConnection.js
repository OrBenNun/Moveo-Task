require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const userName = process.env.DB_USER_NAME;
const password = process.env.DB_PASSWORD;
const uri = `mongodb+srv://${userName}:${password}@code-question-db.huadolf.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



module.exports = client;
