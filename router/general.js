const express = require("express");
const axios = require("axios");

const public_users = express.Router();

const BOOK_API =
  "https://raw.githubusercontent.com/pttcx/expressBookReview/main/booksdb.js";


// Get all books
public_users.get("/", async (req, res) => {
  try {
    const response = await axios.get(BOOK_API);

    res.status(200).send(response.data);

  } catch (error) {
    res.status(500).json({
      message: "Error retrieving books"
    });
  }
});


// Get books by ISBN
public_users.get("/isbn/:isbn", async (req, res) => {
  try {
    const response = await axios.get(BOOK_API);

    const isbn = req.params.isbn;

    if (response.data[isbn]) {
      res.json(response.data[isbn]);
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
    const response = await axios.get(BOOK_API);

    const author = req.params.author;

    const books = Object.values(response.data)
      .filter(book => book.author === author);

    res.json(books);

  } catch (error) {
    res.status(500).json({
      message: "Error retrieving books"
    });
  }
});


// Get books by title
public_users.get("/title/:title", async (req, res) => {
  try {
    const response = await axios.get(BOOK_API);

    const title = req.params.title;

    const books = Object.values(response.data)
      .filter(book => book.title === title);

    res.json(books);

  } catch (error) {
    res.status(500).json({
      message: "Error retrieving books"
    });
  }
});


module.exports.general = public_users;