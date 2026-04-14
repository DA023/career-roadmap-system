const app = require('./src/app');
const config = require('./src/config');

app.listen(config.PORT, () => {
    console.log(`Smart Career Path API is running on http://localhost:${config.PORT}`);
    console.log(`Test the health check at http://localhost:${config.PORT}/health`);
});