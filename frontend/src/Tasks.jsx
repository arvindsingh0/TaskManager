import { useEffect, useState } from "react";

function Tasks({ token }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // FETCH TASKS
  const fetchTasks = async () => {
    const res = await fetch("https://taskmanager-backend-bgql.onrender.com/tasks", {
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

    await fetch("https://taskmanager-backend-bgql.onrender.com/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({
        title,
        description
      })
    });

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token
      }
    });

    fetchTasks();
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
    <>
      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <hr />

      {/* TASK LIST */}
      {tasks.map((task) => (
        <div key={task._id}
  style={{
    border: "1px solid #4f4646",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    backgroundColor: "#171313"
  }}
 >
        key={task._id}
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>

          <button
             onClick={() => toggleStatus(task)}
        style={{
          marginRight: "10px",
          padding: "5px 10px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#2196F3",
          color: "white"
        }}>
 
    Mark as {task.status === "pending" ? "Done" : "Pending"}
          </button>

          <button onClick={() => deleteTask(task._id)}
          style={{
          marginRight: "10px",
          padding: "5px 10px",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#b7251b",
          color: "white"
        }}>
            Delete
          </button>

          <hr />
        </div>
      ))}
    </>
  );
}

export default Tasks;