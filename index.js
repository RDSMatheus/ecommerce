require('dotenv').config();
const port = process.env.PORT;
const jwtsecret = process.env.TOKEN_SECRET;

const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors());

const UserRoute = require('./routes/UserRoutes');
const ProductRoutes = require('./routes/ProductRoutes');

app.use('/products', ProductRoutes);
app.use('/users', UserRoute);

app.listen(port);
