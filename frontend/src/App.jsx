import { useEffect, useState } from "react";
import Auth from "./Auth";
import Tasks from "./Tasks";
function App() {

  const [token, setToken] = useState("");
 

//LOGOUT
const logout = () => {
  localStorage.removeItem("token"); // remove token
  setToken("");
  setTasks([]);                     // clear state
};

//LOAD TOKEN FROM STORAGE
useEffect(() => {
  const savedToken = localStorage.getItem("token");

  if (savedToken) {
    setToken(savedToken);
  } 
}, []);


  // FETCH TASKS
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:3001/tasks", {
      headers: {
        Authorization: token
      }
    });
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
  if (token) {
    fetchTasks();
  }
}, [token]);



  // CREATE TASK
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token   // send token in header for auth
      },
      body: JSON.stringify({
        title,
        description
      })
    });

    setTitle("");
    setDescription("");
    fetchTasks(); // refresh list
  };


    // DELETE TASK
  const deleteTask = async (id) => {
  await fetch(`http://localhost:3001/tasks/${id}`, {
    method: "DELETE",
    headers: {
        Authorization: token
      }
  });

  fetchTasks()// refresh UI
};

// TOGGLE STATUS
const toggleStatus = async (task) => {
  const newStatus = task.status === "pending" ? "done" : "pending";

  await fetch(`http://localhost:3001/tasks/${task._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({
      status: newStatus
    })
  });

  fetchTasks();
};

   return (
    <div style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#320665"
}}>
  <div style={{
    width: "400px",
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  }}>
      <h1 style={{
  textAlign: "center",
  marginBottom: "20px",
  fontSize: "28px",
  fontWeight: "600",
  color: "#000000"
}}>
  Task Manager
</h1>

     {!token ? (
  <Auth setToken={setToken} />//auth updating login state in App.jsx
) : (
  <button onClick={logout}>Logout</button>
)}

      {token && <Tasks token={token} />}
    </div>
    

  </div>
);
}

export default App;