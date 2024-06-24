import User from "../models/User.js";

// create a new user
export const createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const savedUser = await newUser.save();
    res.status(200).json({
      success: true,
      message: "Successfully created",
      data: savedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create",
      error: error.message,
    });
  }
};

// update user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated user",
      data: updateUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Successfully deleted user",
      data: deletedUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};

// get all users
export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();

    res.status(200).json({
      success: true,
      message: "Successfully fetched",
      data: allUsers,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch",
      error: error.message,
    });
  }
};

// get user by id

export const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const userById = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "Successfully fetched",
      data: userById,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to fetch",
      error: error.message,
    });
  }
};
