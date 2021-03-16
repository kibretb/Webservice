import React,{useEffect,useState,useRef} from 'react';
import { PlusSquareFill} from 'react-bootstrap-icons';

const AddMovie = ({handleAddMovie,users}) => {  
    const [newMovies,setNewMovies] =  useState(''); //holds name of movies to be added
    const [userId,setUserId] =  useState(''); //allows user to add his favoruite movie using his user Id 
    const [firstName,setFirstName] =  useState(''); //authenticate using his name on addition
    let errMsg = useRef(null);
    
    useEffect(()=>{
        setNewMovies('');
        setUserId('');
        setFirstName('');
    },[users])
    //function that handles movie addition
    //passes data to its parent
    const handleAddFavorite = (userId,newMovies,errMsg) =>{
        handleAddMovie(userId,newMovies,errMsg,firstName);
    }

    return (
        <div className="container">
              <h5>Add Movie</h5>
             <input type="number"                             
                    onChange= {(e)=>{
                        setUserId(e.target.value)
                    }}
                    value={userId}                              
                    placeholder="Enter user id" 
                    style = {{
                          display:'block',margin:"0 auto",width:"100%"
                    }}
             />

             <input type="text"                             
                    onChange= {(e)=>{
                        setFirstName(e.target.value)
                    }}
                    value={firstName}                              
                    placeholder="Enter first Name" 
                    style = {{
                          display:'block',margin:"0 auto",width:"100%"
                    }}
             />

             <span ref = {errMsg}
                   style={{display:"none",color:"red"}}>
                   Please Enter Correct user Id
             </span>

            <input type="text"                             
                   onChange= {(e)=>{
                      setNewMovies(e.target.value);  
                   }}
                   value={newMovies}                              
                   placeholder="Enter movie name or movies names separated by commas" 
                   style = {{
                         display:'block',margin:"0 auto",width:"100%"
                   }}
            />          

           <button onClick={()=>handleAddFavorite(userId,newMovies,errMsg)}
                 type="button" 
                 className="btn btn-default">
                     <PlusSquareFill/>
            </button> 
        </div>
    )
}
export default AddMovie;