import { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage('Registro exitoso');
        setForm({ name: '', email: '', password: '' });
      } else {
        setMessage(data.error || 'Error en registro');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setMessage('Error de conexión');
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
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
        <button type="submit">Registrarse</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}