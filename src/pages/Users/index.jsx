import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

import './styles.css';

export function Users() {
  const location = useLocation();
  const [users, setUsers] = useState([]);

  const state = location.state;

  const navigate = useNavigate();

  useEffect(() => {
    async function authenticate() {
      if (!state) {
        navigate('/');
      }

      try {
        const { data } = await api.get('/users', {
          headers: {
            Authorization: `Bearer ${state.token}`,
          }
        });

        setUsers(data);

      } catch (error) {
        navigate('/');
      }
    }
    authenticate();
  }, [state, navigate]);

  return (
    state &&
    <>
    <h1>All user registered</h1>
    <h3>Authenticated as: { state.user.name }</h3>
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>E-mail</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
    </>
  )
}
