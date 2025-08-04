import { useState } from 'react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [token, setToken] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        setMessage('Login exitoso');
      } else {
        setMessage(data.error || 'Error en login');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage('Error de conexión');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {message && <p>{message}</p>}
      {token && (
        <div>
          <strong>Token JWT:</strong>
          <pre>{token}</pre>
        </div>
      )}
    </div>
  );
}