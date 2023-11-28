
This application seamlessly facilitates real-time coding sessions between mentors and students, utilizing the MERN stack—MongoDB, Express, React, and Node.js. <br>

Here's how the application operates:

On the frontend, using React, a Socket is created to send an identification request to the backend server.

The backend dynamically assigns roles based on the order of entry, with the mentor being the initial user.

Subsequently, the frontend requests questions from the MongoDB database on the backend server.

Users can choose a question and modify the code using the Monaco editor.<br> Any changes made are instantly reflected on the mentor's code screen.

Importantly, the mentor has read-only access and cannot alter the student's code.

Once the student completes their solution, they can submit it, check its correctness, and potentially receive rewards.

Additional Notes:

A. The main branch contains a local environment setup for convenient local usage:

Navigate to the backend directory: cd backend
Run the server: node server.js
Open a new terminal
Move to the frontend directory: cd frontend
Start the application: npm start
B. The deploy branch is configured for deployment on render.com. Access the live application using the following link: https://live-session.onrender.com.

The questions for testing are then revealed to the user, such as:

Question name: Hello World!
Solution:
console.log('Hello world!');

Question name: For In
Solution:
let animals = ['cat', 'dog', 'elephant', 'lion'];

for (let index in animals) {
    console.log(animals[index]);
}

Question name: Addition
Solution:
var num1 = 5;
var num2 = 10;
var sum = num1 + num2;
console.log(sum);

Question name: String Length
Solution:
var str = 'I love Javascript';
console.log(str.length);

Question name: Array Sum
Solution:
var numbers = [2, 4, 6, 8, 10];
var sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum);

Question name: Square Root
Solution:
var number = 16;
var squareRoot = Math.sqrt(number);
console.log(squareRoot);




https://github.com/OrBenNun/Moveo-Task/assets/81117925/4f260063-315c-4981-b7af-7769ea56b002

