// routes/userRoutes.js

import express from "express";

import User from "../models/User.js";

const router = express.Router();


// =====================================
// REGISTER USER
// =====================================

router.post(
  "/register",
  async (req, res) => {

    try {

      const {
        name,
        email,
        password,
      } = req.body;

      // CHECK USER EXISTS
      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {

        return res.status(400).json({
          message:
            "User Already Exists",
        });
      }

      // CREATE USER
      const newUser =
        new User({
          name,
          email,
          password,
        });

      await newUser.save();

      res.status(201).json({
        message:
          "Registration Success",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Registration Failed",
      });
    }
  }
);


// =====================================
// LOGIN USER
// =====================================

router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      const user =
        await User.findOne({
          email,
          password,
        });

      if (!user) {

        return res.status(400).json({
          message:
            "Invalid Email or Password",
        });
      }

      res.status(200).json({
        message:
          "Login Success",
        user,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Login Failed",
      });
    }
  }
);


// =====================================
// GET ALL USERS
// =====================================

router.get(
  "/",
  async (req, res) => {

    try {

      const users =
        await User.find();

      res.json(users);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  }
);


// =====================================
// DELETE USER
// =====================================

router.delete(
  "/:id",
  async (req, res) => {

    try {

      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "User Deleted",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Delete Failed",
      });
    }
  }
);

export default router;

