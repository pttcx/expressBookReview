const express = require("express");
const axios = require("axios");

const router = express.Router();

const API_URL = "http://localhost:3000";


router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});


router.get("/author/:author", async (req, res) => {
  try {
    const response = await axios.get(
      `${API_URL}/`
    );

    const books = Object.values(response.data);

    const result = books.filter(
      book => book.author === req.params.author
    );

    if (result.length === 0) {
      return res.status(404).json({
        message: "Book not found"
      });
    }

    res.json(result);

  } catch(error) {
    res.status(500).json({
      message:error.message
    });
  }
});


router.get("/title/:title", async (req,res)=>{
  try {
    const response = await axios.get(`${API_URL}/`);

    const books = Object.values(response.data);

    const result = books.filter(
      book => book.title === req.params.title
    );

    if(result.length === 0){
      return res.status(404).json({
        message:"Book not found"
      });
    }

    res.json(result);

  }catch(error){
    res.status(500).json({
      message:error.message
    });
  }
});


router.get("/isbn/:isbn", async(req,res)=>{
  try{
    const response = await axios.get(`${API_URL}/`);

    const books = response.data;

    const book = books[req.params.isbn];

    if(!book){
      return res.status(404).json({
        message:"Book not found"
      });
    }

    res.json(book);

  }catch(error){
    res.status(500).json({
      message:error.message
    });
  }
});


module.exports = router;