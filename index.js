const express = require("express");
const router = require("./routes/routes");
const connectDB = require("./db");
const app = express();
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

app.use(express.json());
app.use(helmet());
app.use(router);
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use('/api/', apiLimiter);


connectDB();

const PORT = process.env.PORT || 2300;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
