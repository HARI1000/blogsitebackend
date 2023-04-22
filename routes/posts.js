const router = require('express').Router();
const Post = require("../models/Post");

//CREATE
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//UPDATE
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true }
                )
                res.status(200).json(updatedPost);
            }
            catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        }
        else {
            res.status(404).json("your not the authorised user");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//DELETE
router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await Post.findByIdAndDelete(req.params.id);
                res.status(200).json("successfully deleted");
            }
            catch (err) {
                res.status(500).json(err);
            }
        }
        else {
            res.status(401).json("you can only delete your post");
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//GET
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        { res.status(200).json(post); }
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//GET ALL
router.get("/", async (req, res) => {
    const user = req.query.user;
    const category = req.query.cat;
    try {
        let posts;
        if (user) {
            posts = await Post.find({ username: user })
        }
        else if (category) {
            posts = await Post.find({ categories: {$in:[category]} })
        }
        else
        {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router;