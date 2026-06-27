
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection

mongoose.connect("mongodb://127.0.0.1:27017/movieDB")
    .then(() => {
        console.log("MongoDB Local Connected...");
    })
    .catch(() => {
        console.log("Showing Error, Connect It Properly");
    });

// Movie Schema

const movieSchema = new mongoose.Schema({

    movieName: {
        type: String,
        minlength: 3,
        required: true
    },

    director: {
        type: String,
        minlength: 3,
        required: true
    },

    genre: {
        type: String,
        minlength: 3,
        required: true
    },

    releaseYear: {
        type: Number,
        min: 1950,
        required: true
    },

    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    }

});

// Model

const Movie = mongoose.model("Movie", movieSchema);

// Home Route

app.get("/", (req, res) => {
    res.render("home.ejs");
});

// Delete Movie

app.get("/delete/:userid", async (req, res) => {

    console.log(req.params.userid);

    let data = await Movie.findByIdAndDelete(req.params.userid);

    console.log(data);

    res.redirect("/getdata");

});

// Edit Movie

app.get("/edit/:userid", async (req, res) => {

    let data = await Movie.findById(req.params.userid);

    console.log(data);

    res.render("edit.ejs", { data });

});

// Update Movie

app.post("/update/:userid", async (req, res) => {

    let data = await Movie.findByIdAndUpdate(
        req.params.userid,
        req.body,
        { new: true }
    );

    console.log(data);

    res.redirect("/getdata");

});

// Get All Movies

app.get("/getdata", async (req, res) => {

    let allmovie = await Movie.find();

    res.render("movie.ejs", { allmovie });

});

// Show Form

app.get("/insertdata", (req, res) => {

    res.render("form.ejs");

});

// Create Movie

app.post("/createdata", async (req, res) => {

    try {

        let data = await Movie.create(req.body);

        console.log(data);

        res.redirect("/getdata");

    } catch (error) {

        res.status(500).send("Something Went Wrong...");

    }

});

// Server

app.listen(3000, () => {

    console.log("Server is Running at Port 3000");

});

