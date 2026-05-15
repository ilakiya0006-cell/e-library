import express from "express";

import mongoose from "mongoose";

import cors from "cors";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());


// ================= DATABASE =================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });


// ================= USER SCHEMA =================

const userSchema =
  new mongoose.Schema({
    name: String,

    email: String,

    password: String,
  });

const User = mongoose.model(
  "User",
  userSchema
);


// ================= REGISTER API =================

app.post(
  "/api/auth/register",
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
        return res.status(400).json({
          message:
            "User already exists",
        });
      }

      // SAVE USER
      const user =
        await User.create({
          name,
          email,
          password,
        });

      res.status(201).json({
        message:
          "Registration Successful",

        user,
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


// ================= LOGIN API =================

app.post(
  "/api/auth/login",
  async (req, res) => {
    try {
      const { email, password } =
        req.body;

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
        message: "Login Failed",
      });
    }
  }
);


// ================= HOME =================

app.get("/", (req, res) => {
  res.send(
    "E-Library Backend Running"
  );
});


// ================= PORT =================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running On Port ${PORT}`
  );
});

app.get(
  "/api/books/search/:keyword",
  async (req, res) => {
    try {
      const keyword =
        req.params.keyword;

      const books =
        await Book.find({
          title: {
            $regex: keyword,
            $options: "i",
          },
        });

      res.json(books);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "Search Failed",
      });
    }
  }
);