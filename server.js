const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bodyParser = require("body-parser");

const userRouter = require("./Routes/userRoutes");
const stockScreenerRouter = require("./Routes/stockScreenerRoute");
const dbPool = require("./Controllers/dbPool");

const app = express();

app.use(express.json());
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Error-handling middleware for JSON parse errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    console.error("Bad JSON payload:", err.message);
    return res.status(400).json({ error: "Invalid JSON payload" });
  }
  next();
});

const PORT = 8080;

//Routers

app.use("/users", userRouter);

app.get("/api/plans", async (req, res) => {
  try {
    if (!dbPool) {
      return res
        .status(500)
        .json({ error: "Database connection is not established" });
    }
    const selectQuery = "SELECT * FROM subscription_plan";
    const [plans] = await dbPool.query(selectQuery);
    res.json(plans);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use("/userPayment", userRouter);

app.use("/stocksScreener", stockScreenerRouter);

app.get("/api/userpayment", async (req, res) => {
  try {
    if (!dbPool) {
      return res
        .status(500)
        .json({ error: "Database connection is not established" });
    }
    const selectQuery = "SELECT * FROM user_payment_details";
    const [users] = await dbPool.query(selectQuery);
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/stocks", async (req, res) => {
  try {
    if (!dbPool) {
      return res
        .status(500)
        .json({ error: "Database connection is not established" });
    }
    const stocksQuery = `select * from stocks;`;
    const [stocks] = await dbPool.query(stocksQuery);
    res.status(200).json(stocks);
  } catch (e) {
    console.error("Error fetching users:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/compstock", async (req, res) => {
  try {
    if (!dbPool) {
      return res
        .status(500)
        .json({ error: "Database connection is not established" });
    }
    const stockslistQuery = `select * from comapanies_stocks_list;`;
    const [stockslist] = await dbPool.query(stockslistQuery);
    res.status(200).json(stockslist);
  } catch (e) {
    console.error("Error fetching users:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/nifty100", async (req, res) => {
  try {
    if (!dbPool) {
      return res
        .status(500)
        .json({ error: "Database connection is not established" });
    }
    const stockslistQuery = `select * from comapanies_stocks_list where NIFTY_100 != '-' limit 41;`;
    const [stockslist] = await dbPool.query(stockslistQuery);
    res.status(200).json(stockslist);
  } catch (e) {
    console.error("Error fetching users:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/nifty500", async (req, res) => {
  try {
    if (!dbPool) {
      return res
        .status(500)
        .json({ error: "Database connection is not established" });
    }
    const niftyQuery = `select * from Nifty500_Company_List;`;
    const [nifty500] = await dbPool.query(niftyQuery);
    res.status(200).json(nifty500);
  } catch (e) {
    console.error("Error fetching users:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const connectAndStartServer = async () => {
  try {
    console.log("Connected to the database!");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Error While Connecting:", err);
    process.exit(1);
  }
};

connectAndStartServer();
