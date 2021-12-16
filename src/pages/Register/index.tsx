import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { api } from "../../services/api";
import logoImg from "../../assets/logo.svg";
import { Link } from "react-router-dom";

export function Register() {
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault();

      let schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required().min(6),
      });

      if (!(await schema.isValid({ name, email, password }))) {
        setError("validation error, please check the data");
        return;
      }

      const { data } = await api.post("/users", { name, email, password });

      if (data.error) {
        setError(data.error);
      }

      setError("");
      navigate("/users", { state: data });
    } catch (error) {
      setError("an error occurred, check the data");
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <img src={logoImg} alt="logo chat" />
      <h1>Register</h1>
      <h3>for new Users</h3>
      <label htmlFor="username">Username</label>
      <input
        name="username"
        placeholder="John Doe"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="email">E-mail</label>
      <input
        name="email"
        placeholder="email@email.com"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        name="password"
        placeholder="******"
        type="password"
        minLength={6}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button>Register</button>
      {error && <p style={{ color: "#fe0001" }}>⚠ {error}</p>}
      <Link to="/">Sign In</Link>
    </form>
  );
}
