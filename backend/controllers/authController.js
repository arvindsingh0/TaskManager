const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({ message: "User registered" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering user");
  }
};

exports.login = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }
       
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET, //this is our secret key, it can be changed to something comlpex.
      { expiresIn: "1d" }
    );
  
    res.json({ token });
  
  } catch (err) {
  console.log("LOGIN ERROR:", err);
  res.status(500).send(err.message);
  }
};
