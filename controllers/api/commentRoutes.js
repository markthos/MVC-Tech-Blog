const express = require('express');
const { Comments } = require('../../models');
const withAuth = require('../../public/auth');

const router = express.Router();

// add comment to the current blog post
router.post('/', withAuth, async (req, res) => {
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