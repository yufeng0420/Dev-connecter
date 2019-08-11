const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const auth = require("../../middleware/auth");
const User = require("../../models/User");

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

router.post(
  "/",
  [
    check("email", "Please include a vaild email").isEmail(),
    check("password", "password is required").exists()
  ],
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // See if user exists
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ errors: [{ msg: "Can't find this email" }] });
    }
    // Get users gravatar

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        errors: [{ msg: "Invalid Credentials" }]
      });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    // Return jsonwebtoken
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  }
);

module.exports = router;
