const express =
  require("express");

const router =
  express.Router();

const User =
  require("../models/User");

// GET USERS

router.get(
  "/",
  async (req, res) => {

    try {

      const users =
        await User.find();

      res.json(users);

    } catch (error) {

      res.status(500).json({
        message:
          "Server Error",
      });
    }
  }
);

// DELETE USER

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

      res.status(500).json({
        message:
          "Delete Failed",
      });
    }
  }
);

module.exports = router;