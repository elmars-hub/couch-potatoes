"use client";

import { signup } from "@/lib/auth";
import { useState } from "react";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup() {
    if (!fullName || !email || !password) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const data = await signup({ fullName, email, password });

      console.log("Signup data:", data);

      if (data?.user) {
        setMessage(
          "Signup successful! Please check your email for confirmation."
        );
        // Clear form fields on success
        setFullName("");
        setEmail("");
        setPassword("");
      } else {
        setMessage("An unexpected error occurred during signup.");
      }
    } catch (error) {
      // The signup function throws a new Error, which we catch here
      setMessage(error instanceof Error ? error.message : "Signup failed.");
      console.error(error);
    }
  }

  return (
    <div>
      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
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
      <button onClick={handleSignup}>Sign Up</button>
      <p>{message}</p>
    </div>
  );
};

export default Signup;
