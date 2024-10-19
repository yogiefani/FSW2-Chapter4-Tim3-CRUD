const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const EJSLayouts = require("express-ejs-layouts");
const methodOverride = require('method-override');

// Import routes
const userRoute = require("./routes/userRoute");

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Configure method-override to use _method query parameter
app.use(methodOverride('_method'));

app.use("/dashboard", userRoute);

// Middleware to handle page not found and redirect to /error
app.use((req, res, next) => {
    res.status(404).render('error', {
        title: 'Error',
        error: '404 Page not found',
    });
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});