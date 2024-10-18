const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const EJSLayouts = require("express-ejs-layouts");

// Import routes
const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

app.use(morgan());

// Health Check
app.get("/", async (req, res) => {
    try {
        res.status(200).json({
            status: "Succeed",
            message: "Ping successfully",
            isSuccess: true,
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Ping failed",
            isSuccess: false,
            error: error.message,
        });
    }
});

app.use(express.static(`${__dirname}/public`));

// View Engine
app.set("view engine", "ejs");
app.use(EJSLayouts);
app.set("layout", "layouts/template");

app.use("/users", userRoute);

app.use("/tasks", taskRoute);

// Middleware to handle page not found
app.use((req, res, next) => {
    res.status(404).json({
        status: "Failed",
        message: "API not found !",
        isSuccess: false,
    });
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});