const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

// Custom Modules
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('cove nest apis is running ');
});

app.use('/api/auth', require('./routes/auth.routes'));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/project',  require('./routes/project.routes'));
app.use('/api/news',  require('./routes/news.routes'));
app.use('/api/event',  require('./routes/event.routes'));
app.use('/api/blog',  require('./routes/blog.routes'));
app.use('/api/videos',  require('./routes/video.routes'));
app.use('/api/faq',  require('./routes/Faq.routes'));
app.use('/api/experts',  require('./routes/expert.routes'));

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
