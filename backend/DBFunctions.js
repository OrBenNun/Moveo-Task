const client = require('./DBConnection');
const database = client.db('Study-session');
const collection = database.collection('Questions');

const getAllQuestion = async () =>{
    const res = client.connect().then(async() => {
        const cursor = collection.find();
        const result = await cursor.toArray();
        client.close();
        return result;
      })
      .catch(err => console.error('Error connecting to MongoDB Atlas:', err));
      return res;
}

const getQuestionByID = async (id) =>{
    const res = await client.connect().then(async() => {
            const result = await collection.findOne({ _id: id });
            client.close();
        return result;
        }).catch(err => console.error('Error connecting to MongoDB Atlas:', err));
  return res;
}

module.exports = {getQuestionByID,getAllQuestion};
