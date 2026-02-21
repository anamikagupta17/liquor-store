const express = require("express");
const app = express();
const port = 80;
const db = require("./config/db");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User");

app.use(cors());
app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const { name, email, phone, address, identification } = req.body;

    if (!name || !email || !phone || !address || !identification) {
      return res.status(400).json({ message: "All fields required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const buffer = Buffer.from(identification);
    const password = buffer.toString("utf-8");
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword
    });
    res.status(200).json({
      success: true,
      message: "Registration successful"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, identification } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        loginSuccessfull: false,
        message: "Invalid Email"
      });
    }

    const buffer = Buffer.from(identification);
    const password = buffer.toString("utf-8");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        loginSuccessfull: false,
        message: "Invalid Password"
      });
    }

    res.status(200).json({
      loginSuccessfull: true,
      message: "Login successful",
      token: "sdsadsads",
      userName: user.name,
      role: "user"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(port, () => {
  console.log(`App Started successfully on port: ${port}`);
});
