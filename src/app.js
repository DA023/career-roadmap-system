const express = require('express');
const path = require('path');
const roadmapRoutes = require('./routes/roadmapRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

// Mount the AI API routes
app.use('/api/v1/roadmap', roadmapRoutes);

// Basic health check route (for debugging)
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API is running smoothly.' });
});

module.exports = app;