require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(cors({
  origin: [
    "http://localhost:5173", // for Vite local dev
    "http://localhost:3000", // for CRA local dev
    "https://notes-app-3-rdzk.onrender.com" // frontend Render URL
  ],
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
