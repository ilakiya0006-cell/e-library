import express from "express";

import Book from "../models/Book.js";

const router = express.Router();


// ======================================
// GET ALL BOOKS
// ======================================

router.get("/", async (req, res) => {

  try {

    const books =
      await Book.find();

    res.json(books);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// ======================================
// ADD BOOK
// ======================================

router.post("/add", async (req, res) => {

  try {

    const newBook =
      new Book(req.body);

    await newBook.save();

    res.status(201).json({
      message:
        "Book Added Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});


// ======================================
// DELETE BOOK
// ======================================

router.delete("/:id", async (req, res) => {

  try {

    await Book.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Book Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;