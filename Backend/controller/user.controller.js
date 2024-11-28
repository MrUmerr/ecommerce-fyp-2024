import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

// Signup function
export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already registered" });
    }

    const hashPassword = await bcryptjs.hash(password, 10);
    const createdUser = new User({
      fullname,
      email,
      password: hashPassword,
    });
    await createdUser.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        _id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login function
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    } else {
      res.status(200).json({
        message: "Login successful",
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Delete User function
export const deleteUser = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update User function
export const updateUser = async (req, res) => {
  const { email } = req.params;
  const { fullname, newEmail, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (password) {
      const hashedPassword = await bcryptjs.hash(password, 10);
      user.password = hashedPassword;
    }

    user.fullname = fullname || user.fullname;
    user.email = newEmail || user.email; // Update email with `newEmail` if provided

    const updatedUser = await user.save();
    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: updatedUser._id,
        fullname: updatedUser.fullname,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
