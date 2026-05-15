import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      title: "Atomic Habits",
    },
  ]);
});

export default router;