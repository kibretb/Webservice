## My Solution and My Assumption

I have used the given(provided) database with 5 users as a base, and when the app first runs it 
would display each user and his favorite movies. for the deletion part, 
I have included a delete button across each of the user's favorite movies, and whenever the user 
wants to remove one of his favorites he could simply do so by clicking the delete Icon. 
For the addition part, I have implemented one generic add method where a user is asked to put his id where
the id is his id on the database and the movie(or movies separated by commas) he wants to add.
 The user has to provide his first name(case sensitive) to authenticate himself for successful addition. 
 If his id and first name are not a match he is not able to add movies and an error message is displayed.

My app is working with the 5 given users as I assumed that functionality to add new users is
not required. I have followed the same table structure as the given MySQL database although 
it is possible to normalize it further.


#PHP
Using PHP, I have created the required database dynamically and the user's table will be created 
and populated(initialized) with the provided sample users when the app starts.

React Js
I have used create-react-app to create my react app 
All my react interfaces are built using functional components.

# Database Credentials (see:- DBconnection.php)
  database name :`Users`
  table name : `users`
  host : `127.0.0.1`
  username : `root
  password : '';

The database name and table name will be created dynamically but the host, username, and password 
should need to be configured according to the environment where my app is tested.[see:- DBconnection.php]
They can be simply adjusted in the DBconnection.php file.

# Security
I have used PDO and prepared statements as it is a good practice against SQL injections.

# axios
I have used Axios to make HTTP requests 

# Bootstrap && react-bootstrap-icons
   for UI style and layout.


# Tech Used
PHP, React Js, Bootstrap,axios,mysql,react-bootstrap-icons

# Editor
Visual Studio code

# running the app/Test 
The app is starting from movie-app folder where  react-js app is located

#Navigation
cd interview-assignment
cd movie-app  => app starts with npm start

#Limitations
  app crashes on database connection error,  no alternative view is provided.
   

#Security Concerns
 My app is running over http instead of https.

Next Steps 
   Unit Tests.
   Implement authentication on movie deletion.
   configure over https.

   