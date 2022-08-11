const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/auth', require('./routes/auth'));
app.use('/courses', require('./routes/course'));

const PORT = process.env.PORT || 4000;
mongoose
    .connect(process.env.MONGO_URI)
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`server running on http://localhost:4000`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
// routes
