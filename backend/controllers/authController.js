import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool } from '../db.js'

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [name, email, hashedPassword]
    );
    res.status(201).json({ message: 'Usuario registrado' });
  } catch (error) {
    console.error('Error en registerUser:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

export const loginUser = async (req, res) => {
  const { name, email, password} = req.body
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    const user = result.rows[0]
    if (!user) return res.status(400).json({ error: 'Datos incorrectos' })

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ message: 'Login exitoso', token })
  } catch (error) {
    res.status(500).json({ error: 'Error en el login' })
  }
}