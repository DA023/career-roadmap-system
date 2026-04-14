const express = require('express');
const upload = require('../middlewares/uploadMiddleware');
const { analyzeRoadmap } = require('../controllers/roadmapController');

const router = express.Router();

// upload.single('resume') looks for a file field named 'resume'
router.post('/analyze', upload.single('resume'), analyzeRoadmap);

module.exports = router;