const express = require("express");
const contactLimiter = require("../middleware/contactLimiter");
const handleContact = require("../controllers/contact.controller");

const router = express.Router();

router.post("/", contactLimiter, handleContact);

module.exports = router;
