const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');


const app = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json());


// Routes
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('MongoDB connected'))
 .catch(err => console.error(err));


// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
