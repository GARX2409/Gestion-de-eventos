const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Habilitar CORS
app.use(cors({
    origin: 'http://localhost:3000', // URL del frontend
    credentials: true,
}));