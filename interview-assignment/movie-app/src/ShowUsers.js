import React,{useEffect,useState} from 'react';

import axios from 'axios';
import ListFavorites from "./ListFavorites";
import AddMovie from "./AddMovie";


const ShowUsers = ({users,onRemoveMovie,onAddMovie}) =>{  
   const [movies,setMovies] = useState({});   
   useEffect(()=>{   
    users.forEach(element => {           
            let favMovies = element.favourite_movies; //string that holds each user favorite movie
            if(favMovies){
                favMovies = favMovies.split(",");   //converts it to array          
                 let results = [];     //array which holds response of omdbapi for each user
                 for(let i=0;i<favMovies.length;i++){            
                 axios.get('http://www.omdbapi.com/?i='+favMovies[i]+'&apikey=bec94f8c')
                     .then(data => {
                        results.push(data.data)
                         if(i === favMovies.length-1){                                     
                            setMovies((movies)=>({...movies,[element.id]:results}));                                                   
                         }                                             
                      })
                     .catch(err=>{
                        console.log(err);
                     });
                 }   
            }         
        });       
  },[movies.length,users]);              
    

    const handleRemoveFavorite = (users,userId) =>{
        onRemoveMovie(users); //pass data to parent   
        if(movies[userId].length === 1){ //force rerender on removal of the last element
           setMovies({});
        }   
        
    }
   
    
    //authenticate user against his user ID before adding a movie
    const  validateUserOnAddition = (userId,errMsg,firstName) =>{
       let exists = false; 
       for(var i=0;i<users.length;i++){
            if(users[i]["id"] === userId && users[i]["firstName"] === firstName){
                exists = true
                break;
            }
       }       
       exists?errMsg.current.style.display="none":errMsg.current.style.display="block";   
       return exists;               
      
    }
    
    //function that handles addition of favourite Movies
    const handleAddFavorite = (userId,newMovies,errMsg,firstName) =>{  
        const exists = validateUserOnAddition(userId,errMsg,firstName);      
        let imdbID = []; 
        if(newMovies && userId && exists){  
          newMovies = newMovies.trim();     
          let moviesToBeAdded = newMovies.split(",");           
          for(let i=0;i<moviesToBeAdded.length;i++){  
            axios.get('http://www.omdbapi.com/?t='+moviesToBeAdded[i]+'&apikey=bec94f8c')
                .then(resp=>{    
                  (typeof resp.data.imdbID !== "undefined") && imdbID.push(resp.data.imdbID);    
                     if(moviesToBeAdded.length-1 === i) {
                       let imdbIds = imdbID.join(",");
                       imdbIds = imdbIds.replace(/^,|,$/g, ''); //trims commas from starting and last position if user accidentally types in
                       console.log(imdbIds);
                       axios.post('http://localhost/interview-assignment/Users.php', {userId, imdbIds})
                             .then(resp=>{                
                               onAddMovie(resp.data); //pass data to paren component
                             })
                             .catch(err=>{
                              console.log(err);
                             });                   
                        
                     }
                })
                .catch(err=>{
                  console.log(err);
                });                 
          }
        }
    }  

    return (   
        <div className="container">  
           <ListFavorites  users={users} 
                           movies={movies} 
                           movieRemoved={handleRemoveFavorite} 
            />  
            <AddMovie handleAddMovie = {handleAddFavorite} users={users}/>                                                        
        </div>
    );
}
export default ShowUsers;
