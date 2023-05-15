const express = require("express");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const categoryRoutes = require("./routes/category");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { urlencoded } = require("body-parser");
const Category = require("./models/category");
require("dotenv").config();
require("./db/connection");
const port = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Route Middlewares
app.use("/api", productRoutes);
app.use("/api", categoryRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);

app.get("/categories", (req, res) => {
  Category.find().exec((err, result) => {
    if (err) {
      return res.status(500).json({ error: "hi" });
    }
    return res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server is Running at port ${port}`);
});
