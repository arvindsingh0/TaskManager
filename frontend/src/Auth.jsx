import { useState } from "react";

function Auth({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  

  const handleAuth = async (e) => {
    e.preventDefault();

    const url = isLogin
      ? "http://localhost:3001/auth/login"
      : "http://localhost:3001/auth/register";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (isLogin) {
      localStorage.setItem("token", data.token);
      setToken(data.token); // updates App.jsx
    } else {
      alert("User registered. Please login.");
      setIsLogin(true);
    }
  };

  return (
    <form onSubmit={handleAuth}>
      <h2>{isLogin ? "Login" : "Signup"}</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc"
      }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc"
      }}
      />

      <button type="submit"
      style={{
    width: "100%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}>
        {isLogin ? "Login" : "Signup"}
      </button>

      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
        {isLogin
          ? "Don't have an account? Signup"
          : "Already have an account? Login"}
      </p>
    </form>
  );
}

export default Auth;