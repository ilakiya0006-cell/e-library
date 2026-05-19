import express from "express";

import User from "../models/User.js";

const router = express.Router();

// =====================================
// REGISTER
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

      // CHECK USER

      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {

        return res
          .status(400)
          .json({
            message:
              "User already exists",
          });
      }

      // CREATE USER

      const newUser =
        new User({
          name,
          email,
          password,
        });

      // SAVE USER

      await newUser.save();

      res.status(201).json({

        message:
          "Registration Successful",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

// =====================================
// LOGIN
// =====================================

router.post(
  "/login",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      console.log(req.body);

      // FIND USER

      const user =
        await User.findOne({
          email,
        });

      console.log(user);

      // CHECK USER

      if (!user) {

        return res
          .status(400)
          .json({
            message:
              "User Not Found",
          });
      }

      // CHECK PASSWORD

      if (
        user.password !==
        password
      ) {

        return res
          .status(400)
          .json({
            message:
              "Invalid Password",
          });
      }

      // SUCCESS

      res.status(200).json({

        message:
          "Login Successful",

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message: "Server Error",
      });
    }
  }
);

export default router;