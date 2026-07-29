const express = require("express");
const axios = require("axios");

const public_users = express.Router();


// Get all books
public_users.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://example.com/books"
    );

    res.status(200).json(response.data);

  } catch (error) {
    res.status(500).json({
      message: "Error retrieving books"
    });
  }
});


// Get book by ISBN
public_users.get("/isbn/:isbn", async (req, res) => {
  try {
    const response = await axios.get(
      "https://example.com/books"
    );

    const isbn = req.params.isbn;
    const book = response.data[isbn];

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({
        message: "Book not found"
      });
    }

  } catch (error) {
    res.status(500).json({
      message: "Error retrieving book"
    });
  }
});


// Get books by author
public_users.get("/author/:author", async (req, res) => {
  try {
    const response = await axios.get(
      "https://example.com/books"
    );

    const author = req.params.author;

    const books = Object.values(response.data).filter(
      (book) => book.author === author
    );

    if (books.length > 0) {
      res.status(200).json(books);
    } else {
      res.status(404).json({
        message: "No books found for this author"
      });
    }

  } catch (error) {
    res.status(500).json({
      message: "Error retrieving books"
    });
  }
});


// Get books by title
public_users.get("/title/:title", async (req, res) => {
  try {
    const response = await axios.get(
      "https://example.com/books"
    );

    const title = req.params.title;

    const books = Object.values(response.data).filter(
      (book) => book.title === title
    );

    if (books.length > 0) {
      res.status(200).json(books);
    } else {
      res.status(404).json({
        message: "No books found for this title"
      });
    }

  } catch (error) {
    res.status(500).json({
      message: "Error retrieving books"
    });
  }
});


module.exports.general = public_users;