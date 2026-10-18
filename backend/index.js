const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const pasteRoutes = require('./routes/pasteRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api',authRoutes);
app.use('/api/pastes', pasteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("App is Running !");
})