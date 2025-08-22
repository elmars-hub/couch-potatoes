"use client";

import { login } from "@/lib/auth";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      setMessage("Please enter both email and password.");
      return;
    }
    try {
      const { data, error } = await login({ email, password });

      console.log("Login data:", data);

      if (error) {
        setMessage(error);
      } else {
        setMessage("Logged in successfully!");
      }
    } catch (err) {
      setMessage("An unexpected error occurred during login.");
      console.error(err);
    }
  }

  return (
    <div>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{message}</p>
    </div>
  );
};

export default Login;
