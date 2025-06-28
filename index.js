const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
const connectDB = require('./config/server');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const path = require('path');

dotenv.config();
connectDB();

const userRoutes = require('./routes/userRoutes');
const skillRoutes = require('./routes/skillRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Swagger documentation route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/api/users', userRoutes);
// app.use('/api/skills', skillRoutes);

// Serve the token interface at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
