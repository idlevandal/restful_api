const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// all posts
router.get('/', async (req, res) => {
    const posts = await Post.find();

    res.send(posts);
});

// specific post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (err) {
        res.json({msg: 'Hmmm, could not find that id.. 👀'});
    }
});

// create post
router.post('/', async (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savedPost = await newPost.save();
        res.json(savedPost);
    } catch (err) {
        res.json({msg: 'Error saving data', error: err.errors.description.properties.message})
    }
});

// delete post
router.delete('/:postId', async (req, res) => {
    console.log(req.params.postId);
    try {
        await Post.deleteOne({_id: req.params.postId});
        res.json({msg: 'Post deleted..'});
    } catch (err) {
        res.json({msg: 'Error deleting...', error: err})
    }
})

// update a post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedUser = await Post.findOneAndUpdate(
            {_id: req.params.postId},
            {$set: {title: req.body.title}},
            {new: true, useFindAndModify: false}
        );
        res.json(updatedUser);
    } catch (err) {
        res.json({msg: 'Error updating'})
    }
})

module.exports = router;