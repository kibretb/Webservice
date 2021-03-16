import { useState, useEffect } from 'react';
import './App.css';
import ShowUsers from './ShowUsers';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [users,setUsers] = useState([]);
  
  useEffect(()=>{
    async function getUsers(){
      const response = await axios.get(`http://localhost/interview-assignment/Users.php`);
      setUsers(response.data);
    }
    getUsers();    
  },[]);
  
  //UI rerenders when state updates
  const handleRemoveFavorite = (users) =>{
    setUsers(users);
  }
  const handleAddFavorite = (users) =>{
    setUsers(users);
  }

 return (
    <div className="App">    
       <ShowUsers users={users} 
                  onRemoveMovie={handleRemoveFavorite} 
                  onAddMovie={handleAddFavorite}
        />
    </div>
  );
}

export default App;
