import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'e_hianatra',
  port: process.env.DB_PORT || 3306,
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

// Test de connexion
pool.getConnection()
  .then(connection => {
    console.log('✅ Connexion à la base de données MySQL réussie')
    connection.release()
  })
  .catch(err => {
    console.error('❌ Erreur de connexion à la base de données:', err.message)
  })

export default pool
