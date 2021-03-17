const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const authJwt = require("./utils/jwt");
const errorHandler = require("./utils/error-handler");

const app = express();

// set up cors
app.use(cors());
app.options("*", cors());

// middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(authJwt());
app.use(errorHandler);

const api = process.env.API_URL;

// routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// connect database
mongoose
  .connect(process.env.CONNECTION_STRING, {
    auth: {
      user: "shop-user",
      password: "qewtyw-xahdUg-7xijmo",
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database Connection Failed", err);
  });

app.listen(8002, () => {
  console.log("server started localhost:8002");
});
