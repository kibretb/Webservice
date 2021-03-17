import React from "react";
import { Trash} from 'react-bootstrap-icons';
import axios from 'axios';


const ListFavorites =({users,movies,movieRemoved}) =>{ 
  
  //function that removes users movie
  const handleRemoveFavorite = (userId,movieId) => {         
        axios.post('http://localhost/interview-assignment/Users.php', {userId, movieId})
              .then(resp=>{
                movieRemoved(resp.data,userId); //passing data to grand parent
              })
  }
      
  //holds favorite movies and name of users to be rendered
  const usersAndFavourites = Object.entries(movies).map(([key,value])=>{
          return users.map(user=>{
                if(user.id === key){
                    return <div id={key} key={key}>
                       <span className="display-4"> {user.firstName} {user.lastName} </span>                      
                         <table className="table table-striped"> 
                            <thead className="thead-dark">
                              <tr>
                                 <th>Title</th>
                                 <th>Poster</th> 
                                 <th>Plot</th>
                                 <th></th>
                              </tr>
                            </thead>  
                        {
                         
                        value.map(record=>{
                                return <tbody key={record.imdbID} id={record.imdbID}>
                                  <tr>
                                    <td>{record.Title}</td>
                                    <td><img src={record.Poster}></img></td>
                                    <td>{record.Plot}</td>
                                    <td>
                                        <button onClick={()=>handleRemoveFavorite(user.id,record.imdbID)}
                                         type="button" 
                                         className="btn btn-default">
                                            <Trash/>
                                        </button>
                                     </td>
                                   </tr>
                                </tbody>                               
                                
                        })                      
                        }
                        </table>                 
                        <hr/> 
                        <hr/>                    
                    </div>   
                }
            })
    })
    return(  
       usersAndFavourites        
    )
}

export default ListFavorites;