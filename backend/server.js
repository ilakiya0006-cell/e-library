import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// ======================================
// MONGODB CONNECT
// ======================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });


// ======================================
// USER SCHEMA
// ======================================

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model(
  "User",
  userSchema
);


// ======================================
// BOOK SCHEMA
// ======================================

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  category: String,
  image: String,
  pdf: String,
  reads: {
    type: Number,
    default: 0,
  },
  description: String,
});

const Book = mongoose.model(
  "Book",
  bookSchema
);


// ======================================
// REGISTER
// ======================================

app.post(
  "/api/auth/register",
  async (req, res) => {
    try {

      const {
        name,
        email,
        password,
      } = req.body;

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

      const newUser =
        await User.create({
          name,
          email,
          password,
        });

      res.status(201).json({
        message:
          "Registration Successful",
        user: newUser,
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


// ======================================
// LOGIN
// ======================================

app.post(
  "/api/auth/login",
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
          "Login Successful",
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


// ======================================
// GET USERS
// ======================================

app.get(
  "/api/users",
  async (req, res) => {
    try {

      const users =
        await User.find();

      res.json(users);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Error Fetching Users",
      });

    }
  }
);


// ======================================
// DELETE USER
// ======================================

app.delete(
  "/api/users/:id",
  async (req, res) => {
    try {

      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "User Deleted Successfully",
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


// ======================================
// GET BOOKS
// ======================================

app.get(
  "/api/books",
  async (req, res) => {
    try {

      const books =
        await Book.find();

      res.json(books);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Error Fetching Books",
      });

    }
  }
);


// ======================================
// ADD BOOK
// ======================================

app.post(
  "/api/books/add",
  async (req, res) => {
    try {

      const book =
        await Book.create(
          req.body
        );

      res.status(201).json({
        message:
          "Book Added Successfully",
        book,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Error Adding Book",
      });

    }
  }
);


// ======================================
// DELETE BOOK
// ======================================

app.delete(
  "/api/books/:id",
  async (req, res) => {
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
        message:
          "Delete Failed",
      });

    }
  }
);


// ======================================
// HOME
// ======================================

app.get("/", (req, res) => {
  res.send(
    "E-Library Backend Running"
  );
});


// ======================================
// PORT
// ======================================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running On Port ${PORT}`
  );
});