const express = require('express');
const { Comments, BlogPost, User } = require('../../models');

const router = express.Router();

// get all comments
router.get('/', async (req, res) => {
    try {
        const commentData = await Comments.findAll();
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// add comment to the current blog post
router.post('/', async (req, res) => {
    try {
        const newComment = await Comments.create({
            ...req.body,
            creator_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;