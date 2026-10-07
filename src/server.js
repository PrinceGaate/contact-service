const express = require("express");
const cors = require("cors");
const contactRoutes = require("./routes/contact.routes");

require("dotenv").config({
    path: "../.env"
});

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: process.env.FRONTEND_URL
}));

app.use(express.json());

app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
    res.send("Contact service is running");
});

app.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Contact service is healthy"
    });
});

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

app.use((err, req, res, next) => {
    console.error("Server error:", err);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});