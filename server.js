const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const EJSLayouts = require("express-ejs-layouts");
const methodOverride = require('method-override');

// Import routes
const userRoute = require("./routes/userRoute");
const projectRoute = require("./routes/projectRoute");
const taskRoute = require("./routes/taskRoute");
const roleRoute = require("./routes/roleRoute");

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan());

app.use(express.static(`${__dirname}/public`));

// View Engine
app.set("view engine", "ejs");
app.use(EJSLayouts);
app.set("layout", "layouts/template");

// Health Check
app.get("/", async (req, res) => {
    try {
        res.render("landingPage",{
            title: "WorkSync.",
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

// Configure method-override to use _method query parameter
app.use(methodOverride('_method'));

app.use("/dashboard", userRoute);
app.use("/projects", projectRoute);
app.use("/tasks", taskRoute);
app.use("/roles", roleRoute);

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