import React, { useState, useEffect} from 'react'

import './App.css'
import axios from 'axios';

function App() {

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
        try{
          const getAll = await axios.get("http://localhost:5000/read/all");
          setPosts(getAll.data);
          console.log(getAll.data);
        }catch(e){
          console.log("there was an error: " , e);
        }
    }

  useEffect(() =>{    
    fetchPosts();
  }, []);

  const onSubmit = async (event) =>{
      event.preventDefault(); 
      // Send data to server 
      const requestBody = {
        name: name,
        message: message,
      }
      const response = await axios.post("http://localhost:5000/create", requestBody);
      setName('');
      setMessage('');
      fetchPosts();
  }

  const onDelete = async (id) => {
    console.log(id);
    
    await axios.delete(`http://localhost:5000/delete/${id}`);
    fetchPosts();
  }

  const handleName = (event) => {
    setName(event.target.value);
  };
  
  const handleMessage = (event) => {
    setMessage(event.target.value);
  }
  

  return (
    <>
      <h1>Message Board:</h1>
      <h3>Add your name and a message: </h3>
      <form onSubmit={onSubmit} >
        <label>
          Name:
          <input type="text" name="full_name" value={name} onChange={handleName} />
        </label>
        <br></br>
        <label>
          Message:
          <input type="text" name="message" value={message} onChange={handleMessage}/>
        </label>
        <br></br>
        <button type="submit">Submit</button>
      </form>
      <div>
          <h2>All Messages</h2>
          <ul>
              {posts.map((msg, index) => (
                  <li key={msg.id}>
                    <strong>{msg.name}:</strong> {msg.message}
                    <button onClick={() => onDelete(msg.id)}>delete</button>
                  </li>
            ))}
          </ul>
          
      </div>
    </>
  )
}

export default App
