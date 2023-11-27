// import {client} from './DBConnection.js'
const client = require('./DBConnection');
const database = client.db('Study-session');
const collection = database.collection('Questions');

// client.connect()
//   .then(async() => {
//     console.log('Connected to MongoDB Atlas');
//     // const documentId = new ObjectId('1');
//     const result = await collection.findOne({ _id: 1 });

//     if (result) {
//       console.log('Document found:', result);
//     } else {
//       console.log('Document not found');
//     }

//     // Close the connection when done
//     client.close();
//     // Perform your database operations here
//   })
//   .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

const getAllQuestion = async () =>{
    const res = client.connect().then(async() => {
        const cursor = collection.find();
        const result = await cursor.toArray();
    
        if (result) {
          // console.log('Document found:', result);
        } else {
          console.log('Document not found');
        }
    
        // Close the connection when done
        client.close();
        return result;
        // Perform your database operations here
      })
      .catch(err => console.error('Error connecting to MongoDB Atlas:', err));
      return res;
}

const getQuestionByID = async (id) =>{
    const res = await client.connect().then(async() => {
            const result = await collection.findOne({ _id: id });

            if (result) {
            // console.log('Document found:', result);
            } else {
            console.log('Document not found');
            }

            // Close the connection when done
            client.close();
            // Perform your database operations here
        return result;
        }).catch(err => console.error('Error connecting to MongoDB Atlas:', err));
  return res;
}


// export {getQuestionByID,getAllQuestion};

module.exports = {getQuestionByID,getAllQuestion};
