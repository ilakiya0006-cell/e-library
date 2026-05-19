import mongoose from "mongoose";

const bookSchema =
  new mongoose.Schema({

    title: String,

    author: String,

    category: String,

    image: String,

    pdf: String,

    description: String,

    reads: {
      type: Number,
      default: 0,
    },

  });

const Book =
  mongoose.model(
    "Book",
    bookSchema
  );

export default Book;