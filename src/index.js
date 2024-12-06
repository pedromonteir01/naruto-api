require('dotenv').config();
const express = require('express');
const routes = require('./routes/index.routes');

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`server starred in http://localhost:${port}`));

