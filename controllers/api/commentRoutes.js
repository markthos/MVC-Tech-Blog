const express = require('express');
const { BlogPost, User } = require('../../models');

const router = express.Router();

// add comment to the current blog post
router.post('/:id', async (req, res) => {
    try {
        const newComment = await Comments.create({
            ...req.body,
            blogPost_id: req.params.id,
            creator_id: req.session.user_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;