# Quizzy
### A Gamified Quizzing Website

Welcome to Quizzy, an exciting and interactive platform where users can challenge themselves with thrilling timed multiple-choice quizzes! Test your knowledge, track your performance, and get detailed insights to help you learn and grow.

## Features
•Timed Quizzes: Engage in fast-paced, multiple-choice quizzes that challenge your knowledge under a timer.

•User Accounts: Sign up, log in, and keep track of your quiz performance.

•User Authentication & Security: Secure user authentication with password hashing for added security. User passwords are safely stored using industry-standard encryption methods

•Performance Review: After each quiz, receive an in-depth performance report, including the number of correct, incorrect, and unattempted questions, your final score, and detailed solutions to enhance your learning.

•Restart Quiz: The option to restart a quiz anytime, allowing users to try again and improve their performance

•Gamified Experience: Make your learning fun with a dynamic, game-like environment.

•Seamless Navigation: Smooth and intuitive navigation between different pages of the app, providing an enjoyable and uninterrupted user experience.

•Instant Feedback: Get instant feedback giving a quiz, allowing you to learn right away from your mistakes.


## Tech-Stack
FrontEnd-HTML,CSS,Tailwind CSS,Javascript,React.js,localstorage,axios,React Router DOM

BackEnd-Node.js,Express.js

Database-MongoDB

Authentication-bcrypt,jsonwebtoken

## Additional Tech-Stack
•Used react toastify for messages
•Fetched questions from api https://api.jsonserve.com/Uw5CrX.
 


## Live Demo

### SignUp Page

![image](https://github.com/user-attachments/assets/d5ba5fc8-bcfd-4db9-be51-fac3ca566e88)


### Login Page
![image](https://github.com/user-attachments/assets/0fdcd2c3-10a1-487e-b9f0-f59c678f3082)


### Home Page

![image](https://github.com/user-attachments/assets/0d6b1827-8ee8-4219-a378-1d4af2ea8a54)


### Quiz Page


![image](https://github.com/user-attachments/assets/3aaabcdf-83ce-4da2-904e-7f7a420b84dc)

![image](https://github.com/user-attachments/assets/93dec75c-1052-461d-86f0-3bc6c332dd43)


### Results Page


![image](https://github.com/user-attachments/assets/bf2248df-0c73-44d1-8ee9-0a3ae65aec6a)

### Review

![image](https://github.com/user-attachments/assets/f8e5d5e1-f350-4c40-8866-ee41d71a9676)

![image](https://github.com/user-attachments/assets/805ed2ef-6a78-448c-9745-8ba9bc38619b)


### Account Page

![image](https://github.com/user-attachments/assets/36a82a3e-b8fc-497a-aa4d-888be5643be3)

### About Us Page

![image](https://github.com/user-attachments/assets/c0514619-f05c-4862-a494-62065f4b88c6)


## Getting Started
These instructions will help you set up and run Quizzy locally.

### Prerequisites

Before cloning and setting up the project, ensure you have the following installed:

1)Node.js (v14.x or above) - Download Node.js

2)npm (Node package manager) - This is included with Node.js, but ensure it's installed by running the following:


![image](https://github.com/user-attachments/assets/e961375d-3a83-4443-85d3-4a2b1de0ae63)


### Clone the Repository

git clone https://github.com/AnoushkaSamanta/Quizzy.git


### Set up Backend
1.Navigate to backend directory


![image](https://github.com/user-attachments/assets/6aa801c8-78b1-42dc-9784-9e348d41d7e8)

2.Install Backend dependencies

![image](https://github.com/user-attachments/assets/114a85b6-be1c-4a96-87e6-6a1a40f6d658)


3.Create .env file for backend and create JWT_SECRET and PORT environment variables

For example:

![image](https://github.com/user-attachments/assets/db5be84d-976b-4fe0-bf6f-047e343507f4)

4.Connect to MongoDB compass,create a database named quizzy and paste the connection string like this in index.js

![image](https://github.com/user-attachments/assets/1808f78f-7d56-48d8-a464-feb4db447f71)

5.Run the server using

![image](https://github.com/user-attachments/assets/d1adaafe-5b0c-4198-950a-efc1cee84d4b)


![image](https://github.com/user-attachments/assets/547db8e7-f296-432e-93fa-5c3f4e26ee39)



npx nodemon index.js

Before that ensure you have nodemon,express,cookie-parser,bcrypt,mongoose,jsonwebtoken,dotenv and cors installed!

![image](https://github.com/user-attachments/assets/2820e630-bfd5-437b-8b2e-cefc8dee9720)


### Set up FrontEnd

1.Navigate to the Frontend Directory

![image](https://github.com/user-attachments/assets/b763ab19-ad65-420b-a37e-a20f2bea0f63)

2.Install Frontend Dependencies

![image](https://github.com/user-attachments/assets/c5ddc51f-0d64-462e-a1f3-b1eb7c49a9b5)

3.Start the Frontend Server.

![image](https://github.com/user-attachments/assets/5009296c-7e7e-40ba-b6ce-3640f13c8d3b)


The frontend should now be running on http://localhost:5173.
If not copy the frontend URL and paste it index.js in the origin of CORS.

![image](https://github.com/user-attachments/assets/db148d7d-e1f1-4ad7-b9e0-7d5abbb7dcbe)



To use react-toastify, install React Toastify:


![image](https://github.com/user-attachments/assets/be68d300-c206-4158-9eae-18854b7a11b0)



### That's right! 🎉 Now that everything is set up, you're ready to start quizzing! 😄 You can sign up, log in, and enjoy.
## Happy quizzing!















