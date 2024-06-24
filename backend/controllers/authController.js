import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// user registration

export const register = async (req, res) => {
  const { username, email, password, photo } = req.body;

  // Validate required fields
  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hash,
      photo,
    });

    const savedUser = await newUser.save();

    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// user login

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // If user does not exist
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Check the password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // If password is not correct
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Password is not correct or incorrect email address",
      });
    }

    const { password: userPassword, role, ...rest } = user._doc;

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "10d",
      }
    );

    // Set token in the browser cookies and send the response to the client
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
      })
      .status(200)
      .json({
        success: true,
        message: "Successfully logged in!",
        data: { ...rest },
        token,
        role,
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to login!",
    });
  }
};
