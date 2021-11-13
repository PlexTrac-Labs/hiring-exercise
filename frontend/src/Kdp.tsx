import React, { useEffect, useState } from "react";
import axios from "axios";

const Hello = () => {
  const [posts, setPosts] = useState([{ id: "id", title: "title" }]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
    };

    fetchData();
  }, []);

  return (
    <div>
            
      <ul data-testid="list">
                
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
              
      </ul>
          
    </div>
  );
};

export default Hello;
