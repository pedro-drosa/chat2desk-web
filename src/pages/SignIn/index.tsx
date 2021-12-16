import { FormEvent, useState } from "react";
import * as yup from 'yup';
import { api } from "../../services/api";
import logoImg from '../../assets/logo.svg';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Signin() {
const [error, setError] = useState('');

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    try {
      event.preventDefault();

      let schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required().min(6),
      });
  
      if(!(await schema.isValid({email, password}))){
        setError("validation error, please check the data");
        return
      }
  
      const { data } = await api.post('/auth', { email, password });
  
      if(data.error) {
        setError(data.error);
        return;
      } 
      
      setError('');
      navigate('/users', { state: data });

    } catch (error) {
      setError('an error occurred, check the data');
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <img src={logoImg} alt="logo chat" />
      <h1>Sign in</h1>
      <h3>to continue</h3>
      <label htmlFor="email">E-mail</label>
      <input name="email" placeholder="email@email.com" type="email" value={email} onChange={e=> setEmail(e.target.value)} required/>
      <label htmlFor="password">Password</label>
      <input name="password" placeholder="******" type="password" minLength={6} value={password} onChange={e=> setPassword(e.target.value)} required/>
      <button>Login</button>
      {error && <p style={{color:"#fe0001"}}>⚠ {error}</p>}
      <Link to='/register'>create account</Link>
    </form>
  )
}
