import express from "express";
import cloudinary from "../lib/cloudinary.js";
import protectedRoute from "../middleware/auth.middleware.js";
import Book from "../models/Book.js";
const router = express.Router();

router.post("/", protectedRoute, async (req, res) => {
  try {
    const { title, caption, image, rating } = req.body;
    // Basic validation
    if (!title || !caption || !image || !rating) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    const uploadResponse = await cloudinary.uploader.upload(
      image,
      { folder: "bookrek" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ msg: "Image upload failed" });
        }
        console.log("Cloudinary upload result:", result);
        return result;
      }
    );
    const newBook = new Book({
      title,
      caption,
      image: uploadResponse.secure_url,
      rating,
      user: req.user._id,
    });
    await newBook.save();
    res.status(201).json({ book: newBook, msg: "Book added successfully" });
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/", protectedRoute, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const books = await Book.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("user", "username profileImage");
    const totalBooks = await Book.countDocuments();
    res.json({
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit),
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

//get recommended books by logged in user
router.get("/user", protectedRoute, async (req, res) => {
  try {
    const books = await Book.find({ user: req.user._id }).sort({ rating: -1 })
    res.json({ books });
  } catch (error) {
    console.error("Error fetching recommended books:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/:id", protectedRoute, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    if (book.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    try {
      const imageId = book.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imageId);
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
    }

    await book.deleteOne();
    res.json({ msg: "Book removed" });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
