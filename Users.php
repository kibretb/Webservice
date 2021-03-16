<?php
header('Access-Control-Allow-Origin: *');  //allows CORS
header('Access-Control-Allow-Headers: Content-Type');
include "DBconnection.php";

class Users {
    public function getAllUsers($query){  
       $conn = new DBconnection();   
       $result = $conn->querySelectUsers($query);      
       return $result;
    }
    //function that updates users table on deletion and addition
    public function updateFavMovies($query,$params){
        $conn = new DBconnection();   
        $result = $conn->updateUsers($query,$params);      
    }
}

$users = new Users(); //instantiniateObject of Users

//get incoming post data from axios
$post = json_decode(file_get_contents('php://input'), TRUE);
    
//remove favorite movie
    if(isset($post["userId"]) && isset($post["movieId"])){
        $selectQuery = "select * from users where id=".$post["userId"];
        $recordResult = $users->getAllUsers($selectQuery);
        foreach($recordResult as $record){
            $favouriteMovies = $record["favourite_movies"];
            $favouriteMovies = explode(',', $favouriteMovies);
            if(count($favouriteMovies)==1){
                $updateQuery="UPDATE users SET favourite_movies = NULL WHERE id= ?";
                $users->updateFavMovies($updateQuery,array($post["userId"]));
            }else{
                if (($key = array_search($post["movieId"], $favouriteMovies)) !== false) {
                    unset($favouriteMovies[$key]);
                }
                $favouriteMovies = implode(",",$favouriteMovies);
                $updateQuery="UPDATE users SET favourite_movies= ? WHERE id= ?"; //prepared statement
                $users->updateFavMovies($updateQuery,array($favouriteMovies,$post["userId"]));
            }
         
        }   
    }
     
    
   //Add favorite Movies
   if(isset($post["userId"]) && isset($post["imdbIds"])){

        $selectQuery = "select * from users where id=".$post["userId"];
        $recordResult = $users->getAllUsers($selectQuery);
        foreach($recordResult as $record){
            $favouriteMovies = $record["favourite_movies"];
            //append new imdbId to the existing favourite movies 
            if(!empty($favouriteMovies) && !is_null($favouriteMovies)){
                $favouriteMovies = $favouriteMovies.",".$post["imdbIds"];    
                $favouriteMovies = explode(',', $favouriteMovies);
                $result = array_unique($favouriteMovies);
                $result = implode(",",$result);
                $updateQuery="UPDATE users SET favourite_movies= ? WHERE id= ?"; //prepared statement
                $users->updateFavMovies($updateQuery,array($result,$post["userId"]));
            }
            //if favorite movies is null add new movies
            else{ 
                $updateQuery="UPDATE users SET favourite_movies= ? WHERE id= ?"; //prepared statement
                $users->updateFavMovies($updateQuery,array($post["imdbIds"],$post["userId"]));
            }
        }
   }

$selectQuery = "select * from users";  
echo json_encode($users->getAllUsers($selectQuery ));
?>