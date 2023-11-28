const client = require('./DBConnection');
const database = client.db('Study-session');
const collection = database.collection('Questions');

// Collecting the entire documents of the questions.
const getAllQuestion = async () =>{
    const res = client.connect().then(async() => {
        console.log('Connected to DB');
        const questions = collection.find();
        const result = await questions.toArray();
        client.close();
        return result;
      }).catch(err => console.error('Error connecting to MongoDB Atlas:', err));
      return res;
}

// Get a question's document using an id.
const getQuestionByID = async (id) =>{
    const res = await client.connect().then(async() => {
            const result = await collection.findOne({ _id: id });
            client.close();
        return result;
        }).catch(err => console.error('Error connecting to MongoDB Atlas:', err));
  return res;
}

module.exports = {getQuestionByID,getAllQuestion};
