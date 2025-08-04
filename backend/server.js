import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/users', authRoutes)

app.listen(3001, () => {
  console.log('Servidor backend en http://localhost:3001')
})