const { sendGmail } = require("../controllers/emailController");

const router = require("express").Router();

router.post("/send-email", sendGmail);

module.exports = router;
