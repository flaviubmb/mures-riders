const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const bikeRoutes = require("./routes/bikeRoutes");
const rideRoutes = require("./routes/rideRoutes");
const componentRoutes = require("./routes/componentRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(helmet());

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "To many equests from this IP, please try again in an hour!",
  standardHeaders: true,
  legacyHeaders: true,
});

app.use("/api", limiter);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(hpp());

app.use(express.static(`${__dirname}/public`));

app.use("/api/bikes", bikeRoutes);
app.use("/api/rides", rideRoutes);
app.use("/api/components", componentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);

module.exports = app;
