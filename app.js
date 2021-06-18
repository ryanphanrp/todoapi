const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


/** Local Import */
let taskRoutes = require('./app/routes/task.route');

/** Configuration */
PORT = process.env.HOST || 3000


/** Initial */
const app = express();


/** Middleware */
app.use(cors());


/** Dependencies */
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));


// Set up mongoose
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connected.');
    })
    .catch((error) => {
        console.log('Error connecting to database');
    });


/** Routes */
app.get('/', (req, res) => {
    const data = {
        message: "Hi Fence"
    }
    res.status(200).send(data);
})

app.use('/tasks', taskRoutes);


/** Running */
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})