import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };
  return (
    <div className="cont">
      <form onSubmit={handleSubmit} className="signup">
        <h3>Signup</h3>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {error && <p className="error">Invalid email or password.</p>}
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <button>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
