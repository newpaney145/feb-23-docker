const express = require('express');
const knex = require('knex');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
console.log(process.env);

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
// Middleware to check if the name is 'admin'
const checkAdminName = (req, res, next) => {
  if (req.body.name.toLowerCase() === 'admin') {
    return res.status(400).json({ error: "Name 'admin' is not allowed" });
  }
  next();
};

// Create endpoint to add intern information
app.post('/internmembers', checkAdminName, async (req, res) => {
  try {
    console.log("body,", req.body);
    await db('interns').insert(req.body);
    return res.status(201).json({ message: 'Intern added successfully' });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to show list of intern members
app.get('/internmembers', async (req, res) => {
  try {
    console.log('getting data from db');
    const interns = await db('interns').select('*');
    console.log('got data from db');
    return res.json(interns);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to update intern members information
app.put('/internmembers/:id', checkAdminName, async (req, res) => {
  const { id } = req.params;
  try {
    await db('interns').where({ id }).update(req.body);
    return res.json({ message: 'Intern updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint to delete the intern members
app.delete('/internmembers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db('interns').where({ id }).del();
    return res.json({ message: 'Intern deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
