require('dotenv').config();


const express = require('express');
const cors = require('cors');
const pool = require('./src/config/database');

const app = express();

app.use(cors({
  origin: process.env.URL_FRONTEND || 'http://localhost:5173', // URL de tu frontend React
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');

    res.json({
      ok: true,
      database: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      error: 'Error conectando a la base de datos',
    });
  }
});

app.get('/products', async (req, res) => {
  try {

    const produts = await pool.query('select * from "products"')

    res.json({
      products: produts.rows,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      response: 'Error en consulta de products'
    })
  }
})

app.get('/categories', async (req, res) => {
  try {
    const categories = await pool.query('SELECT * FROM "categories"');

    res.json({
      ok: true,
      categories: categories.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      error: 'Error consultando categorías',
    });
  }
});




app.get('/users', async (req, res) => {
  try {

    const users = await pool.query('SELECT * FROM "user"')
    res.json({
      ok: true,
      users: users.rows,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      ok: false,
      error: 'Error conectando consultando usuarios',
    });
  }
})

app.listen(3000, () => {
  console.log('Servidor ejecutándose en http://localhost:3000');
});