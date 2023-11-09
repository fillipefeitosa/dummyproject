import User from "../models/User.js";

// CREATE operation
export const createUser = async (req, res) => {
  try {
    if (
      !req.body.email ||
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.phone
    ) {
      return res.status(400).send({
        message: "User email can not be empty",
      });
    }

    const userObj = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
    });

    const savedUser = await userObj.save();
    res.status(201).json({
      message: "User created successfully",
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while creating the User.",
    });
  }
};

// READ operations
export const findAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while retrieving users.",
    });
  }
};

export const findOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Some error occurred while retrieving user.",
    });
  }
};
