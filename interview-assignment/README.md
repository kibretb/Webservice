# Lumina Learning Ltd - Graduate Software Developer Assignment
We kindly ask you to solve the task below. By solving and submitting this assignment you provide us with insights in how you solve real-world problems. What we will be looking at are topics such as: choice of technology, structuring of code, selection of 3rd party libraries, documentation etc.


## The task
- Build a service with PHP or JavaScript (NodeJs as webserver) as the server side language
- Use MySQL, MariaDB, PostgreSQL, SQL Server or SQLite as the database

Build a single page to show everyone's favourite movies from database, it should at least show movie Title, Poster, and Plot synopsis using [OMDb API](https://www.omdbapi.com) or any other public movie API that supports IMDb ID (e.g. tt8526872)

It should also be able to add or remove list of favourite movies.

Please use the data set provided in the SQL dump in this repo as a base.
You can change original asset that you think will make the solution better.
You are allowed to use any library or framework to help you with the task.

## Bonus task
You are not required to complete all of the bonus tasks, but great if you do! We may want to discuss your approach to the bonus tasks during interview so please think of your approach to these challenges even if you do not complete them.

- Use client side framework such as AngularJS, Angular, ReactJS, Vue, etc.
- Add simple authentication for any user (or all users) and only authenticated user could view or edit their favourite movies. You could adjust the database structure if needed.
- Add unit tests
- Any other improvement or modification (please add it into the readme and explain your reasoning of the improvement or modification)

## Expectations
Make a copy of this repo. Solve the task. Push your code to a public repo, and send us the link as a reply to our email.

Your solution should include a short readme describing your assumptions regarding the task, technology choice, your solution, how to use/test it and any final considerations such as known errors, limitation, something you struggle with, next steps, security concerns etc. 

Don't worry we are not expecting this thing to be perfect.

## Note
To get an API key in [OMDb API](https://www.omdbapi.com), you will need to register with your name and email address. If you do not constent to give such details to OMDb API, please let us know and we will happily give you an API key for this assignment.



## My Solution and My Assumption
I have used the given(provided) database with 5 users as a base, and when the app first runs it would display each user and his favorite movies. for the deletion part, I have included a delete button across each of the user's favorite movies, and whenever the user wants to remove one of his favorites he could simply do so by clicking the delete Icon. For the addition part, I have implemented one generic add method where a user is asked to put his id where the id is his id on the database and the movie(or movies separated by commas) he wants to add. The user has to provide his first name(case sensitive) to authenticate himself for successful addition. if his id and first name are not a match he is not able to add movies and an error message is displayed.


My app is working with the 5 given users as I assumed that functionality to add new users is not required. I have followed the same table structure as the given MySQL database although it is possible to normalize it further.



PHP
Using PHP, I have created the required database dynamically and the user's table will be created and populated(initialized) with the provided sample users when the app starts.

React Js
I have used create-react-app to create my react app 
All my react interfaces are built using functional components.

# Database Credentials (see:- DBconnection.php)
  database name :`Users`
  table name : `users`
  host : `127.0.0.1`
  username : `root
  password : '';

The database name and table name will be created dynamically but the host, username, and password should need to be configured according to the environment where my app is tested.[see:- DBconnection.php]
They can be simply adjusted in the DBconnection.php file.

# Security
I have used PDO and prepared  statements as it is a good practice against SQL injections.

# axios
I have used Axios to make HTTP requests 

# Bootstrap && react-bootstrap-icons
   UI style and layout.


# Languages Used
PHP, React Js, Bootstrap,axios,mysql,react-bootstrap-icons

# Editor
Visual Studio code

# Test 
The app is starting from movie-app folder where it holds the react-js 

Navigation
cd interview-assignment
cd movie-app  => app starts with npm start

#Limitations
  app crashes on database connection error no alternative view is provided.

Next Steps
  write unit Test.
  Implement authentication on movie deletion.

   




