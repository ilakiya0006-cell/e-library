import express from "express";

const router = express.Router();

router.post(
  "/register",
  (req, res) => {
    res.json({
      message:
        "Register Route Working",
    });
  }
);

router.post("/login", (req, res) => {
  res.json({
    message:
      "Login Route Working",
  });
});

export default router;