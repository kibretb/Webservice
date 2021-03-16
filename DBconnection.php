<?php
class DBconnection {
    public $host = "127.0.0.1";
    public $db="Users";
    public $user ="root";
    public $password='';
    
    
  //get all users and their records from database
    public function querySelectUsers($query){
        $pdo = $this->connect();       
        $statmt = $pdo->query($query);
        $users = array();
        while($row = $statmt->fetch(PDO::FETCH_ASSOC)){
            $users[] = $row;
        }
        return $users;
    }
   
  //updates fav movies
    public function updateUsers($query,$params){
        $pdo = $this->connect();    
        $statmt =$pdo->prepare($query);   
        $statmt->execute($params);
    }

    //Insert the records when the app starts
    public function queryInsertUsers(){
        $sql = "INSERT INTO users (id,firstName,lastName,favourite_movies)
                 VALUES
                (1,'Anona','Cruz','tt0848228,tt4154756,tt2395427,tt4154796'),
                (2,'Camilla','Sayer','tt4154756,tt10515848,tt0120575'),
                (3,'Ganesh','Zentai','tt0287871,tt2975590,tt0103776,tt4116284,tt2313197'),
                (4,'Vivien','Straub','tt0926084,tt0417741'),
                (5,'Bernardita','Bishop','tt0389860');";
        return $sql;        
    }

   //Create Table query Statement
    public function queryCreateTable(){
        $table = "users";
        $sql = $sql = "CREATE TABLE IF NOT EXISTS $table(
                       id int(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
                       firstName varchar(255) default NULL,
                       lastName varchar(255) default NULL,
                       favourite_movies varchar(255) default NULL
        )";   
        return $sql;
    }
   
    //connect to mysql
    private function connect(){
        //set driver and host
        $dsn="mysql:host=$this->host";
        
        //create PDO instance
        try{
            $pdo= new PDO($dsn, $this->user,$this->password);
            //setting default pdo attributes change them when necessary
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_OBJ,PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
           
            //create database
            $db = "Users"; 
            $sql = "CREATE DATABASE IF NOT EXISTS `$db`";
            $pdo->exec($sql);
            
            //use the database you have created
            $sql = "use $db";
            $pdo->exec($sql);  
            
            //create table users
            $sql = $this->queryCreateTable();
            $pdo->exec($sql);    
            
            //checking if the table is creating for the first time and intializing
            //the contents of the table
            $queryCheck = $pdo->query("select * from users");
            $result = $queryCheck->fetch(PDO::FETCH_ASSOC); 
            if(empty($result)){
                $sql = $this->queryInsertUsers();
                $pdo->exec($sql);    
            }                                        
            return $pdo;
        }catch(PDOException $e){
           echo "connection to mysql failed. Make sure to restart mysql server ".$e->getMessage();
        }
    }
}
?>